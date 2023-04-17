# Moneybird.js

## Currently supported endpoints

- [x] Administration
- [x] Contact*
- [x] Sales invoice*
- [ ] Documents
- [ ] Estimates
- [ ] External sales invoice
- [ ] Financial accounts
- [ ] Financial mutation
- [ ] Financial statement
- [ ] Identities
- [ ] Ledger account
- [ ] Payment
- [ ] Product
- [ ] Project
- [ ] Purchase transaction
- [ ] Recurring sales invoice
- [ ] Subscription
- [ ] Tax rate
- [ ] Time entry
- [ ] User
- [ ] Webhook
- [ ] Workflow

* not all endpoints are yet implemented

## Usage

```js
const moneybird = require("@print-one/moneybird-js");

// Set API token for the Moneybird instance
moneybird.instance.setOptions({
  api_token: 'XXXXX',
});

// Alternatily you can create an new instance
const instance = new moneybird.Moneybird(
  'https://moneybird.com/api/',
  'v2',
  'XXXXX'
);

// Get all administrations
instance.administrations().then(async (administration) => {
  const contacts = await administration.contacts();
  console.log(contacts);
});
```
