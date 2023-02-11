import { Session } from "../lib/Index.js";

test("session collect cookies", async () => {
  const client = new Session();

  const { status } = await client.req({
    url: "https://discord.com",
  });

  expect(client.cookies.length > 0).toBe(true);
});
