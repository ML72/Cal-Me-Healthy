const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://TestUser:iLxdV4NGko3gbpTg@cluster0.wmikr.mongodb.net/Test?retryWrites=true&w=majority";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

module.exports = { PORT, MONGO_URI, JWT_SECRET };