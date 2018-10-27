import { IParser } from "./IParser";

export interface IParserStore {
    parserCollection: { [key: string]: IParser};
    getParser(parserId: string): IParser;
    addParser(parser: IParser): void;
    removeParser(parserId: string): void;
}