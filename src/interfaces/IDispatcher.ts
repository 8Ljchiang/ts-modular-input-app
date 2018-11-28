import { IAction } from './IAction';
import { IView } from './IView';
import { IPlayerStore } from './IPlayerStore';
import { IModuleStore } from './IModuleStore';
import { IPlayer } from './IPlayer';

export interface IDispatcher {
	view: IView;
	playerStore: IPlayerStore;
	moduleStore: IModuleStore;
	process(action: IAction): void;
	execute(action: IAction): void;
	// getPlayer(playerId: string): IPlayer | null;
	// updateModule(moduleId: string, updateObject: { [key: string]: any }): void;
	// updateModuleData(moduleId: string, updateObject: { [key: string]: any }): void;
	// updateModuleDataMove(moduleId: string, moveArgs: { [key: string]: any }): void;
	// resetModuleData(moduleId: string): void;
}