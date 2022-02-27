const express = require("express");
const path = require("path");
const connectDB = require('./config/database');
const { PORT } = require('./settings');

// Init app
const app = express();
app.use(express.json({ extended: false }));

// Connect to database
connectDB();

// Routing
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/food', require('./routes/food'));

// Serve static assets in production
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Let app listen!
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
