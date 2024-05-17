module.exports = {
  '/fed-appmonitor-service': {
    'target': 'https://api-boss.chehejia.com',
    'changeOrigin': true,
    'pathRewrite': { '^/fed-appmonitor-service' : '/fed-appmonitor-service' },
  },
  '/api': {
    'target': 'https://api-boss.chehejia.com',
    'changeOrigin': true,
    'pathRewrite': { '^/api' : '' },
  },
  '/test-api': {
    'target': 'https://iot-api-boss-test.chehejia.com',
    'changeOrigin': true,
    'pathRewrite': { '^/test-api' : '' },
  },
}
