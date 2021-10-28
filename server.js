/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint no-undef: 0 */

const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.static(`${__dirname}/dist/`));

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`);
});