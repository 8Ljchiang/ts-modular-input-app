import { IDelegator, IDelegatorStore } from '../interfaces/IDelegatorStore';
import { ICollection } from '../interfaces/ICollection';

export default class DelegatorStore implements IDelegatorStore {
	public collection: ICollection<IDelegator>;

	constructor(collection: ICollection<IDelegator>) {
		this.collection = collection;
	}
	get(id: string): IDelegator | null {
		const result = this.collection[id]
		if (result) {
			return Object.assign({}, result);
		}
		return null;
	}
	add(object: IDelegator): IDelegator | null {
		const id = object.id;
		this.collection[id] = object;
		return this.collection[id];
	}
	remove(id: string): IDelegator | null {
		const result = this.collection[id]
		if (result) {
			delete this.collection[id];
			return result;
		}
		return null;
	}
	update(id: string, object: IDelegator): IDelegator | null {
		const result = this.collection[id];
		if (result) {
			this.collection[id] = object;
			return result;
		}
		return null;
	}
}
