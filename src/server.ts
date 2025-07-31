// server.ts
const dotenv = require("dotenv");
dotenv.config();


import app from "./app"
import connectdb from "./config/db";
const PORT = process.env.PORT || 5000;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
