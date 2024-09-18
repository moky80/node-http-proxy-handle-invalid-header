const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});
const TARGET_SERVER = 'http://localhost:8888'; // The main server

proxy.on('error', function(err, req, res) {
  console.error('--proxy error:', err);
  if ( req ) { // In my test, req is undefined
    console.error('--proxy error req.headers:', req.headers);
  }
  if ( res ) { // In my test, res is undefined
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Something went wrong while proxying the request.');
  }
});

// The event 'open', 'data' are documented in https://github.com/http-party/node-http-proxy#
// but were never observed in my tests.
proxy.on('open', function (proxySocket) {
  console.log("--proxy open");
  // listen for messages coming FROM the target here
  proxySocket.on('data', function(arg1, arg2){
    console.log("proxy data:", arg1);
  });
});

// This happens when proxy does not crash and can proceed to receive the request.
// The exception ERR_INVALID_HTTP_TOKEN happens before this event.
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  try {
    // Example: Validate headers
    console.log("--proxy req.headers:", req.headers);
    if (req.headers['User Agent']) {
        throw new Error('Invalid header');
    }
  } catch (err) {
      proxyReq.emit('error', err);
  }
});

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: TARGET_SERVER });
});

const PORT = 4444;
server.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});

