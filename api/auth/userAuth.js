const { json } = require("body-parser");
const zod = require("zod");

const userData = zod.object({
  username: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string().min(8).max(16),
  email: zod.email(),
});

const userAuth = (req, res, next) => {
  const { username, firstname, lastname, email, password } = req.body;
  const ValidUserData = userData.safeParse({
    username,
    firstname,
    lastname,
    email,
    password,
  });
  if (ValidUserData.success) next();
  else res.status(403).json({
    message : "Provided data is Incorrect!"
  });
};

module.exports = userAuth;
