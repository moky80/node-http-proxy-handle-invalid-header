# Valid header works for both main-server and proxy-server
curl -v -H "User-Agent: pinkytinky" http://localhost:8888
curl -v -H "User-Agent: pinkytinky" http://localhost:4444

# Invalid header works for main-server but crashes proxy-server
curl -v -H "User Agent: pinkytinky" http://localhost:4444

# The crash log: see crash.log
