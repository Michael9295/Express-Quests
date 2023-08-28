const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    const errors = [];
  
    if (!title) {
      errors.push({ field: "title", message: "This field is required" });
    } else if (title.length >= 255) {
      errors.push({ field: "title", message: "Should contain less than 255 characters" });
    }
  
    if (!director) {
      errors.push({ field: "director", message: "This field is required" });
    } else if (director.length >= 100) {
      errors.push({ field: "director", message: "Should contain less than 100 characters" });
    }
  
    if (!year) {
      errors.push({ field: "year", message: "This field is required" });
    } else if (isNaN(year) || year < 1800 || year > new Date().getFullYear()) {
      errors.push({ field: "year", message: "Invalid year value" });
    }
  
    if (!color) {
      errors.push({ field: "color", message: "This field is required" });
    } else if (!["black-and-white", "color"].includes(color)) {
      errors.push({ field: "color", message: "Should be 'black-and-white' or 'color'" });
    }
  
    if (!duration) {
      errors.push({ field: "duration", message: "This field is required" });
    } else if (isNaN(duration) || duration <= 0) {
      errors.push({ field: "duration", message: "Invalid duration value" });
    }
  
    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
  };

  
  const validateUser = (req, res, next) => {
    const { firstname, lastname, email, city, language, hashedPassword } = req.body;
    const errors = [];
  
    if (!firstname) {
      errors.push({ field: "firstname", message: "This field is required" });
    } else if (firstname.length >= 50) {
      errors.push({ field: "firstname", message: "Should contain less than 50 characters" });
    }
  
    if (!lastname) {
      errors.push({ field: "lastname", message: "This field is required" });
    } else if (lastname.length >= 50) {
      errors.push({ field: "lastname", message: "Should contain less than 50 characters" });
    }
  
    if (!email) {
      errors.push({ field: "email", message: "This field is required" });
    } else if (!isValidEmail(email)) {
      errors.push({ field: "email", message: "Invalid email format" });
    }
  
    if (!city) {
      errors.push({ field: "city", message: "This field is required" });
    } else if (city.length >= 100) {
      errors.push({ field: "city", message: "Should contain less than 100 characters" });
    }
  
    if (!language) {
      errors.push({ field: "language", message: "This field is required" });
    } else if (language.length !== 2) {
      errors.push({ field: "language", message: "Should be a valid ISO 2-letter language code" });
    }
  
    if (!hashedPassword) {
      errors.push({ field: "hashedPassword", message: "This field is required" });
    }
  
    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
  };
  
  module.exports = {
    validateMovie,
    validateUser,
  };
  