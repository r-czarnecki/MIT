import express from 'express'

export const mapViewRouter = express.Router();

mapViewRouter.get('/', (res, req) => {
    req.render('mapViewView', {})
});