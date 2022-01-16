import express from "express";

export const changeFormRouter = express.Router();

changeFormRouter.get("/", (res, req) => {
  req.render("changeFormView", {});
});
