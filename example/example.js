/* eslint-disable @typescript-eslint/no-var-requires */
const moneybird = require("@print-one/moneybird-js");
const fs = require("fs");

moneybird.instance.setOptions({
  api_token: process.env.MONEYBIRD_API_KEY,
});

(async () => {
  const administrations = await moneybird.instance.administrations();
  for (const administration of administrations) {
    const invoices = await administration.salesInvoices();
    for (const invoice of invoices) {
      if (invoice.data.id === "391346733960922236") {
        for (let attachment of invoice.data.attachments) {
          console.log(await invoice.downloadAttachment(attachment));
          await invoice.deleteAttachment(attachment);
        }

        const file = fs.readFileSync("./dummy.pdf");
        await invoice.addAttachment(file);
      }
    }
  }
})().catch(console.log);
