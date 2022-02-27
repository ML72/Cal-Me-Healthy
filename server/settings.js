const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://TestUser:iLxdV4NGko3gbpTg@cluster0.wmikr.mongodb.net/Test?retryWrites=true&w=majority";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const LOGMEAL_TOKEN = process.env.LOGMEAL_TOKEN || 'Bearer 361e38ff582a835e138f424a164096025c463bbb'

module.exports = { PORT, MONGO_URI, JWT_SECRET, LOGMEAL_TOKEN };
