import express from "express";

export const menuRouter = express.Router();

menuRouter.get("/", (res, req) => {
  req.render("menuView", {});
});
