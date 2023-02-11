import Hermes from "../lib/Index.js";

const response = await Hermes({
  url: "https://api.ipify.org/?format=json",
  proxy: "45.94.47.66:8110",
  timeout: 10000,
});

/**
 * returns proxy ip
 */
console.log(response);
