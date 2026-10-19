const bedrock = require('bedrock-protocol');
const s = require('./settings.json');

function start() {
  const client = bedrock.createClient({
    host: s.host, port: s.port,
    username: s.username, offline: true
  });
  const retry = () => setTimeout(start, s.reconnectDelay);
  client.on('spawn', () => console.log('Joined!'));
  client.on('disconnect', retry);
  client.on('close', retry);
  client.on('error', e => { console.log(e.message); retry(); });
}
start();
