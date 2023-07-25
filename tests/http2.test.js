import krop from "../lib/Index.js";

it("make http2 request", async () => {
  const { data } = await krop("tls.peet.ws/api/all", {
    http2: true,
		headers: {
			"User-Agent": "krop"
		}
  });

  expect(data.http_version == "h2").toBe(true);
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