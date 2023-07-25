import krop from "../lib/Index.js";

it("automatic add https in url", async () => {
  const { data } = await krop(
    "pt.wikipedia.org/static/images/mobile/copyright/wikipedia.png"
  );

  const { data: data2 } = await krop({
    url: "pt.wikipedia.org/static/images/mobile/copyright/wikipedia.png",
  });

  expect(Buffer.isBuffer(data) && Buffer.isBuffer(data2)).toBe(true);
});

it("multiple args parsing", async () => {
  const { status } = await krop("httpbin.org/post", {
    method: "POST",
  });

  expect(status < 300 && status > 199).toBe(true);
});
