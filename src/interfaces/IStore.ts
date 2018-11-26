import { ICollection } from './ICollection';

export interface IStore<T> {
	collection: ICollection<T>;
	get(id: string): T | null;
	add(object: T): T;
	remove(objectId: string): T | null;
}