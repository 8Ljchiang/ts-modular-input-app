import { IMove } from "../interfaces/IMove";
import { IBoard } from "../interfaces/IBoard";
import { DEFAULT_BOARD_HEIGHT, DEFAULT_BOARD_WIDTH, OPEN_SPACE } from "../lib/constants";

export default class Board implements IBoard {
    public height: number;
    public width: number;
    public moves: Array<IMove>;

    constructor(args: {height: number, width: number, moves: Array<IMove>}) {
        this.height = args.height || DEFAULT_BOARD_HEIGHT;
        this.width = args.width || DEFAULT_BOARD_WIDTH;
        this.moves = args.moves || [];
    }

    reset() {
        this.moves = new Array();
    }
    
    addMove(args: { playerId: string, position: string, mark: string }) {
        if (this.isValidPosition(parseInt(args.position)) && this.isPositionEmpty(parseInt(args.position))) {
            const move = { ...args, date: Date.now() };
            this.moves.push(move);
        }
    }

    getData() {
        const data = new Array(this._boardMaxPosition());
        for (let move of this.moves) {
            const index = parseInt(move.position) - 1;
            data[index] = move.mark;
        }
        return data;
    }

    getPosition(position: number): string {
        let mark = OPEN_SPACE;
        for (let move of this.moves) {
            if (parseInt(move.position) == position) {
                let mark = move.mark;
            }
        }
        return mark;
    }

    isValidPosition(position: number): boolean {
        return position > 0 && position <= (this.height * this.width);
    }

    getValidPositions(): number[] {
        const validPositions: number[] = [];
        for (let i = 1; i <= this._boardMaxPosition(); i++) {
            validPositions.push(i);
        }
        return validPositions;
    }

    getTakenPositions(): number[] {
        return this.moves.map((move: IMove) => {
            return parseInt(move.position);
        });
    }

    isPositionEmpty(position: number): boolean {
        for (let move of this.moves) {
            if (parseInt(move.position) === position) {
                return false;
            }
        }
        return true;
    }

    getEmptyPositions(): number[] {
        const emptyPositions: number[] = [];
        const takenPositions = this.getTakenPositions();
        for (let i = 1; i <= this._boardMaxPosition(); i++) {
            if (!takenPositions.includes(i)) {
                emptyPositions.push(i);
            }
        }
        return emptyPositions; 
    }

    getMarkPositions(mark: string): number[] {
        const markPositions = [];
        for (let move of this.moves) {
            if (move.mark === mark) {
                const position = parseInt(move.position);
                markPositions.push(position);
            }
        }
        return markPositions;
    }

    _boardMaxPosition(): number {
        return this.height * this.width;
    }
}