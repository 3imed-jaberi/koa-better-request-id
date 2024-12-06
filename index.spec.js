const { describe, it } = require('node:test');

const Koa = require('koa');
const request = require('supertest');

const xRequestId = require('.');

const UUID_WITH_HYPHEN_REG = /[0-9a-zA-Z\-]{36}/;
const UUID_WITH_OUT_HYPHEN_REG = /[0-9a-zA-Z]{32}/;

describe('xRequestId', () => {
  it('When you do not touch the method by default', async () => {
    const server = createServer();
    // Default opts
    // - uuidVersion = 'v4'
    // - uuidOpts = {}
    // - uuidBuffer = undefined
    // - uuidOffset = 0;
    // - noHyphen = false
    // - setHeader = true
    // - headerName = 'X-Request-Id'
    // - attributeName = 'id'

    await request(server.callback())
      .get('/')
      .expect('X-Request-Id', UUID_WITH_HYPHEN_REG)
      .expect(200);
  });

  it('When you pass noHyphen as true', async () => {
    const server = createServer({
      noHyphen: true
    });

    await request(server.callback())
      .get('/')
      .expect('X-Request-Id', UUID_WITH_OUT_HYPHEN_REG)
      .expect(200);
  });

  it('When you pass custom headerName `x-req-id`', async () => {
    const server = createServer({
      headerName: 'x-req-id'
    });

    await request(server.callback())
      .get('/')
      .expect('x-req-id', UUID_WITH_HYPHEN_REG)
      .expect(200);
  });

  it('When you pass setHeader', async () => {
    const server = createServer({
      setHeader: false
    });

    await request(server.callback())
      .get('/')
      .expect(/[0-9a-zA-Z]/)
      .expect(200);
  });
});

function createServer(xRequestIdOpts) {
  const app = new Koa();
  app.use(xRequestId(xRequestIdOpts));

  app.use((ctx, _) => {
    ctx.body =
      (xRequestIdOpts && ctx[xRequestIdOpts.attributeName || 'id']) ||
      'X-Request-Id';
  });

  return app;
}
