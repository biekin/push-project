import { Leaf } from '../objects/Leaf'

export class NumberLeaf extends Leaf<Number> {
   _data: Number;

  constructor(initialData: Number){
    super(initialData);
  }

  public execute(): void {
    console.log(this._data.toString());
  }
}
