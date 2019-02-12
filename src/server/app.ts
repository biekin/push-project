import express = require('express');
import {SimplePushEndpoint} from '../lib/LongPollLib';
import {StringHandler} from '../lib/implementations/StringHandler';
import {NumberHandler} from '../lib/implementations/NumberHandler';
import {Alert, connect} from './alerts'
import { MyPushEndpoint } from './MyPushEndpoint'
var bodyParser = require('body-parser')
const cors = require('cors')
var path = require('path');

const app: express.Application = express();
const PushEndpoint: SimplePushEndpoint = new SimplePushEndpoint('/hello');
const DatabasePushEndpoint: MyPushEndpoint = new MyPushEndpoint('/alerts', Alert, {});

app.configure(function(){
    app.use(bodyParser.json())
    app.use(cors({ origin: 'http://localhost:3000', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'x-access-token', 'XSRF-TOKEN'], preflightContinue: false }));
})

app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname + '/index.html'))
})

app.post('/alert', (req, res) => {
    console.log(req.body);

    var handler = new StringHandler();
    var handler2 = new NumberHandler();
    handler2.AddHandler(handler);

    handler2.Handle(req.body.content);



    let alert = new Alert(req.body);

    alert.save((err: any) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(alert);
        }
    })
})

app.listen(3000, function(){
    PushEndpoint.start(app);
    connect(() => {DatabasePushEndpoint.start(app); console.log("started");});
    console.log('Listening on port 3000');
});
