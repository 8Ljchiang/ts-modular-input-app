import { IRendererStore } from '../interfaces/IRendererStore';
import { IModuleRenderer } from '../interfaces/IModuleRenderer';

export default class RendererStore implements IRendererStore {
	public collection: any;
	
	constructor(collection: any) {
		this.collection = collection || {};
	}
	get(objectId: string): IModuleRenderer | null {
		throw new Error("Method not implemented.");
	}
	add(object: IModuleRenderer): IModuleRenderer | null {
		throw new Error("Method not implemented.");
	}
	remove(objectId: string): IModuleRenderer | null {
		throw new Error("Method not implemented.");
	}
	update(objectId: string, object: import("/Users/jchiang/Documents/CodeLearning/projects-other/inputApp/src/interfaces/IModuleRenderer").IModuleRenderer): import("/Users/jchiang/Documents/CodeLearning/projects-other/inputApp/src/interfaces/IModuleRenderer").IModuleRenderer | null {
		throw new Error("Method not implemented.");
	}
}