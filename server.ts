/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint no-undef: 0 */
import express, { Request, Response } from 'express';

const PORT = process.env.PORT || 4000;
const app = express();

const dir = `${__dirname}/dist`;

app.use(express.static(dir));

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(`${dir}/index.html`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
