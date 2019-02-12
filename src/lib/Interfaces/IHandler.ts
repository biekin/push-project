import { IComponent } from './../Interfaces/IComponent';

export interface IHandler {
    Handle<T>(data: T): IComponent;
    AddHandler(handler: IHandler): void;
}
