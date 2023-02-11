import krop from "../lib/Index.js";

test("automatic add https in url", async () => {
  const { data } = await krop(
    "pt.wikipedia.org/static/images/mobile/copyright/wikipedia.png"
  );

  expect(Buffer.isBuffer(data)).toBe(true);
});

test("multiple args parsing", async () => {
  const { status } = await krop("httpbin.org/post", {
    method: "POST",
  });

  expect(status < 300 && status > 199).toBe(true);
});
