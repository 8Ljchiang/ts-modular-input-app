import { IParser } from "../interfaces/IParser";
import { IParserStore } from "../interfaces/IParserStore";

export default class ParserStore implements IParserStore{
    public parserCollection: { [key: string]: IParser };

    constructor(args: { parserCollection?: { [key: string]: IParser } }) {
        this.parserCollection = args.parserCollection || {};
    }

    getParser(parserId: string): IParser {
        return this.parserCollection[parserId];
    }

    addParser(parser: IParser): void {
        this.parserCollection[parser.id] = parser;
    }

    removeParser(parserId: string): void {
        delete this.parserCollection[parserId];
    }
}