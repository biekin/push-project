import {Emitter} from '../objects/Emitter'
    export class HelloEmitter extends Emitter<String> {

        constructor(interval: number) {
            super(interval, "", "");
        }

        DataChanged(OldData: String, NewData: String) {
            return true;
        }

        NewData(OldData: String, NewData: String) {
            return NewData;
        }

        GetData(Parameters: String) {
            return "Hello";
        }
    }
