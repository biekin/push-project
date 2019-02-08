import { SimplePusher, HelloEmitter } from '../modules/Implementations';
import { PushEndpoint, Emitter } from '../modules/Objects';

export class SimplePushEndpoint extends PushEndpoint {
    
    constructor(EndpointName: string) {
        const PusherImpl: SimplePusher = new SimplePusher();
        const EmitterImpl: HelloEmitter = new HelloEmitter(10000);
        super(EndpointName, EmitterImpl, PusherImpl);
    }
}