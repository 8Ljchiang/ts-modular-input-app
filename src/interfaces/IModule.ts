export interface IModule {
    id: string;
    name: string;
    status: string;
    parserDelegator: string;
    moduleRenderer: string;
    moduleText: string;
    moduleData: { [key: string]: any };
    setStatus(status: string): void;
    getStatus(): string;
}