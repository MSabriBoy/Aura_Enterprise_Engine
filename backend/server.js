require("dotenv").config();

const app = require("./src/app");
const connectDatabase = require("./src/config/db");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Application startup failed", error);
    process.exit(1);
  }
})();