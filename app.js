const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'SUCCESS',
    message: 'hello'
  })
});

const port = 1984;
app.listen(port, () => {
  console.log(`App runs on port: ${port}...`);
});
