import { IAction } from './IAction';
import { IView } from './IView';
import { IPlayerStore } from './IPlayerStore';
import { IModuleStore } from './IModuleStore';
import { IRendererStore } from './IRendererStore';
import { ITextStore } from './ITextStore';

export interface IDispatcher {
	view: IView;
	playerStore: IPlayerStore;
	moduleStore: IModuleStore;
	textStore: ITextStore;
	rendererStore: IRendererStore;
	process(action: IAction): void;
	execute(action: IAction): void;
	// getPlayer(playerId: string): IPlayer | null;
	// updateModule(moduleId: string, updateObject: { [key: string]: any }): void;
	// updateModuleData(moduleId: string, updateObject: { [key: string]: any }): void;
	// updateModuleDataMove(moduleId: string, moveArgs: { [key: string]: any }): void;
	// resetModuleData(moduleId: string): void;
}