import { IParser } from "../interfaces/IParser";
import { IParserStore } from "../interfaces/IParserStore";

export default class ParserStore implements IParserStore{
    public parserCollection: { [key: string]: IParser };

    constructor(args: { parserCollection?: { [key: string]: IParser } }) {
        this.parserCollection = args.parserCollection || {};
    }

    getParser(parserId: string): IParser {
        const result = this.parserCollection[parserId];
        return Object.assign({}, result);    
    }

    addParser(parser: IParser): void {
        this.parserCollection[parser.id] = parser;
    }

    removeParser(parserId: string): void {
        delete this.parserCollection[parserId];
    }
}
