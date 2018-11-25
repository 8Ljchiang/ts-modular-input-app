import { IDispatcher } from "./IDispatcher";
import { IModule } from "./IModule";
import { IView } from "./IView";

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
}