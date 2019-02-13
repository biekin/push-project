import { Handler } from '../objects/Handler'
import { IHandler } from '../Interfaces/IHandler'
import { StringLeaf } from '../implementations/StringLeaf'
import { Composite } from '../objects/Composite'

export class FourthHandler extends Handler {
  _handler: Handler;
  _componet: Composite<String>;

  constructor() {
    super();
    this._componet = new Composite("city");
  }

  public Handle(data: any) {
    var newComposite = new Composite("city");

    if ('city' in data) {
      var city = data.city;

      if (typeof city === 'string') {
        var newLeaf = new StringLeaf("   " + city);
        newComposite.add(newLeaf);
      }
      else {
        if(typeof city === 'object') {
          for (let iter in city) {
            var newLeaf = new StringLeaf("   " + city[iter]);
            newComposite.add(newLeaf);
          }
        }
      }

      this._componet.add(newComposite);

      if(typeof this._handler !== 'undefined') {
        this._handler.SetComponent(this._componet);
        return this._handler.Handle(data);
      }
    }

    return this._componet;

  }
}
