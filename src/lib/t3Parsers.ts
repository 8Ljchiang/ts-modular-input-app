import ParseTable from '../classes/ParseTable';
import { IParser } from "../interfaces/IParser";
import { newGameHandlers, startedGameHandlers, endGameHandlers } from './t3ParseTables';

const newParser = new ParseTable({ handlers: newGameHandlers });
const startParser = new ParseTable({ handlers: startedGameHandlers });
const endParser = new ParseTable({ handlers: endGameHandlers });

export const t3NewParser: IParser = {
    id: "t3NewParser",
    parseTable: newParser,
}

export const t3StartParser: IParser = {
    id: "t3StartParser",
    parseTable: startParser,
}

export const t3EndParser: IParser = {
    id: "t3EndParser",
    parseTable: endParser
}
