const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = express.Router();
const cors = require("cors");
const mysql = require("mysql");
const QueryBuilder = require("node-querybuilder");
const settings = {
  host: "server.boozup.net",
  user: "testing",
  password: "qwertyuiop",
  database: "server",
  // version:"5.7.29"
};
handleDisconnect();
const pool = new require('node-querybuilder')(settings,'mysql','pool');
//escape to escape
const token ={
  accessTokenkey:'151c095c45243a9303453f73fb70e0f6dc0fbe8efbc2770ebe1f21e8ce94fba037fbbc060151262012c1e5f58dcb881c00aec7d82ddf1f7fd81ccd904e331682',

};
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));

const authenticateToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token1 = authHeader && authHeader.split(" ")[1];
  if (token1 == null) return res.sendStatus(401);

  jwt.verify(token1, token.accessTokenkey, (err, user) => {
    if (err) return res.sendStatus(403);
    if(user.user_rights && typeof user.user_rights == 'string'){
      user.user_rights = JSON.parse(user.user_rights);
    }
    req.user = user;
    res.locals = {};
    next();
  });
};
function generateAccessToken(user) {
  return jwt.sign(user, token.accessTokenkey, { expiresIn: "1d" });
};
const addRefreshTokenandMakeEntry = function (user, token) {
  con.query(
    "INSERT INTO `jwt_tokens` (`user_id`, `token`, `created_at`) VALUES  (?,?,?)",
    [user.userid, token, Math.floor(Date.now() / 1000)],
    () => {}
  );
};
app.use("/api", router);
router.use(authenticateToken);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});
