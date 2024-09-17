const PORT = 8888;
const http = require( "http" );
const url = require('url');

http.createServer( ( req, res ) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  const textToDisplay = query['text-to-display'] || 'No text provided';
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(textToDisplay);
} ).listen( PORT, () => {
  console.log(`Main server listening on port ${PORT}`);
} );
