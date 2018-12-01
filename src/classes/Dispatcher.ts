import { renderModuleAction } from "../helpers/ActionBuilders";
import { IAction } from "../interfaces/IAction";
import { IDelegatorStore } from "../interfaces/IDelegatorStore";
import { IDispatcher } from "../interfaces/IDispatcher";
import { IModuleStore } from "../interfaces/IModuleStore";
import { IParserStore } from "../interfaces/IParserStore";
import { IPlayerStore } from "../interfaces/IPlayerStore";
import { ITextStore } from '../interfaces/ITextStore';
import { IRendererStore } from "../interfaces/IRendererStore";
import { IView } from "../interfaces/IView";

export default class Dispatcher implements IDispatcher {
	public view: IView;
	public delegatorStore: IDelegatorStore;
	public moduleStore: IModuleStore;
	public playerStore: IPlayerStore;
	public rendererStore: IRendererStore;
	public textStore: ITextStore;
	public parserStore: IParserStore;
	public preProcessing: Array<{ fn: Function; next: boolean }>;
	public postProcessing: Array<{ fn: Function; next: boolean }>;
	public otherProcessing: { [key: string]: Array<any> };
	public executionTable: { [key: string]: Function };

	constructor(args: { view: IView, parserStore: IParserStore, delegatorStore: IDelegatorStore, textStore: ITextStore, moduleStore: IModuleStore, rendererStore: IRendererStore, playerStore: IPlayerStore, executionTable: any, pre: any, post: any, otherProcessing: any }) {
		this.view = args.view;
		this.delegatorStore = args.delegatorStore;
		this.parserStore = args.parserStore;
		this.moduleStore = args.moduleStore;
		this.playerStore = args.playerStore;
		this.rendererStore = args.rendererStore;
		this.textStore = args.textStore
		this.preProcessing = args.pre;
		this.postProcessing = args.post;
		this.executionTable = args.executionTable;
		this.otherProcessing = args.otherProcessing;
	}

	public process(action: IAction): void {
		this._preProcess(action);
		this.execute(action);
		this._postProcess(action);
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

		const renderAction = renderModuleAction(action.refData.moduleId);
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

	public execute(action: IAction): void {
		const { type, payload, refData } = action;
		
		const module = this.moduleStore.getModule(refData.moduleId);
		
		// console.log(module);

		// action.refData.module = module;
		// action.refData.module = Object.assign( Object.create( Object.getPrototypeOf(module)), module)

		// const clone = Object.assign( {}, module );
		// Object.setPrototypeOf( clone, Module.prototype );

		action.refData.module = Object.assign( Object.create( Object.getPrototypeOf(module)), module)

		if (type && payload && refData.moduleId && this._containsExecutionType(type)) {
			const fn = this.executionTable[type];
			fn(action, this);
		} else {
			this.view.show("Unknown action has been called.");
		}
	}

	private _containsExecutionType(type: string) {
		if (Object.keys(this.executionTable).indexOf(type) === -1) {
			return false;
		}
		return true;
	}
}

