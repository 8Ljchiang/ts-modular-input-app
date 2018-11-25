import { IAction } from './IAction';
import { IView } from './IView';

export interface IDispatcher {
	view: IView;
	process(action: IAction): void;
	execute(action: IAction): void;
}