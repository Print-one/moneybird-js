/* eslint-disable @typescript-eslint/no-var-requires */
const moneybird = require("@print-one/moneybird-js");
const fs = require("fs");
const _ = require("lodash");

moneybird.instance.setOptions({
  api_token: process.env.MONEYBIRD_API_KEY,
});

(async () => {
  while (true) {
    const administrations = await moneybird.instance.administrations();
    for (const administration of administrations) {
    }
  }
})().catch(console.log);
