const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();
const app = express();


// Zone info storage
let zoneInfo = 'unknown';
const axios = require('axios');

// Fetch zone info from metadata endpoint on startup
async function fetchZoneInfo() {
  try {
    // Azure example endpoint; change if needed for your cloud
    const response = await axios.get('http://169.254.169.254/metadata/instance/compute/zone?api-version=2021-02-01&format=text', {
      headers: { 'Metadata': 'true' },
      timeout: 2000
    });
    zoneInfo = response.data;
    console.log('Zone info fetched:', zoneInfo);
  } catch (err) {
    console.error('Failed to fetch zone info:', err.message);
  }
}
fetchZoneInfo();

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// /zone endpoint
app.get('/zone', (req, res) => {
  res.json({ zone: zoneInfo });
});

// Proxy API requests to internal app tier
const internalApiUrl = process.env.INTERNAL_APP_TIER_URL;
if (!internalApiUrl) {
  throw new Error('INTERNAL_APP_TIER_URL environment variable is not set');
}
app.use('/api', createProxyMiddleware({
  target: internalApiUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api from the proxied request path
  }
}));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});
