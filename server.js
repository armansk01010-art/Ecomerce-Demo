import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || process.env.APP_PORT || 3000;

// Enable HTTP compression (Gzip / Brotli)
app.use(compression());

// Serve static images and assets with 1-year immutable caching
app.use('/images', express.static(path.join(__dirname, 'public/images'), {
  maxAge: '1y',
  immutable: true
}));

app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// Fallback SPA routing
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`MAISON NOVE server is running on port ${PORT}`);
});
