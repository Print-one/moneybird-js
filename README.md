# Moneybird.js

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Issues][issues-img]][issues-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> A wrapper for the Moneybird API.

## Currently supported endpoints

- Administration
- Contact*
- Sales invoice*

*not all endpoints are yet implemented

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

[build-img]:https://github.com/Print-one/moneybird-js/actions/workflows/release.yml/badge.svg

[build-url]:https://github.com/Print-one/moneybird-js/actions/workflows/release.yml

[npm-img]:https://img.shields.io/npm/v/@print-one/moneybird-js

[npm-url]:https://www.npmjs.com/package/@print-one/moneybird-js

[issues-img]:https://img.shields.io/github/issues/Print-one/moneybird-js

[issues-url]:https://github.com/ryansonshine/Print-one/moneybird-js/issues

[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[semantic-release-url]:https://github.com/semantic-release/semantic-release
