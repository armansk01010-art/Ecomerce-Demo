import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || process.env.APP_PORT || 3000;

// Serve built static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// SPA Fallback: Send index.html for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`MAISON NOVE server is running on port ${PORT}`);
});
