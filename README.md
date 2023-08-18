# Michi

The goal of this project is to provide users with a component which tracks the roadmap of the application. Other user's can vote and comment on the existing roadmap features or can submit features which upon approval from the dashboard will reflect in the main component used in the app.

## Run Locally

#### Prerequisites :-

    1. You should have docker installed
    2. You should have a postgres sql client installed (To view tables and such).
    3. (Optional) you can install pnpm which is performant npm with the command
        "npm i -g pnpm"

#### Steps To Run :-

1. Clone the project and go to project directory

```bash
  git clone https://github.com/balub/michi.git && cd michi
```

2. Install dependencies

```bash
  pnpm i
```

Note: if you are using pnpm you can `pnpm i` in the root directory else you will have to `npm i` inside individual packages.

3. Run postgres in docker

```
  docker run --name michi -e POSTGRES_PASSWORD=<postgres_password> -p 5432:5432 -d postgres
```

4. Navigate to server folder in packages and run

```
  pnpx prisma generate
```

Note: First time this command is auto run when we do `npm i` because we have defined `@prisma/client` in package.json which runs this command upon install. But after this initial setup, Adding any new model in schema.prisma file requires us to run this command

5. Replace the DATABASE_URL inside the schema.prisma file with `postgresql://postgres:<postgres_password>@localhost:5432/postgres?pgbouncer=true` or define it in a .env file in root of server folder and use it in the scema.prisma and then run

```
  pnpx prisma migrate dev
```

After this command you should see tables in your postgres inside docker. You can use Beekeeper Studio to connect to the postgres inside docker to view tables, run queries etc.

6. Now you can run

```
pnpm run start
```

to run the nest.js Backend

7. To be able to interact with the Backend you will need to authenticate yourself because there is a middleware which prevents unauthorized users from accessing data. Authentication can be done by going to the below URL and signing in.

```
http://localhost:4000/v1/auth/google
```

Note: replace google in above url with github to login with github.

Now you are all set to develop for BE or use local BE to interact with the main component.
