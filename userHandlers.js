const argon2 = require('argon2');
const database = require("./database");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 2,
  parallelism: 1,
};

const postUser = (req, res) => {
    const { firstname, lastname, email, city, language, hashedPassword } = req.body; // Utiliser hashedPassword au lieu de password
  
    database
      .query(
        "INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language, hashedPassword]
      )
      .then(([result]) => {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the user");
      });
  };

  const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language, hashedPassword } = req.body; // Utiliser hashedPassword au lieu de password
  
    database
      .query(
        "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? WHERE id = ?",
        [firstname, lastname, email, city, language, hashedPassword, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error updating the user");
      });
  };
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("DELETE FROM users WHERE id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the user");
    });
};

const getUsers = (req, res) => {
    const languageParam = req.query.language;
    const cityParam = req.query.city;
  
    let query = "SELECT id, firstname, lastname, email, city, language FROM users WHERE 1=1";
    const queryParams = [];
  
    if (languageParam) {
      query += " AND language = ?";
      queryParams.push(languageParam);
    }
  
    if (cityParam) {
      query += " AND city = ?";
      queryParams.push(cityParam);
    }
  
    database
      .query(query, queryParams)
      .then(([users]) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("SELECT * FROM users WHERE id = ?", [id])
      .then(([users]) => {
        if (users.length > 0) {
          const user = { ...users[0] };
          delete user.hashedPassword; 
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "Not Found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

module.exports = {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
  getUserById,
};
