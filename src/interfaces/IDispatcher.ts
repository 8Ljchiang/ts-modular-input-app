import { IAction } from './IAction';
import { IView } from './IView';

export interface IDispatcher {
	view: IView;
	process(action: IAction): void;
	execute(action: IAction): void;
	queueAction(action: IAction): void;
	queueActions(actions: Array<IAction>): void;
	processQueue(): void;
	executeQueue(): void;
}