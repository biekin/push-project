
import { IComponent } from './../Interfaces/IComponent';


export class Composite<T> implements IComponent {

    private _list: IComponent[];
    private _data: T;

    constructor(initialData: T){
      this._list = [];
      this._data = initialData;
    }

    public execute(): void {
      for (var i =0; i < this._list.length; i += 1) {
        this._list[i].execute();
      }
    }

    public add(c: IComponent): void {
      this._list.push(c);
    }

    public remove(n: number): void {
      if (this._list.length <= n) {
        throw new Error("index out of bound!");
      }
      this._list.splice(n,1);
    }

    public getData(): T {
      return this._data;
    }
}
