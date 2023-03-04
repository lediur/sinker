#!/usr/bin/env zx

import pg from "pg";
import { chalk, retry, spinner } from "zx";
import { expBackoff } from "zx";
import { envsafe, url } from "envsafe";

// configuration
// set up environment variables with envsafe
const env = envsafe({
  SINKER_DB_CONNECTIONSTRING: url({
    example: "postgres://postgres:sinker@localhost:5432/postgres",
  }),
});

// attempt to connect to database (via retry)
console.log(
  `Connecting to Postgres database on ${chalk.bold(
    env.SINKER_DB_CONNECTIONSTRING
  )}...`
);
const livenessClient = new pg.Client(env.SINKER_DB_CONNECTIONSTRING);
await livenessClient.connect();
await spinner("attempting to connect to database...", () => {
  return retry(3, expBackoff(3000), async () => {
    await livenessClient.query("select 1");
  });
});
await livenessClient.end();
console.log(chalk.green("Confirmed database is online"));
