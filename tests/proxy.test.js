import krop from "../lib/Index.js";

test("proxy work", async () => {
  const { data } = await krop({
    url: "https://api.ipify.org?format=json",
    proxy:
      "R5Qm9jF7Tf-res-google.us-sid-11986937:o8Ssn473YgvxNO9Z@gw-eu.rainproxy.io:5959",
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
