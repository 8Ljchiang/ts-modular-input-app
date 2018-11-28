import { ICollection } from '../interfaces/ICollection';
import { IPlayer } from '../interfaces/IPlayer';
import { IPlayerStore } from '../interfaces/IPlayerStore';

export default class PlayerStore implements IPlayerStore {
	public collection: ICollection<IPlayer>
	
	constructor(args: { collection?: ICollection<IPlayer> }) {
		this.collection = args.collection || {};
	}
	get(id: string): IPlayer | null {
		const result = this.collection[id]
		if (result) {
			return result;
		}
		return null;
	}
	add(object: IPlayer): IPlayer  | null {
		const id = object.id;
		this.collection[id] = object;
		return this.collection[id];
	}
	remove(id: string): IPlayer | null {
		const result = this.collection[id]
		if (result) {
			delete this.collection[id];
			return result;
		}
		return null;
	}
	update(id: string, object: IPlayer): IPlayer | null {
		const result = this.collection[id];
		if (result) {
			this.collection[id] = object;
			return result;
		}
		return null;
	}
}
