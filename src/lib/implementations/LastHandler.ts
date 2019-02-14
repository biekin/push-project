import { Handler } from '../objects/Handler'
import { IHandler } from '../Interfaces/IHandler'
import { ObjectLeaf } from '../implementations/ObjectLeaf'
import { StringLeaf } from '../implementations/StringLeaf'
import { Composite } from '../objects/Composite'

export class LastHandler extends Handler {
  _handler: Handler;
  private _componet: Composite<String>;

  constructor() {
    super();
    this._componet = new Composite<String>("inne");
  }

  public Handle(data: any) {


    if ('disasterType' in data && typeof data.disasterType === 'string') {
      console.log("last");
      var newLeaf = new ObjectLeaf(data);
      this._componet.add(newLeaf);
      return this._componet;
    }
    if(typeof this._handler !== 'undefined') {
      return this._handler.Handle(data);
    }

     return this._componet;
  }

  AddComponent(components: Composite<String>[]):void {
    for (let iter in components) {
      if (components[iter].getData() === "inne") {
        this._componet = components[iter];
      }
    }
  }
}
