import { Handler } from '../objects/Handler'
import { IHandler } from '../Interfaces/IHandler'
import { NumberLeaf } from '../implementations/NumberLeaf'

export class NumberHandler extends Handler {
  _handler: Handler;

  constructor() {
    super();
  }

  public Handle(data: any) {
    if (typeof data === 'number') {
      console.log(data.toString() + "handled by number handler");
      return new NumberLeaf(data);
    }
    else {
      if(typeof this._handler !== 'undefined') {
          return this._handler.Handle(data);
      }
      else {
        console.log("data not handled");
        return new NumberLeaf(0);
      }
    }
  }

}
