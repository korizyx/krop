import { Session } from "../lib/Index.js";

const client = new Session();

const response = await client.req({
  url: "https://discord.com",
});

console.log(
  response,
  // cookies saved from previous request (automatic save)
  client.cookies
);
