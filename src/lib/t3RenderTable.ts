import {IView} from '../interfaces/IView';
import {IMove} from '../interfaces/IMove';
import {IBoard} from '../interfaces/IBoard';
import {IModule} from '../interfaces/IModule';
import {IRenderTable } from '../interfaces/IRenderTable';
import {STATUS_DEFAULT, STATUS_END, STATUS_NEW, STATUS_START } from '../lib/constants';

const POSITION_OFFSET = 1;

export const t3RenderTable: IRenderTable = {
    [STATUS_DEFAULT]: function(args: { module: IModule, view: IView }) {
        const { welcome } = args.module.moduleData.messages;
        return welcome;
    },
    [STATUS_NEW]: function(args: { module: IModule, view: IView }) {
        const { welcome } = args.module.moduleData.messages;
        return welcome;
    },
    [STATUS_START]: function(args: { module: IModule, view: IView }) {
        const boardString = renderBoard(args.module.moduleData.board);
        const { started } = args.module.moduleData.messages;
        return boardString + "\n" + started;
    },
    [STATUS_END]: function(args: { module: IModule, view: IView }) {
        const boardString = renderBoard(args.module.moduleData.board);
        const { end } = args.module.moduleData.messages;
        return boardString + "\n" + end;
    }
}

function renderBoard(board: IBoard): string {
    const preResultStorage = [];
    let lineStorage = [];
    const data = board.getData();

    for (let i = 0; i < data.length; i++) {
        const position = _adjustIndexToPosition(i);
        if ((position%board.width) === 0) {
            // let fillString = _makeSpaceBuffer(4) + board.getPosition(position) + _makeSpaceBuffer(4);
            let fillString = _makeSpaceBuffer(4) + data[i] + _makeSpaceBuffer(4);
            lineStorage.push(fillString + "\n");
            preResultStorage.push(_createManyNonlineRows(board, 1) + lineStorage.join("|") + _createManyNonlineRows(board, 1));
            lineStorage = []
        } else {
            let fillString = _makeSpaceBuffer(4) + board.getPosition(position) + _makeSpaceBuffer(4);
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

// function renderBoard(module: IModule): string {
//     const { boardWidth, boardHeight, moves } = module.moduleData;
//     const preResultStorage = [];
//     let lineStorage = [];

//     for (let i = 0; i < (boardWidth * boardHeight); i++) {
//         const position = this._adjustIndexToPosition(i);

//         const markerValue = moves.filter((move) => {
//             return move.position === position;
//         });

//         if ((position%boardWidth) === 0) {
//             let fillString = this._makeSpaceBuffer(4) + board.getPosition(position) + this._makeSpaceBuffer(4);
//             lineStorage.push(fillString + "\n");
//             preResultStorage.push(this._createManyNonlineRows(board, 1) + lineStorage.join("|") + this._createManyNonlineRows(board, 1));
//             lineStorage = []
//         } else {
//             let fillString = this._makeSpaceBuffer(4) + board.getPosition(position) + this._makeSpaceBuffer(4);
//             lineStorage.push(fillString);
//         }
//     } 
//     return preResultStorage.join(this._createLineRow(boardWidth));
// }
// function _makeSpaceBuffer(count: number): string {
//     let buffer = "";
//     for (let i = 0; i < count; i++) {
//         buffer += " "
//     }
//     return buffer;
// }
// function _createNonlineRow(width: number): string {
//     let rowLine = "";
//     for (let i = 0; i < width; i++) {
//         if (i < width - 1) {
//             rowLine += this._makeSpaceBuffer(9) + "|"
//         } else {
//             rowLine += this._makeSpaceBuffer(9) + "\n"
//         }
//     }
//     return rowLine;
// }
// function _createManyNonlineRows(width: number, count: number): string {
//     let fill = "";
//     for (let i = 0; i < count; i++) {
//         fill += this._createNonlineRow(width);
//     }
//     return fill;
// }
// function _createLineRow(width: number): string {
//     const rowLength = (width * 9) + width - 1
//     let rowLine = "";
//     for (let i = 0; i < rowLength; i++) {
//         if (i < rowLength - 1) {
//             rowLine += "-";
//         } else {
//             rowLine += "-\n";
//         }
//     }
//     return rowLine;
// }
// function _adjustIndexToPosition(index: number): number {
//     return index + POSITION_OFFSET;
// }
// function _adjustPositionToIndex(position: number): number {
//     return position - POSITION_OFFSET;
// }


// switch(args.module.status) {
//     // const { module, view } = args;
//     case STATUS_DEFAULT:
//     args.view.show(args.module.moduleData.messages.welcome);
//     break;
//     case STATUS_NEW:
//     args.view.show(args.module.moduleData.messages.welcome);
//     break;
//     case STATUS_START:
//     args.view.show(args.module.moduleData.messages.welcome);
//     default:
// }