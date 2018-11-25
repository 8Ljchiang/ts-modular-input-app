import { IParserStore } from "../interfaces/IParserStore";
import { IParser } from "../interfaces/IParser";
import { IParseTableArgs } from '../interfaces/Args';


export default class ParserDelegator {
    public parsersDictionary: { [key: string]: string };
    public parserStore: any;

    constructor(args: { parserDictionary: any, parserStore: IParserStore }) {
        this.parsersDictionary = args.parserDictionary;
        this.parserStore = args.parserStore;
    }

    delegate(args: IParseTableArgs) {
        const key = args.module.status;
        const parserId = this.getParserId(key);
        const parser: IParser = this.parserStore.getParser(parserId);
        parser.parseTable.handle(args);
    }

    getParserId(key: string): string {
        return this.parsersDictionary[key];
    }
}