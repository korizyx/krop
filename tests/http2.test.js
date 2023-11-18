import krop from "../lib/Index.js";

it("make http2 request", async () => {
  const { data } = await krop("tls.peet.ws/api/all", {
    http2: true,
    headers: {
      "User-Agent": "krop",
    },
  });

  expect(data.http_version == "h2").toBe(true);
});

it("decode compressed data", async () => {
  const { data } = await krop("www.google.com", {
    http2: true,
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9",
      "accept-encoding": "gzip, deflate, br",
      "user-agent":
        "krop",
    },
  });

  expect(data.includes("<!doctype html>")).toBe(true);
});

it("use better ciphers", async () => {
  const { data } = await krop("tls.peet.ws/api/all", {
    http2: true,
    ciphers: krop.BETTER_CIPHERS,
    headers: {
      "User-Agent": "krop",
    },
  });

  expect(data.http_version == "h2").toBe(true);
});
