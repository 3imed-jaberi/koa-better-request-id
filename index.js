/*!
 * @koa/request-id
 * Copyright(c) 20020 Imed Jaberi
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

const uuid = require('uuid');

/**
 * Expose `xRequestId()`.
 */

module.exports = xRequestId;

/**
 * Generates an unique Request ID for every incoming HTTP request.
 * This unique ID is then passed to your application as an HTTP header called
 * `X-Request-Id`.
 *
 *
 * @api public
 * */

function xRequestId(options) {
  options = options || {};

  // TODO: add custom id generator.
  // Maybe something like this;
  // customGenerator = {
  //   uid: uidFunc
  //   opts: opts_obj_for_uidFunc
  // }

  options.uuidVersion = options.uuidVersion || 'v4';
  options.uuidOpts = options.uuidOpts || {};
  options.uuidBuffer = options.uuidBuffer || undefined;
  options.uuidOffset = options.uuidOffset || 0;
  // eslint-disable-next-line no-implicit-coercion
  options.noHyphen = !!options.noHyphen;

  options.setHeader =
    // eslint-disable-next-line no-implicit-coercion
    options.setHeader === undefined || !!options.setHeader;
  options.headerName = options.headerName || 'X-Request-Id';
  options.attributeName = options.attributeName || 'id';

  return function(ctx, next) {
    ctx.request[options.attributeName] =
      ctx.id ||
      ctx.requestId ||
      ctx.xRequestId ||
      ctx.query[options.headerName.toLowerCase()] ||
      ctx.get(options.headerName.toLowerCase()) ||
      // ctx.request.headers[options.headerName.toLowerCase()]
      // ctx.request.get(options.headerName.toLowerCase())
      uuidGenerator(options);

    if (options.setHeader) {
      // ctx.response.set(options.headerName, ctx.request[options.attributeName]);
      ctx.set(options.headerName, ctx.request[options.attributeName]);
    }

    return next();
  };
}

/**
 * Default function to generate an unique id.
 *
 * @options {Object}: same as uuid options object
 *                    with one plus option to
 *                    specificate of the uuid version.
 * @api private
 * */

function uuidGenerator(options) {
  const id = uuid[options.uuidVersion](
    options.uuidOpts,
    options.uuidBuffer,
    options.uuidOffset
  );

  // eslint-disable-next-line no-useless-escape
  return options.noHyphen ? id.replace(/\-/g, '') : id;
}
