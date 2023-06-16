import krop from "../lib/Index.js";

test("proxy work", async () => {
  const { data } = await krop({
    url: "https://api.ipify.org?format=json",
    proxy:
      "32677002:76031242_session-g1h4tpao_lifetime-1h@residental.beyondproxy.io:12321",
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
