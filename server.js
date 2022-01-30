/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint no-undef: 0 */

const PORT = process.env.PORT || 4000;
const app = require('express')();
const static = require('express').static;
const dir = `${__dirname}/dist`;

app.use(static(dir));

app.get('*', function (req, res) {
  res.sendFile(`${dir}/index.html`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
