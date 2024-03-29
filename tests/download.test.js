import krop from "../lib/Index.js";

it("covert image to buffer", async () => {
  const { data } = await krop({
    url: "https://pt.wikipedia.org/static/images/mobile/copyright/wikipedia.png",
  });

  expect(Buffer.isBuffer(data)).toBe(true);
});
