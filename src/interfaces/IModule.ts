import { IParseArgs } from './Args';

export interface IModule {
    id: string;
    name: string;
    parserDelegator: any;
    moduleData: any;
    moduleRenderer: any;
    status: string;
    handleInput(args: IParseArgs): void;
    setStatus(status: string): void;
    getStatus(): string;
}