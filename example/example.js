/* eslint-disable @typescript-eslint/no-var-requires */
const moneybird = require("@print-one/moneybird-js");

moneybird.instance.setOptions({
  api_token: process.env.MONEYBIRD_API_KEY,
});

//wrap in async function to use await
(async () => {
  const administration =
    moneybird.instance.administration("384811992634886094");

  const contact = await administration.contact("384823351689873198").delete();

  console.log(contact);
})().catch(console.log);
