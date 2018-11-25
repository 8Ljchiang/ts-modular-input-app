import { IDispatcher } from "../interfaces/IDispatcher";
import { IView } from "../interfaces/IView";
import { IAction } from "../interfaces/IAction";
import { IModuleStore } from "../interfaces/IModuleStore";
import { renderModule } from "../lib/ActionBuilders";
import { T3_MOVE } from "../lib/actionTypes";

export default class Dispatcher implements IDispatcher {
	public view: IView;
	public moduleStore: IModuleStore;
	public preProcessing: Array<{ fn: Function; next: boolean }>;
	public postProcessing: Array<{ fn: Function; next: boolean }>;
	public otherProcessing: { [key: string]: Array<any> };
	public executionTable: { [key: string]: Function };
	public actionQueue: Array<IAction>;

	constructor(args: { view: IView, moduleStore: IModuleStore, executionTable: any, pre: any, post: any, otherProcessing: any }) {
		this.view = args.view;
		this.moduleStore = args.moduleStore;
		this.preProcessing = args.pre;
		this.postProcessing = args.post;
		this.executionTable = args.executionTable;
		this.otherProcessing = args.otherProcessing;
		this.actionQueue = [];
	}

	public resetQueue(): void {
		this.actionQueue = [];
	}

	public queueAction(action: IAction): void {
		this.actionQueue.push(action);	
	}

	public queueActions(actions: Array<IAction>): void {
		actions.forEach((action) => this.actionQueue.push(action));
	}

	public executeQueue() {
		while (this.actionQueue.length > 0) {
			const action = this.actionQueue.shift();
			if (action) {
				this.execute(action);
			}
		}
		this.resetQueue();
	}

	public processQueue() {
		let lastAction = this.actionQueue[this.actionQueue.length - 1];
		this._preProcess(this.actionQueue[0]);

		while (this.actionQueue.length > 0) {
			const action = this.actionQueue.shift();
			if (action) {
				lastAction = this.execute(action);	
			}
		}

		this._postProcess(lastAction);
		// this._postProcess(this.actionQueue[this.actionQueue.length-1]);

		this.resetQueue();
	}

	public process(action: IAction): void {
		this._preProcess(action);
		const postAction = this.execute(action);
		this._postProcess(postAction);
	}

	public addPreProcess(process: any): void {
		this.preProcessing.push(process);	
	}

	public addPostProcess(process: any): void {
		this.postProcessing.push(process);
	}

	public addSpecifiedProcess(actionType: string, fn: Function): void {
		const processes = this.otherProcessing[actionType];
		if (processes && Array.isArray(processes)) {
			this.otherProcessing[actionType].push({ fn, next: true });
		} else {
			this.otherProcessing[actionType] = [{ fn, next: true }];
		}
	}

	private _preAction(action: IAction): IAction {
		const { refData } = action;
		
		const module = this.moduleStore.getModule(refData.moduleId);
		action.refData.module = module;

		return action;
	}

	private _postAction(action: IAction): IAction {
		return action;
	}

	
	private _preProcess(action: IAction): void {
		
		this.view.clear();
		// Future Dev:

		// const processes = this.preProcessing;
		// for (let i = 0; i < processes.length; i++) {
			
		// 	const process = processes[i];
		// 	process.fn(action);
			
		// 	if (!process.next) {
		// 		break;
		// 	} 
		// }
	}

	private _postProcess(action: IAction): void {
		// This is kind of like middleware.

		const renderAction = renderModule(action.refData.moduleId);
		this.execute(renderAction);

		// Future Dev:
		// const processes = this.postProcessing;
		// for (let i = 0; i < processes.length; i++) {
			
		// 	const process = processes[i];
		// 	process.fn(data);
			
		// 	if (!process.next) {
		// 		break;
		// 	} 
		// }
	}

	public execute(action: IAction) {
		
		const updatedAction = this._preAction(action);
		
		const { type, payload, refData } = updatedAction;
		if (type && payload && refData.moduleId && this._containsExecutionType(type)) {
			const fn = this.executionTable[type];
			fn(action, this);
		} else {
			this.view.show("Unknown action has been called.");
		}

		return this._postAction(updatedAction);
	}

	private _containsExecutionType(type: string) {
		if (Object.keys(this.executionTable).indexOf(type) === -1) {
			return false;
		}
		return true;
	}
}

