const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const newsRoutes = require('./routes/news');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/news', newsRoutes);

mongoose.connect('mongodb://localhost:27017/newsDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(3000, () => console.log('Server running on port 3000'));