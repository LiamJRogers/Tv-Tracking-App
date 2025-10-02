require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { createUsersTable } = require("./models/userModel");
const { createRefreshTokensTable } = require("./models/refreshTokenModel");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/api", authRoutes);

const startServer = async () => {
  try {
    await createUsersTable();
    await createRefreshTokensTable();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
