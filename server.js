const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();
const app = express();

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

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
