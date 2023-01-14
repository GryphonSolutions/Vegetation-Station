require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

// Initialize Server
const app = express();
const PORT = process.env.PORT || 8080;

// Serving Compressed Bundle File to Client
const clientDirPath = path.join(__dirname, '/../client/public');
const clientIndexHtml = path.join(clientDirPath, 'index.html');
app.get('/*.js', (req, res, next) => {
  const pathToGzipFile = `${req.url}.gz`;
  try {
    if (fs.existsSync(path.join(clientDirPath, pathToGzipFile))) {
      req.url += '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'text/javascript');
    }
  } catch (err) {
    console.error(err);
  }
  next();
});

// Serve the index.html file statically
app.use(express.json());
app.use(express.static(clientDirPath));
app.use(morgan('dev'));

app.listen(PORT, console.log(`Now listening on ${process.env.HOST}:${PORT}`));
