
import { IComponent } from './../Interfaces/IComponent';


export abstract class Leaf<T> implements IComponent {

    _data: T;

    constructor(initialData: T){
      this._data = initialData;
    }

    public abstract execute(): void;
}
