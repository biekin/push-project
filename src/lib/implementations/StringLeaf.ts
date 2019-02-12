import { Leaf } from '../objects/Leaf'

export class StringLeaf extends Leaf<String> {
   _data: String;

  constructor(initialData: String){
    super(initialData);
  }

  public execute(): void {
    console.log(this._data);
  }

}
