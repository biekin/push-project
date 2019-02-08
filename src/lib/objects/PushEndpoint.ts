import { Emitter } from "./Emitter";
import { Pusher } from './Pusher';
import express from 'express';
import { PromiseEmitter } from "./PromiseEmitter";

export abstract class PushEndpoint {
    private _EndPointName: string;
    private _Emitter: Emitter<any>|PromiseEmitter<any>;
    private _Pusher: Pusher;

    constructor(EndPointName: string, Emiter: Emitter<any>|PromiseEmitter<any>, Pusher: Pusher) {
        this._EndPointName = EndPointName;
        this._Emitter = Emiter;
        this._Pusher = Pusher;
    }

    private handleGet = (req: express.Request, res: express.Response) => {
        this._Pusher.addConnection(res);
    }

    public start(app: express.Application): void {
        app.get(this._EndPointName, this.handleGet)
        this._Emitter.RegisterObserver(this._Pusher);
        this._Emitter.start();
    }    
}