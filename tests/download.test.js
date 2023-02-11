import Request from "../lib/Index.js";

test("covert image to buffer", async () => {
  const { data } = await Request({
    url: "https://pt.wikipedia.org/static/images/mobile/copyright/wikipedia.png",
  });

  expect(Buffer.isBuffer(data)).toBe(true);
});
