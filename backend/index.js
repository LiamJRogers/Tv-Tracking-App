require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { createUsersTable } = require("./models/userModel");
const { createRefreshTokensTable } = require("./models/refreshTokenModel");
const { createSeriesTable } = require("./models/seriesModel");
const { createSeasonsTable } = require("./models/seasonModel");
const { createEpisodesTable } = require("./models/episodeModel");
const { createCastTable } = require("./models/castModel");
const { createWatchlistTable } = require("./models/watchlistModel");
const { createWatchedEpisodesTable } = require("./models/watchedEpisodesModel");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const discoverRoutes = require("./routes/discoverRoutes");
const seriesRoutes = require("./routes/seriesRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const watchedEpisodesRoutes = require("./routes/watchedEpisodesRoutes");
const userSeriesRoutes = require("./routes/userSeriesRoutes");
const { createSeasonReviewsTable } = require("./models/seasonReviewModel");
const seasonReviewRoutes = require("./routes/seasonReviewRoutes");

app.use("/api", authRoutes);
app.use("/api", discoverRoutes);
app.use("/api", seriesRoutes);
app.use("/api", watchlistRoutes);
app.use("/api", watchedEpisodesRoutes);
app.use("/api", userSeriesRoutes);
app.use("/api", seasonReviewRoutes);

const startServer = async () => {
  try {
    await createUsersTable();
    await createRefreshTokensTable();
    await createSeriesTable();
    await createSeasonsTable();
    await createEpisodesTable();
    await createCastTable();
    await createWatchlistTable();
    await createWatchedEpisodesTable();
    await createSeasonReviewsTable();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
