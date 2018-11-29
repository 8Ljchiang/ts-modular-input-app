import {IBoard} from '../interfaces/IBoard';
import {IRenderTable } from '../interfaces/IRenderTable';
import {STATUS_DEFAULT, STATUS_END, STATUS_NEW, STATUS_START, STATUS_DRAW, STATUS_WINNER } from '../lib/constants';
import { IRenderArgs } from '../interfaces/Args';
import { t3WinPatterns3 } from '../lib/t3Patterns';
import { findPattern } from '../helpers/patternCheckHelpers';
import { colors, styles } from './colors';

const POSITION_OFFSET = 1;
const DEFAULT_CELL_WIDTH = 9;

export const t3RenderTable: IRenderTable = {
    [STATUS_DEFAULT]: function(args: IRenderArgs): string {
        const { welcome } = args.moduleText;
        return welcome;
    },
    [STATUS_NEW]: function(args: IRenderArgs): string {
        const { welcome } = args.moduleText;
        return welcome;
    },
    [STATUS_START]: function(args: IRenderArgs): string {
        const { players, activePlayerIndex, board } = args.module.moduleData;
        const playerId = players[activePlayerIndex];
        const player = args.playerStore.get(playerId);
        const playerName = player ? player.name : 'Unknown';
        const boardString = renderBoard(board, board.getData());
        const { started } = args.moduleText;
        return args.module.name + "\n\n" + boardString + "\n" + started.replace(new RegExp('{{PLAYER_NAME}}', 'g'), playerName);
    },
    [STATUS_END]: function(args: IRenderArgs): string {
        const { board } = args.module.moduleData;
        const boardString = renderBoard(board, board.getData());
        const { end } = args.moduleText;
        return args.module.name + "\n\n" + boardString + "\n" + end;
    },
    [STATUS_WINNER]: function(args: IRenderArgs): string {
        const { board, activePlayerIndex, players } = args.module.moduleData;
        const playerId = players[activePlayerIndex];
        const currentPlayer = args.playerStore.get(playerId);
        const playerName = currentPlayer ? currentPlayer.name : "Unknown";
        const playerMark = currentPlayer ? currentPlayer.mark : "Unknown";
        const { winner, end } = args.moduleText;
        
        const winningPattern = findPattern(board.getMarkPositions(playerMark), t3WinPatterns3) || [];
        const highlightColor = colors.yellow;
        const boardString = renderBoard(board, addHighlightsToPositions(board.getData(), winningPattern, highlightColor));

        return args.module.name + "\n\n" + boardString + "\n" + winner.replace("{{PLAYER_NAME}}", playerName).replace("{{PLAYER_MARK}}", playerMark).replace("{{PATTERN}}", winningPattern.join(", ")) + "\n" + end;
    },
    [STATUS_DRAW]: function(args: IRenderArgs): string {
        const { board } = args.module.moduleData;
        const boardString = renderBoard(board, board.getData());
        const { draw, end } = args.moduleText;
        return args.module.name + "\n\n" + boardString + "\n" + draw + "\n" + end;
    }
}

function addHighlightsToPositions(positionsData: string[], highlightPositions: number[], highlightColor: string): string[] {
    return positionsData.map((positionMark, index) => {
        if (highlightPositions.indexOf(_adjustIndexToPosition(index)) !== -1) {
            return highlightColor + styles.bold + positionMark + styles.unbold + colors.reset;
        }
        return positionMark;
    });
}

function renderBoard(board: IBoard, movesData: string[]): string {
    const boardRowsStorage = [];
    let lineStorage = [];
    const data = movesData.map((positionMarker: string, index: number) => {
        if (positionMarker === " ") {
            return colors.blue + _adjustIndexToPosition(index).toString() + colors.reset;
        }
        return positionMarker;
    });

    for (let i = 0; i < data.length; i++) {
        const position = _adjustIndexToPosition(i);

        if ((position%board.width) === 0) {
            lineStorage.push(createBoardLine(data[i]) + "\n");
            boardRowsStorage.push(createBoardRow(lineStorage, board));
            lineStorage = []
        } else {
            lineStorage.push(createBoardLine(data[i]));
        }
    }
    const horizontalDivider = makeHorizontalDivider(board);
    return boardRowsStorage.join(horizontalDivider);
}

function createBoardLine(marker: string): string {
    return _makeSpaceBuffer(4) + marker + _makeSpaceBuffer(4);
}

function createBoardRow(lines: string[], board: IBoard): string {
    return _createManyNonlineRows(board, 1) + lines.join("|") + _createManyNonlineRows(board, 1);
}

function makeHorizontalDivider(board: IBoard): string {
    return _createLineRow(board);
}


function _makeSpaceBuffer(count: number): string {
    let buffer = "";
    for (let i = 0; i < count; i++) {
        buffer += " "
    }
    return buffer;
}
function _createNonlineRow(board: IBoard): string {
    let rowLine = "";
    for (let i = 0; i < board.width; i++) {
        if (i < board.width - 1) {
            rowLine += _makeSpaceBuffer(9) + "|"
        } else {
            rowLine += _makeSpaceBuffer(9) + "\n"
        }
    }
    return rowLine;
}
function _createManyNonlineRows(board: IBoard, count: number): string {
    let fill = "";
    for (let i = 0; i < count; i++) {
        fill += _createNonlineRow(board);
    }
    return fill;
}
function _createLineRow(board: IBoard): string {
    const rowLength = (board.width * DEFAULT_CELL_WIDTH) + board.width - 1
    let rowLine = "";
    for (let i = 0; i < rowLength; i++) {
        if (i < rowLength - 1) {
            rowLine += "-";
        } else {
            rowLine += "-\n";
        }
    }
    return rowLine;
}
function _adjustIndexToPosition(index: number): number {
    return index + POSITION_OFFSET;
}
function _adjustPositionToIndex(position: number): number {
    return position - POSITION_OFFSET;
}
