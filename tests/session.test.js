import { Session } from "../lib/Index.js";

test("session collect cookies", async () => {
  const client = new Session({});

  const { status } = await client.req("https://discord.com");

  expect(client.cookies.length > 0).toBe(true);
});

test("default headers", async () => {
  const client = new Session({
    headers: {
      "Test-Krop": "done",
    },
  });

  const {
    data: { headers },
  } = await client.req("https://httpbin.org/headers", {
    headers: {
      "Test-Krop-2": "done",
    },
  });

  expect(
    headers["Test-Krop"] == "done" && headers["Test-Krop-2"] == "done"
  ).toBe(true);
});
