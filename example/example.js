/* eslint-disable @typescript-eslint/no-var-requires */
const moneybird = require("@print-one/moneybird-js");

moneybird.instance.setOptions({
  api_token: process.env.MONEYBIRD_API_KEY,
});

(async () => {
  const administrations = await moneybird.instance.administrations();
  for (const administration of administrations) {
    const contacts = await administration.contacts();
    console.log(contacts);
  }
})().catch(console.log);
