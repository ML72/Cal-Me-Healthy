const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://TempDevUser:jgU9pEaZEsozwHVp@cluster0.7fybs.mongodb.net/Test?retryWrites=true&w=majority";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

module.exports = { PORT, MONGO_URI, JWT_SECRET };