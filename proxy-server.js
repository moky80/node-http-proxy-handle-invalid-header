const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

const TARGET_SERVER = 'http://localhost:8888'; // The main server

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: TARGET_SERVER });
});

const PORT = 4444;
server.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});

