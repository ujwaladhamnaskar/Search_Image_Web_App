require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const pixabayApiKey = process.env.PIXABAY_API_KEY;

app.use(cors());
app.use(express.json());

// app.get('/api/health', (req, res) => {
//   res.json({ ok: true });
// });

app.get('/api/images', async (req, res) => {
  if (!pixabayApiKey) {
    return res.status(500).json({ error: 'Missing PIXABAY_API_KEY' });
  }

  const query = req.query.q || req.query.query || '';
  const page = Number.parseInt(req.query.page, 10) || 1;
  const perPageInput = Number.parseInt(req.query.per_page, 10) || 20;
  const perPage = Math.max(1, Math.min(200, perPageInput));
  try {
    const url = 'https://pixabay.com/api/';
    const params = {
      key: pixabayApiKey,
      q: query,
      image_type: 'photo',
      page,
      per_page: perPage
    };
    const response = await axios.get(url, { params });
    const totalHits = typeof response.data?.totalHits === 'number' ? response.data.totalHits : 0;
    const totalPages = Math.max(1, Math.ceil(totalHits / perPage));
    res.json({ ...response.data, page, per_page: perPage, totalPages });
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json({ error: 'Failed to fetch images from Pixabay' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});


