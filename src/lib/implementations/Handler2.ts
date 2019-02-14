import { Handler } from '../objects/Handler'
import { IHandler } from '../Interfaces/IHandler'
import { ObjectLeaf } from '../implementations/ObjectLeaf'
import { StringLeaf } from '../implementations/StringLeaf'
import { Composite } from '../objects/Composite'

export class Handler2 extends Handler {
  _handler: Handler;
  private _componet: Composite<String>;

  constructor() {
    super();
    this._componet = new Composite<String>("pożar");
  }

  public Handle(data: any) {

    if ('disasterType' in data && typeof data.disasterType === 'string' && data.disasterType == 'pożar') {
      var newLeaf = new ObjectLeaf(data);
      this._componet.add(newLeaf);
      return this._componet;
    }
    if(typeof this._handler !== 'undefined') {
      return this._handler.Handle(data);
    }

     return this._componet;
  }

  AddComponent(components: any):void {
    if (typeof components.pożar !== 'undefined') {
      this._componet = components.pożar;
    }
  }
}
