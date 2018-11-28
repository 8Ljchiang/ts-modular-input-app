import { ICollection } from './ICollection';

export type ICollection<T> = {
	[id: string]: T;
}