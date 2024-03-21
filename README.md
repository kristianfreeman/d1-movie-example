# d1-movie-example

Example application used in the Workers 201 video course, "Managing Data in your Workers Application".

## Usage

This example application shows how to set up three routes in an application, backed by D1:

1. `GET /movies`: get all movies from the database as JSON.
2. `POST /movies/:id`: update a movie in the database. In the tutorial, we enable just the `rating` field to be updated.
3. `GET /favorites`: get the three highest-rated movies from the database as JSON.

## Configuration

1. Create a new d1 database:

```sh
$ npx wrangler d1 create movie-example
```

2. Deploy your application:

```sh
$ npx wrangler deploy
```

3. Add the output of that command to your `wrangler.toml` file.

4. Execute both SQL files against your D1 database:

```sh
$ npx wrangler d1 execute movie-example movie-example --file scripts/001_create_db.sql --remote
$ npx wrangler d1 execute movie-example movie-example --file scripts/002_insert_movies.sql --remote
```

_Note that the `--remote` flag will execute this against your remote database. You can remove this flag to execute against your local database._
