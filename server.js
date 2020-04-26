const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const port = 5000;
const server = app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

app.get('/', (req, res) => {
  res.render('index');
});
