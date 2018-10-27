export interface IModule {
    id: string;
    name: string;
    parserDelegator: any;
    moduleData: any;
    moduleRenderer: any;
    status: string;
    handleInput(args: {input: string, view: any}): void;
    setStatus(status: string): void;
    getStatus(): string;
}