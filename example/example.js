/* eslint-disable @typescript-eslint/no-var-requires */
const moneybird = require("@print-one/moneybird-js");

moneybird.instance.setOptions({
  api_token: process.env.MONEYBIRD_API_KEY,
});

(async () => {
  const administrations = await moneybird.instance.administrations();
  for (const administration of administrations) {
    const invoices = await administration.salesInvoices();
    for (const invoice of invoices) {
      if (invoice.data.id === "391346733960922236") {
        console.log(invoice.data.payments);
        await invoice.addPayment({
          price: 1.60,
          payment_date: "2023-09-06",
          manual_payment_action: "balance_settlement"
        });
      }
    }
  }
})().catch(console.log);
