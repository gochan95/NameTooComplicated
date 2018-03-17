const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
const app = express();

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

app.get('/api/signin', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
