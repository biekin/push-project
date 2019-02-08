import { IObserver } from './../Interfaces/IObserver';
import { IObservable } from './../Interfaces/IObservable';
    export abstract class Emitter<T> implements IObservable {
        private _observers: IObserver[];
        private _newData: T;
        private _oldData: T;
        private _interval: number;
        private _started: Boolean;
        private _getDataParameters: any;

        constructor(interval: number, getDataParametrs: any, initalData: T) {
            this._observers = [];
            this._interval = interval;
            this._getDataParameters = getDataParametrs;
            this._oldData = initalData;
            this._newData = this._oldData;
            this._started = false; 
        }

        public RegisterObserver(observer: IObserver): void {
            this._observers.push(observer);
            return;
        }

        public RemoveObserver(observer: IObserver): void {
            this._observers = this._observers.filter((a) => a !== observer);
            return;
        }

        public NotifyObservers() {
            let newData: T = this.NewData(this._oldData, this._newData);
            this._observers.forEach((observer) => observer.ReceiveNotification(newData))
            return;
        }

        // Will be called to extract new data
        abstract NewData(OldData: T, NewData: T): T;

        // Will be called every interval time 
        abstract GetData(Parameters: any): T|null

        // Will be called to check if data have changed
        abstract DataChanged(OldData: T, NewData: T): Boolean;
        
        public start(): void{
            if(this._started) {
                return; 
            }
            let newData = this.GetData(this._getDataParameters);
            if(newData === null) {
                this._newData = this._oldData; 
            } else {
                this._newData = newData;
                this.NotifyObservers();
            }
            this._started = true;
            setInterval(() => {
                let newData = this.GetData(this._getDataParameters);
                if(newData === null) {
                    this._newData = this._oldData; 
                } else {
                    this._oldData = this._newData;
                    this._newData = newData;
                }
                if(this.DataChanged(this._oldData, this._newData)) {
                    this.NotifyObservers();
                }
            }, this._interval)
            return;
        }
    }