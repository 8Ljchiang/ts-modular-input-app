import { IModule } from "../interfaces/IModule";

export default class ParserDelegator {
    public parsersDictionary: { [key: string]: string };
    public parserStore: any;

    constructor(args: any) {
        this.parsersDictionary = args.parsersDictionary;
        this.parserStore = args.parserStore;
    }

    delegate(args: {key: any, input: any, view: any}, module: IModule) {
        const trimmedInput = this.parse(args.input);
        const newArgs = {
            ...args,
            input: trimmedInput
        }
        const parserId = this.parsersDictionary[args.key];
        const parser = this.parserStore.getParser(parserId);
        parser.parse(newArgs, module);
    }

    parse(input: string) {
        return input.trim();
    }
}