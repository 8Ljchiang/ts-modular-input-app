import { ITable } from "./ITable";
import { IModule } from "./IModule";
import { IView } from "./IView";

export interface IParseTable {
    handlers: ITable;
    handle(args: {input: any, module: IModule, view: IView}): void;
    handleError(args: {input: any, module: IModule, view: IView }): void;
}
