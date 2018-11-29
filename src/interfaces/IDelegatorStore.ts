import { IStore } from './IStore';

export interface IDelegator {
	id: string;
	[key: string]: string;
}

export interface IDelegatorStore extends IStore<IDelegator> {}