import { ITable } from "./ITable";
import { IParseTableArgs } from "./Args";

export interface IParseTable {
    handlers: ITable;
    handle(args: IParseTableArgs): void;
    handleError(args: IParseTableArgs): void;
}
