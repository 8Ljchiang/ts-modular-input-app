import { IPlayer } from '../interfaces/IPlayer';

export default class Player implements IPlayer {
    public id: string;
    public name: string;
    public mark: string;

    constructor(args: {id: string, name: string, mark: string }) {
        this.id = args.id;
        this.name = args.name;
        this.mark = args.mark;
    }
}