import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/movies", async (c) => {
  const { results: movies } = await c.env.DB.prepare("select * from movies")
    .all();
  return c.json(movies);
});

app.get("/favorites", async (c) => {
  const { results: favorites } = await c.env.DB.prepare(
    "select * from movies order by rating desc limit 3",
  ).all();
  return c.json(favorites);
});

app.post("/movies/:id", async (c) => {
  const body = await c.req.json();
  const result = await c.env.DB.prepare(
    "UPDATE movies SET rating = ?1 WHERE id = ?2 RETURNING *",
  ).bind(body.rating, c.req.param("id")).run();
  const ok = result.success;
  return c.json({ ok });
});

export default app;
