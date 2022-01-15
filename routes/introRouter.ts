import express from 'express'

export const introRouter = express.Router();

introRouter.get('/', (res, req) => {
    req.render('main', {})
});