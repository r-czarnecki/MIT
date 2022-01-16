import express from "express";

export const changeFormSuccessfulRouter = express.Router();

changeFormSuccessfulRouter.get("/", (res, req) => {
  req.render("changeFormSuccessfulView", {});
});
