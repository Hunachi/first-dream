/*
 $ firebase deploy --only functions
 and set uri
*/

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const http = require('request');
const { DialogflowApp } = require('actions-on-google');
const functions = require('firebase-functions');

/*これ失敗してるのでfitttを使いましょう。*/
const options = {
    uri: "https://9399d71d.ngrok.io/google-home-notifier",
    headers: {
        "Content-type": "application/x-www-form-urlencoded",
    },
    form: {
        "text": "おやすみ"
    }
};

exports.yourAction = functions.https.onRequest((request, response) => {
    const app = new DialogflowApp({request, response});
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));

    function responseHandler(app) {
        const speechStr = "おやすみなさい";
        app.tell(speechStr);
    }

    const actionMap = new Map();

    //hatsuyume-trigger
    http.post(options, function(error, response, body){});

    actionMap.set('action.oyasumi', responseHandler);
    app.handleRequest(actionMap);
});

