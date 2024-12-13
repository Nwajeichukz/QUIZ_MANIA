const app = require("./index");
const connectDB = require("./config/db");


const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

connectDB(MONGO_URL);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));