import { Moneybird } from "./moneybird";

export { Moneybird };
export { MoneybirdOptions } from "./common";

export const instance: Moneybird = new Moneybird(
  "https://moneybird.com/api/",
  "v2"
);
