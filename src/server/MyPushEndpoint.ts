import { PushEndpoint, MongoEmitter, SimplePusher } from '../lib/LongPollLib';
import mongoose from 'mongoose';

export class MyPushEndpoint extends PushEndpoint {
    
    constructor(EndpointName: string, Model: mongoose.Model<any>, Query: Object) {
        const PusherImpl: SimplePusher = new SimplePusher();
        const EmitterImpl: MongoEmitter = new MongoEmitter(1000, Model, Query);
        super(EndpointName, EmitterImpl, PusherImpl);
    }
}