import { Handler } from '../objects/Handler'
import { IHandler } from '../Interfaces/IHandler'
import { StringLeaf } from '../implementations/StringLeaf'
import { Composite } from '../objects/Composite'

export class LastHandler extends Handler {
  _handler: Handler;
  _componet: Composite<String>;

  constructor() {
    super();
    //this._componet = new Composite("level");
  }

  public Handle(data: any) {
    var newComposite = new Composite("end of alert");

    this._componet.execute();
    return this._componet;

  }
}
