# @koa/request-id
---

[![Build Status][travis-img]][travis-url]
[![Coverage Status][coverage-img]][coverage-url]
[![NPM version][npm-badge]][npm-url]
[![License][license-badge]][license-url]
![Code Size][code-size-badge]

<!-- ***************** -->

[travis-img]: https://travis-ci.org/3imed-jaberi/koa-request-id.svg?branch=master
[travis-url]: https://travis-ci.org/3imed-jaberi/koa-request-id
[coverage-img]: https://coveralls.io/repos/github/3imed-jaberi/koa-request-id/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/3imed-jaberi/koa-request-id?branch=master
[npm-badge]: https://img.shields.io/npm/v/@koa/request-id.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@koa/request-id
[license-badge]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: https://github.com/3imed-jaberi/koa-request-id/blob/master/LICENSE
[code-size-badge]: https://img.shields.io/github/languages/code-size/3imed-jaberi/koa-request-id
[express-request-id]: https://www.npmjs.com/package/express-request-id
[koa-x-request-id]: https://www.npmjs.com/package/koa-x-request-id

<!-- ***************** -->

If [`express-request-id`][express-request-id] and [`x-request-id`][koa-x-request-id] have a baby ❤️.

<small> 
Generates a unique Request ID for every incoming HTTP request. This unique <br />
ID is then passed to your application as an HTTP header called X-Request-Id.
</small>


## `Installation`

```bash
# npm ..
$ npm install @koa/request-id
# yarn ..
$ yarn add @koa/request-id
```


## `Usage`

This is a practical example of how to use.

```javascript
const Koa = require('koa');
const xRequestId = require ('@koa/request-id');
const app = new Koa();

// You can pass options object to xRequestId
app.use(xRequestId());
```

### `OPTIONS`

You can pass an object that contains these keys to the **xRequestId** middleware:

  - `uuidVersion` &mdash; (String) Pick which version of UUID that should used. `default to 'v4'`
  - `uuidOpts` &mdash; (Object) Optional UUID state to apply. `default to {}`
  - `uuidBuffer` &mdash; (Array|buffer) Where UUID bytes are to be written. `defaultto  undefined`
  - `uuidOffset` &mdash; (Number) Starting index in buffer at which to begin writing. `default to 0`
  - `noHyphen` &mdash; (Boolean) Abandon the hyphen or not. `default to false`
  - `setHeader` &mdash; (Boolean) Should be added to response or not. `default to true`
  - `headerName` &mdash; (String) Header name to use. `default to 'X-Request-Id'`
  - `attributeName` &mdash; (String) Attribute name used for the identifier on the ctx/request object `default to 'id'`


#### License
---

[MIT](LICENSE) &copy;	[Imed Jaberi](https://github.com/3imed-jaberi)
