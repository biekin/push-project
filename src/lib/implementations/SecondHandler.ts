import { Handler } from '../objects/Handler'
import { IHandler } from '../Interfaces/IHandler'
import { StringLeaf } from '../implementations/StringLeaf'
import { Composite } from '../objects/Composite'

export class SecondHandler extends Handler {
  _handler: Handler;
  _componet: Composite<String>;

  constructor() {
    super();
  }

  public Handle(data: any) {
    var newComposite = new Composite("level");

    if ('level' in data) {
      var level = data.level;

      if (typeof data.level === 'string') {
        var newLeaf = new StringLeaf(' ' + data.level);
        newComposite.add(newLeaf);
      }
      else {
        if(typeof level === 'object') {
          for (let iter in level) {
            var newLeaf = new StringLeaf(' ' +level[iter]);
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
