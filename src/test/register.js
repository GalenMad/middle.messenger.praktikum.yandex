const tsNode = require('ts-node');
const testTSConfig = require('./tsconfig.json');

tsNode.register({
  files: true,
  transpileOnly: true,
  project: './tsconfig.json',
});
