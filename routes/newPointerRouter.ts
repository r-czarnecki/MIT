import express from "express";

export const newPointerRouter = express.Router();

newPointerRouter.get("/", (res, req) => {
  req.render("newPointerView", {});
});
