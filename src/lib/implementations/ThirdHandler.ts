import { Handler } from '../objects/Handler'
import { IHandler } from '../Interfaces/IHandler'
import { StringLeaf } from '../implementations/StringLeaf'
import { Composite } from '../objects/Composite'

export class ThirdHandler extends Handler {
  _handler: Handler;
  _componet: Composite<String>;

  constructor() {
    super();
    //this._componet = new Composite("level");
  }

  public Handle(data: any) {
    var newComposite = new Composite("country");

    if ('country' in data) {
      var country = data.country;

      if (typeof country === 'string') {
        var newLeaf = new StringLeaf("  " + country);
        newComposite.add(newLeaf);
      }
      else {
        if(typeof country === 'object') {
          for (let iter in country) {
            var newLeaf = new StringLeaf("  " + country[iter]);
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
