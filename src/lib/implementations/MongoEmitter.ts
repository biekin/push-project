import {PromiseEmitter} from '../modules/Objects'
import mongoose from 'mongoose';
    export class MongoEmitter extends PromiseEmitter<Array<any>> {

        constructor(interval: number, model: mongoose.Model<any>, query: Object) {
            super(interval, {model: model, query: query}, []);
        }

        DataChanged(OldData: Array<any>, NewData: Array<any>) {
            if (OldData.length != NewData.length) {
                return true;
            } else {
                return false;
            }
        }

        NewData(OldData: Array<any>, NewData: Array<any>) {
            let oldDataInd = OldData.map((a: any) => String(a._id))
            return NewData.filter((value: any) => oldDataInd.indexOf(String(value._id)) == -1);
        }

        GetData(Parameters: {model: mongoose.Model<any>, query: Object}) {

            let result: any = Parameters.model.find(Parameters.query)
            return result;
        }
    }
