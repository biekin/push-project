import express = require('express');
import {SimplePushEndpoint} from '../lib/LongPollLib';
import {FirstHandler} from '../lib/implementations/FirstHandler';
import {SecondHandler} from '../lib/implementations/SecondHandler';
import {ThirdHandler} from '../lib/implementations/ThirdHandler';
import {FourthHandler} from '../lib/implementations/FourthHandler';
import {LastHandler} from '../lib/implementations/LastHandler';
import {Alert, connect} from './alerts'
import { MyPushEndpoint } from './MyPushEndpoint'
var bodyParser = require('body-parser')
const cors = require('cors')
var path = require('path');

const app: express.Application = express();
const PushEndpoint: SimplePushEndpoint = new SimplePushEndpoint('/hello');
const DatabasePushEndpoint: MyPushEndpoint = new MyPushEndpoint('/alerts', Alert, {});

app.use(express.static(path.join(__dirname, '../server')));

app.configure(function(){
    app.use(bodyParser.json())
    app.use(cors({ origin: 'http://localhost:3000', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'x-access-token', 'XSRF-TOKEN'], preflightContinue: false }));
})

app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname + '/index.html'))
})

app.post('/alert', (req, res) => {
    console.log(req.body);

    var handler = new FirstHandler();
    var handler2 = new SecondHandler();
    var handler3 = new ThirdHandler();
    var handler4 = new FourthHandler();
    var handler5 = new LastHandler();

    handler.AddHandler(handler2);
    handler2.AddHandler(handler3);
    handler3.AddHandler(handler4);
    handler4.AddHandler(handler5);

    handler.Handle(req.body);



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
