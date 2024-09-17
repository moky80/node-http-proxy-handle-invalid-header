const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});
const TARGET_SERVER = 'http://localhost:8888'; // The main server

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: TARGET_SERVER }, function(err) {
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Something went wrong while proxying the request.');
  });
});

const PORT = 4444;
server.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});

