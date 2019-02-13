import { Handler } from '../objects/Handler'
import { IHandler } from '../Interfaces/IHandler'
import { StringLeaf } from '../implementations/StringLeaf'
import { Composite } from '../objects/Composite'

export class FirstHandler extends Handler {
  _handler: Handler;
  _componet: Composite<String>;

  constructor() {
    super();
    this._componet = new Composite("disasterType");
  }

  public Handle(data: any) {

    if ('disasterType' in data) {
      var disasterType = data.disasterType;
      if (typeof disasterType === 'string') {
        var newLeaf = new StringLeaf(disasterType.toUpperCase());
        this._componet.add(newLeaf);
      }
      else {
        if(typeof disasterType === 'object') {
          for (let iter in disasterType) {
            var newLeaf = new StringLeaf(disasterType[iter].toUpperCase());
            this._componet.add(newLeaf);
          }
        }
      }

      if(typeof this._handler !== 'undefined') {
        this._handler.SetComponent(this._componet);
        return this._handler.Handle(data);
      }
    }

    return this._componet;

  }
}
