const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = express.Router();
const loginRouter = express.Router();

const cors = require("cors");
const mysql = require("mysql");
const QueryBuilder = require("node-querybuilder");
const settings = {
  host: "server.rpsoftech.xyz",
  user: "pathshala_server",
  password: "JtYd#e$r%10PgRr",
  database: "pathshala",
  // version:"5.7.29"
};
// let con = mysql.createConnection(settings);
// con.connect(function(err) {
//   if (err) console.log(err);
//   // console.log("Connected!");
// });
const pool = new QueryBuilder(settings, "mysql", "pool");
//escape to escape
const token = {
  accessTokenkey:
    "151c095c45243a9303453f73fb70e0f6dc0fbe8efbc2770ebe1f21e8ce94fba037fbbc060151262012c1e5f58dcb881c00aec7d82ddf1f7fd81ccd904e331682",
  refreshToken:
    "2a442f557658ce7cd403c6bfd3ee68b4ec3a9d16898d78d7dd9a54b7af9178ce97e502b0dc343882bb744b3379a2e75965ab469cb6e21a76387ee35e13ffb299",
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
    if (user.user_rights && typeof user.user_rights == "string") {
      user.user_rights = JSON.parse(user.user_rights);
    }
    req.user = user;
    res.locals = {};
    next();
  });
};
function generateAccessToken(user) {
  return jwt.sign(user, token.accessTokenkey, { expiresIn: "1d" });
}
function generateRefreshToken(user) {
  return jwt.sign(user, token.refreshToken);
}
const gerUserDetails = function (params) {
  return new Promise((resolve, reject) => {
    pool.get_connection((db) => {
      db.select([
        "ub.name",
        "ub.gender",
        "ub.mobile_no",
        "ub.dob",
        "ub.city",
        "ub.other as user_data",
        "sd.sangh_name",
      ]).from("user_basic as ub");
      if (params.id && params.password) {
        db.where("us.unique_id", params.id)
          .where("us.password", params.password)
          .join("users as us", "us.user_id = ub.user_id", "left");
      }
      if (params.user_id) {
        db.where("ub,user_id", params.user_id);
      }
      db.join("sangh_details as sd", "sd.sangh_id = ub.sangh", "left");

      db.get((err, result) => {
        db.release();
        resolve([err, result]);
      });
    });
  });
};
const addRefreshTokenandMakeEntry = function (user, token) {
  pool.get_connection((qb) => {
    qb.insert(
      "jwt_tokens",
      {
        user_id: user.user_id,
        token: token,
        created_at: Math.floor(Date.now() / 1000),
      },
      (err, res) => {
        qb.release();
      }
    );
  });
};
app.use("/api", router);
app.use('/test',(req,res)=>{
  res.send('suceess');
});
app.use("/loginserver", loginRouter);
loginRouter.post("/login", (req, res) => {
  let data = req.body;
  if (
    data.id &&
    typeof data.id !== "undefined" &&
    data.password &&
    typeof data.password !== "undefined"
  ) {
    gerUserDetails(data).then(([err, result]) => {
      if (err) res.send({ success: 0, error: err });
      if (result.length > 0) {
        res.locals = {
          success: 1,
          data: result[0],
        };
        let user = JSON.parse(JSON.stringify(result[0]));
        res.locals.data.accessToken = generateAccessToken(user);
        res.locals.data.refreshToken = generateRefreshToken(user);
        addRefreshTokenandMakeEntry(user, res.locals.data.refreshToken);
        res.send(res.locals);
      } else {
        res.send({ success: 0 });
      }
    });
  } else {
    res.send({
      success: 0,
    });
  }
});
loginRouter.post("/refreshaceesstoken", (req, res) => {
  let data = req.body;
  if (data.token && typeof data.token !== "undefined") {
    jwt.verify(data.token, token.refreshToken, (err, user) => {
      if (err) return res.sendStatus(403);
      gerUserDetails(user).then(([err,result])=>{
        if (err) return res.sendStatus(403);
        if (result.length > 0) {
          res.locals = {
            success: 1,
            data: result[0],
          };
          let user = JSON.parse(JSON.stringify(result[0]));
          res.locals.data.accessToken = generateAccessToken(user);
          res.send(res.locals);
        } else {
          res.send({ success: 0 });
        }
      });
    });
  } else {
    res.sendStatus(401);
  }
});
router.use(authenticateToken);
router.all('/islogin',(req,res)=>{
  res.send({
    success:1
  });
});
router.post("/mydetails", (req, res) => {
  res.send(req.user);
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});
