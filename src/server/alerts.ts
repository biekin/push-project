import mongoose from 'mongoose';

const url: string = 'mongodb://127.0.0.1:27017/local';

export function connect(callback: any) {
    mongoose.connect(url, (err: any) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log("Connected to database");
            callback();
        }
    });
}


export interface IAlert extends mongoose.Document {
    level: number;
    disasterType: string;
    country: string;
    city: [string];

}

export const AlertSchema = new mongoose.Schema({
    level: {type: String, required: true},
    disasterType: {type: String, required: true},
    country: {type: String, required: true},
    city: {type: [String], required: true}
})

export const Alert = mongoose.model('Alert', AlertSchema);
