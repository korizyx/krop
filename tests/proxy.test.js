import krop from "../lib/Index.js";

it("proxy work", async () => {
  const { data } = await krop({
    url: "https://api.ipify.org?format=json",
    proxy:
      "nngbfhwm-rotate:ymh9v6wum5vx@p.webshare.io:80",
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
