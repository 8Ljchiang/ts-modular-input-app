import readline from 'readline';
import App from './classes/App';
import Board from './classes/Board';
import Player from './classes/Player';

import ParserStore from './classes/ParserStore';
import ParserDelegator from './classes/ParserDelegator';

import Module from './classes/Module';
import ModuleStore from './classes/ModuleStore';
import ModuleRenderer from './classes/ModuleRenderer';

import { t3ParserDictionary } from './lib/t3ParserDictionary'
import { t3NewParser, t3EndParser, t3StartParser } from './lib/t3Parsers';
import { t3RenderTable } from './lib/t3RenderTable';

import ContextStore from './classes/ContextStore';
import { t3ContextCollection } from './lib/t3ContextCollection';
// import { IMove } from './interfaces/IMove';

const parserStore = new ParserStore({ parserCollection: {} });
parserStore.addParser(t3NewParser);
parserStore.addParser(t3StartParser);
parserStore.addParser(t3EndParser);

const pDelArgs = { parserDictionary: t3ParserDictionary, parserStore }
const parserDelegator = new ParserDelegator(pDelArgs);

const mRendArgs = { renderTable: t3RenderTable }
const moduleRenderer = new ModuleRenderer(mRendArgs);

const player1 = new Player({ id: "p1", name: "Sam", mark: "X" });
const player2 = new Player({ id: "p2", name: "Dan", mark: "O" });
const t3ModuleArgs = {
    id: "m-t3",
    name: "Tic Tac Toe",
    status: "NEW",
    moduleRenderer,
    parserDelegator,
    moduleData: {
        players: [player1, player2],
        board: new Board({ height: 3, width: 3, moves: [] }),
        activePlayerIndex: 0,
    },
}
const t3Module = new Module(t3ModuleArgs);
const moduleStore = new ModuleStore({})
moduleStore.addModule(t3Module);

const contextStore = new ContextStore({ contextCollection: t3ContextCollection });

const inputHandler = readline.createInterface(process.stdin, process.stdout);
const appArgs = { inputHandler, moduleStore, contextStore, currentContextReference: "c1",  };
const appT3 = new App(appArgs);



// TODO: Create containers.