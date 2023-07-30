require("dotenv").config();

const express = require("express");

const app = express();

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.use(express.json());
app.delete("/api/users/:id", movieHandlers.deleteUser);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.put("/api/users/:id", movieHandlers.updateUser);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.post("/api/users", movieHandlers.postUser);
app.post("/api/movies", movieHandlers.postMovie);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
