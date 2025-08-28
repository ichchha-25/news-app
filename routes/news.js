const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Add news
router.post('/', async (req, res) => {
  const news = new News(req.body);
  await news.save();
  res.status(201).json(news);
});

// Get paginated news
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const newsItems = await News.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  const total = await News.countDocuments();
  res.json({ newsItems, total });
});

// Get single news by ID
router.get('/:id', async (req, res) => {
  const news = await News.findById(req.params.id);
  res.json(news);
});

module.exports = router;