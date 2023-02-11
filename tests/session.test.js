import krop from "../lib/Index.js";
const { Session } = krop;

test("session collect cookies", async () => {
  const session = new Session({});

  await session.req("https://discord.com");

  expect(session.cookies.length > 0).toBe(true);
});

test("default headers", async () => {
  const session = new Session({
    headers: {
      "Test-Krop": "done",
    },
  });

  const {
    data: { headers },
  } = await session.req("https://httpbin.org/headers", {
    headers: {
      "Test-Krop-2": "done",
    },
  });

  expect(
    headers["Test-Krop"] == "done" && headers["Test-Krop-2"] == "done"
  ).toBe(true);
});
