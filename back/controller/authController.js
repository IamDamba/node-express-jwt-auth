const User = require("../models/User");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

// handle error
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, {
    expiresIn: maxAge,
  });
};

module.exports.smoothies_get = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log("an error occured on verify");
        res.status(400).json({ err: err.message, isGood: false });
      } else {
        res.status(200).json({ message: 'User Connected', isGood: true });
      }
    });
  } else {
    const err = "There is no user Authenticated";
    res.status(400).json({ err: err, isGood: false });
  }
};

module.exports.logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).send("Ok, jwt is deleted");
};

module.exports.currentUser_get = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log("an error occured on verify");
        res.locals.user = null;
        res.status(400).json({ isUser: false, user: res.locals.user });

      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user.email;
        res.status(200).json({ isUser: true, user: res.locals.user });
      }
    });
  } else {
    res.locals.user = null;
    res.status(400).json({ isUser: false, user: res.locals.user });
  }
};

module.exports.delete_get = async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log("an error occured on verify");
        res.locals.user = null;
        res.status(400).json({ user: res.locals.user });

      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        await User.deleteOne({ "_id" : res.locals.user._id })
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).send("Ok, jwt is deleted");
        res.status(200).json({ message: "User Successfuly Deleted" });
      }
    });
  } else {
    res.locals.user = null;
    res.status(400).json({ user: res.locals.user });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ message: 'Loggin Succesfully' });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ message: 'User registred successfully' });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
