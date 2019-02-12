
import { IHandler } from './../Interfaces/IHandler';
import { IComponent } from './../Interfaces/IComponent';

export abstract class Handler implements IHandler {

     _handler: Handler;

    public Handle(data: any): IComponent {
      if(typeof this._handler !== 'undefined') {
          return this._handler.Handle(data);
      }
      else {
        throw new Error("Abstract method!");
      }
    }

    public AddHandler(handler: Handler): void {
      this._handler = handler;
    }
}
