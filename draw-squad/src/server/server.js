const express = require('express');

const app = express();


app.get('/api/signin', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
