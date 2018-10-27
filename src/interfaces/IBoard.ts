import { IMove } from "./IMove";

export interface IBoard {
    height: number;
    width: number;
    moves: Array<IMove>;
    reset(): void;
    addMove(args: { playerId: string, position: string, mark: string }): void;
    getData(): string[];
    getPosition(position: number): string;
    isValidPosition(position: number): boolean;
    getValidPositions(): Array<number>;
    getTakenPositions(): number[];
    isPositionEmpty(position: number): boolean;
    getEmptyPositions(): Array<number>;
    getMarkPositions(mark: string): Array<number>;
    _boardMaxPosition(): number;
}