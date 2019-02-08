import { Pusher } from '../objects/Pusher'
import express from 'express';

    export class SimplePusher extends Pusher {
        private _connections: express.Response[];

        constructor() {
            super();
            this._connections = [];
        }

        public addConnection(conn: express.Response) {
            this._connections.push(conn);
            console.log(this._connections.length);
        }

        pushData(Data: any): void {
            this._connections.forEach((res) => res.send(Data));
            this._connections = [];
        }
    }