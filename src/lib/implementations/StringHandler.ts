import { Handler } from '../objects/Handler'
import { IHandler } from '../Interfaces/IHandler'
import { StringLeaf } from '../implementations/StringLeaf'

export class StringHandler extends Handler {
  _handler: Handler;

  constructor() {
    super();
  }

  public Handle(data: any) {
    if (typeof data === 'string') {
      
      console.log("handled by string handler");
      var newLeaf = new StringLeaf(data);
      newLeaf.execute();
      return newLeaf;
    }
    else {
      if(typeof this._handler !== 'undefined') {
          return this._handler.Handle(data);
      }
      else {
        console.log("data not handled");
        return new StringLeaf("");
      }
    }
  }

}
