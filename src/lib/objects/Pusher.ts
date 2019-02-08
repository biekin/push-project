import { IObserver } from './../Interfaces/IObserver';
import express from 'express';

    export abstract class Pusher implements IObserver {
        public ReceiveNotification(Data: any) {
            this.pushData(Data);    
        }

        abstract pushData(Data: any): void;
        abstract addConnection(conn: express.Response): void;
    }
