import { Moneybird } from "./moneybird";

export { Moneybird };
export { Administration } from "./administration";
export { Contact } from "./contact";
export { SalesInvoice } from "./salesInvoice";
export * from "./common";
export * from "./errors";

export const instance: Moneybird = new Moneybird(
  "https://moneybird.com/api/",
  "v2"
);
