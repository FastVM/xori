
const path = require('path');
const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression({
    level: 9,
}));

app.use(express.static(path.join(__dirname, '../public')));

const holder = app.listen(18820, () => {
    console.log(holder.address());
});
