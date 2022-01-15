import express from "express";

export const mapRouter = express.Router();

mapRouter.get("/", (res, req) => {
  req.render("mapView", {});
});
