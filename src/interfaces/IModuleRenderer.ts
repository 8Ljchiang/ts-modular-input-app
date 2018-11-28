import { IModule } from "./IModule";
import { IRenderArgs } from "./Args";

export interface IModuleRenderer {
    id: string;
    render(args: IRenderArgs): void;
    containsModuleStatus(module: IModule): void;
}