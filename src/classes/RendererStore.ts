import { IRendererStore } from '../interfaces/IRendererStore';
import { IModuleRenderer } from '../interfaces/IModuleRenderer';
import { ICollection } from '../interfaces/ICollection';

export default class RendererStore implements IRendererStore {
	public collection: any;
	
	constructor(collection: ICollection<IModuleRenderer>) {
		this.collection = collection || {};
	}
	get(id: string): IModuleRenderer | null {
		const result = this.collection[id]
		if (result) {
			return result;
		}
		return null;
	}
	add(object: IModuleRenderer): IModuleRenderer | null {
		const id = object.id;
		this.collection[id] = object;
		return this.collection[id];
	}
	remove(id: string): IModuleRenderer | null {
		const result = this.collection[id]
		if (result) {
			delete this.collection[id];
			return result;
		}
		return null;
	}
	update(id: string, object: IModuleRenderer): IModuleRenderer | null {
		const result = this.collection[id];
		if (result) {
			this.collection[id] = object;
			return result;
		}
		return null;
	}
}