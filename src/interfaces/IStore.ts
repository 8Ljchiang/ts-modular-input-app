import { ICollection } from './ICollection';

export interface IStore<T> {
	collection: ICollection<T>;
	get(objectId: string): T | null;
	add(object: T): T | null;
	remove(objectId: string): T | null;
	update(objectId: string, object: T): T | null;
}