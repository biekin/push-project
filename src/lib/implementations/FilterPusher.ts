import { Pusher } from '../objects/Pusher'
import express from 'express';

    export class SimplePusher extends Pusher {
        private _connections: express.Response[];
        private _filterFunction: any;

        constructor(filter: any) {
            super();
            this._connections = [];
        }

        public addConnection(conn: express.Response) {
            this._connections.push(conn);
        }

        pushData(Data: any): void {
            let filteredData = this._filterFunction(Data);
            this._connections.forEach((res) => res.send(filteredData));
            this._connections = [];
        }
    }