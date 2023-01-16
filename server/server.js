require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const {
  catalogRouter,
  messagesRouter,
  offersRouter,
  plantsRouter,
  usersRouter,
} = require('./routers');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routers
app.use('/api/catalog', catalogRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/offers', offersRouter);
app.use('/api/plants', plantsRouter);
app.use('/api/users', usersRouter);

// Tell app to listen on specific port
app.listen(PORT, console.log(`Now listening on ${process.env.HOST}:${PORT}`));
