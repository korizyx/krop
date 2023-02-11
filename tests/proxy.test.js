import Request from "../lib/Index.js";

test("proxy work", async () => {
  const { data } = await Request({
    url: "https://api.ipify.org?format=json",
    proxy: "31.186.239.245:8080",
    timeout: 10000,
  });

  expect(validateIPaddress(data.ip)).toBe(true);
});

function validateIPaddress(ipaddress) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }

  return false;
}
