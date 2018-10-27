import { IModule } from "../interfaces/IModule";
import { IParserStore } from "../interfaces/IParserStore";
import { IParser } from "../interfaces/IParser";

export default class ParserDelegator {
    public parsersDictionary: { [key: string]: string };
    public parserStore: any;

    constructor(args: { parserDictionary: any, parserStore: IParserStore }) {
        this.parsersDictionary = args.parserDictionary;
        this.parserStore = args.parserStore;
    }

    delegate(args: { input: any, view: any, app?: any, module: IModule }) {
        const trimmedInput = this.parse(args.input);
        const newArgs = {
            ...args,
            input: trimmedInput
        }
        const key = args.module.status;
        const parserId = this.getParserId(key);
        const parser: IParser = this.parserStore.getParser(parserId);
        parser.parseTable.handle(newArgs);
    }

    getParserId(key: string): string {
        return this.parsersDictionary[key];
    }

    parse(input: string) {
        return input.trim();
    }
}