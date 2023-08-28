require("dotenv").config();
const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const userHandlers = require("./userHandlers");
const movieHandlers = require("./movieHandlers");
const authHandlers = require("./auth");
const { validateMovie, validateUser } = require("./validators");
const app = express();
const port = process.env.APP_PORT || 5000;
const { hashPassword, verifyPassword, verifyToken } = require("./auth");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

app.use(express.json());
app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);
app.post("/api/movies", verifyToken, validateMovie, movieHandlers.postMovie);
app.post("/api/users", authHandlers.hashPassword, validateUser, userHandlers.postUser);

// Middleware pour vérification du token
app.use(verifyToken);

// Routes protégées
app.put("/api/users/:id", authHandlers.hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id", authHandlers.checkUserId, userHandlers.deleteUser);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
