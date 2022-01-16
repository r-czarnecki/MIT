import express from "express";
import csurf from "csurf";
import session from "express-session";
import connectSqlite from "connect-sqlite3";
import cookieParser from "cookie-parser";
import { introRouter } from "./routes/introRouter.js";
import { menuRouter } from "./routes/menuRouter.js";
import { mapRouter } from "./routes/mapRouter.js";
import { changeFormRouter } from "./routes/changeFormRouter.js";
import { changeFormSuccessfulRouter } from "./routes/changeFormSuccessfulRouter.js";
import { newPointerRouter } from "./routes/newPointerRouter.js";

const app = express();

const SQLiteStore = connectSqlite(session);

const csrfProtection = csurf({ cookie: true });

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "sdfsdfsdjfhiu",
    store: new SQLiteStore(),
  })
);
app.use(express.static("public"));
app.use(csrfProtection);

app.set("view engine", "pug");

app.use("/", introRouter);
app.use("/menu", menuRouter);
app.use("/map", mapRouter);
app.use("/changeForm", changeFormRouter);
app.use("/changeFormSuccessful", changeFormSuccessfulRouter);
app.use("/newPointer", newPointerRouter);

app.listen(3000, () => {
  console.log(
    `App is running at http://localhost:3000/ in ${app.get("env")} mode`
  );
  console.log("Press Ctrl+C to stop.");
});
