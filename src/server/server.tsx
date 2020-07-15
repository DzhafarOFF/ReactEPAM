/* eslint-disable */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { configureStore } from '../client/App/ConfigureStore';
import { Provider } from "react-redux";
import App from "../client/App/App";
import { getMovies } from "../client/App/thunkAction/getMovies";
import fetchNode from 'node-fetch';
const path = require('path');
import express, { Request, Response } from "express";
//(global as any).fetch = require('node-fetch');
Object.assign(global, { fetch: fetchNode });

const app = express();
const port = process.env.PORT || 3000;
const BUILD_DIR = path.join(process.cwd(), './public');

app.use('/static', express.static(path.join(BUILD_DIR, 'static')));
app.use('/images', express.static(path.join(BUILD_DIR, 'images')));

app.get('*', (req: Request, res: Response) => {
    
    const store = configureStore();
    getMovies('https://reactjs-cdp.herokuapp.com/movies')(store.dispatch, store.getState, null);
    const Root = (
        <Provider store={store}>
            <App />
        </Provider>
    )
    const htmlContent = renderToString(Root);
    const preloadedState = store.getState()
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React</title>
            <link rel="stylesheet" href="/static/main.css">
        </head>
        
        <body>
            <div id="root">${htmlContent}</div>
            <script>
                window.__PRELOADED_STATE__ = ${ JSON.stringify(preloadedState) }
            </script>
            <script src="/static/main.js"></script>
        </body>
        </html>
    `;
    res.send(html);
});

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});