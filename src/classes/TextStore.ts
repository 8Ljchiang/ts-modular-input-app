import { ITextStore } from "../interfaces/ITextStore";
import { ICollection } from "../interfaces/ICollection";
import { IModuleText } from "../interfaces/IModuleText";

export default class TextStore implements ITextStore {
	public collection: ICollection<IModuleText>;

	constructor(collection: ICollection<IModuleText>) {
		this.collection = collection || {};
	}

	get(id: string): IModuleText | null {
		const result = this.collection[id]
		if (result) {
			return Object.assign({}, result);
		}
		return null;
	}
	add(object: IModuleText): IModuleText | null {
		const id = object.id;
		this.collection[id] = object;
		return this.collection[id];
	}
	remove(id: string): IModuleText | null {
		const result = this.collection[id]
		if (result) {
			delete this.collection[id];
			return result;
		}
		return null;
	}
	update(id: string, object: IModuleText): IModuleText | null {
		const result = this.collection[id];
		if (result) {
			this.collection[id] = object;
			return result;
		}
		return null;
	}
}