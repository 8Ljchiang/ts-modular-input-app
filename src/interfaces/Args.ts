import { IDispatcher } from "./IDispatcher";
import { IModule } from "./IModule";
import { IView } from "./IView";
import { IPlayerStore } from "./IPlayerStore";

export interface IParseArgs {
	dispatcher: any;
	moduleId: string;
	input: string;
}

export interface IParseTableArgs {
	dispatcher: IDispatcher;
	moduleId: string;
	input: string;
	module: IModule;
}

export interface IRenderArgs {
	module: IModule;
	view: IView;
	playerStore: IPlayerStore;
	moduleText: { [key: string]: string };
}

export interface IModuleArgs {
	id: string;
    name: string;
    status: string;
    moduleRenderer: string;
    parserDelegator: string;
    moduleText: string;
    moduleData: { [key: string]: any };
}

