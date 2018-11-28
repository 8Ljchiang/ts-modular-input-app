import {IBoard} from '../interfaces/IBoard';
import {IRenderTable } from '../interfaces/IRenderTable';
import {STATUS_DEFAULT, STATUS_END, STATUS_NEW, STATUS_START } from '../lib/constants';
import { IRenderArgs } from '../interfaces/Args';

const POSITION_OFFSET = 1;

export const t3RenderTable: IRenderTable = {
    [STATUS_DEFAULT]: function(args: IRenderArgs) {
        const { welcome } = args.module.moduleData.messages;
        return welcome;
    },
    [STATUS_NEW]: function(args: IRenderArgs) {
        const { welcome } = args.module.moduleData.messages;
        return welcome;
    },
    [STATUS_START]: function(args: IRenderArgs) {
        const { players, activePlayerIndex } = args.module.moduleData;
        const playerId = players[activePlayerIndex];
        const player = args.playerStore.get(playerId);
        const playerName = player ? player.name : 'Unknown';
        const boardString = renderBoard(args.module.moduleData.board);
        const { started } = args.module.moduleData.messages;
        return "Tic Tac Toe\n\n" + boardString + "\n" + started.replace(new RegExp('{{PLAYER_NAME}}', 'g'), playerName);
    },
    [STATUS_END]: function(args: IRenderArgs) {
        const boardString = renderBoard(args.module.moduleData.board);
        const { end } = args.module.moduleData.messages;
        return "Tic Tac Toe\n\n" + boardString + "\n" + end;
    }
}

function renderBoard(board: IBoard): string {
    const preResultStorage = [];
    let lineStorage = [];
    const data = board.getData();

    for (let i = 0; i < data.length; i++) {
        const position = _adjustIndexToPosition(i);

        if ((position%board.width) === 0) {
            let fillString = _makeSpaceBuffer(4) + data[i] + _makeSpaceBuffer(4);
            lineStorage.push(fillString + "\n");
            preResultStorage.push(_createManyNonlineRows(board, 1) + lineStorage.join("|") + _createManyNonlineRows(board, 1));
            lineStorage = []
        } else {
            let fillString = _makeSpaceBuffer(4) + data[i] + _makeSpaceBuffer(4);
            lineStorage.push(fillString);
        }
    } 
    return preResultStorage.join(_createLineRow(board));
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
    const rowLength = (board.width * 9) + board.width - 1
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
