/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint no-undef: 0 */

import express, { static } from 'express';

const PORT = 3000;
const app = express();

app.use(static(`${__dirname}/dist/`));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
