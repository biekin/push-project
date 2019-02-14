import express = require('express');
import {SimplePushEndpoint} from '../lib/LongPollLib';

import {Handler2} from '../lib/implementations/Handler2';
import {Handler1} from '../lib/implementations/Handler1';
import {LastHandler} from '../lib/implementations/LastHandler';
import {Composite} from '../lib/objects/Composite';

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
    var inne = new Composite<String>("inne");
    var listtt = new Array(inne);
    var pozar = new Composite<String>("pożar");

    listtt.push(pozar);

    var handler = new Handler1();
    var handler2 = new Handler2();
    var handler3 = new LastHandler();

    handler.AddHandler(handler2);
    handler2.AddHandler(handler3);

    handler.AddComponent(listtt);
    var a = handler.Handle(req.body);
    a.execute();




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
