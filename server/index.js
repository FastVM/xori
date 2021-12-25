const path = require('path');

const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const holder = app.listen(18820, () => {
    console.log(holder.address());
});
