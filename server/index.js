const express = require("express");
const connectDB = require('./config/database');
const { PORT } = require('./settings');

const cors = require('cors')

// Init app
const app = express();
app.use(express.json({ extended: false }));
app.use(cors())

// Connect to database
connectDB();

// Routing
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/food', require('./routes/food'));

// Serve static assets in production
// something about importing path and whatnot, do this later

// Let app listen!
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
