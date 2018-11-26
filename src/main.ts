import readline from 'readline';
import App from './classes/App';
import Board from './classes/Board';
import Player from './classes/Player';

import View from "./classes/View";
import Dispatcher from './classes/Dispatcher';
import { executionTable } from './lib/executionTable';

import ParserStore from './classes/ParserStore';
import ParserDelegator from './classes/ParserDelegator';

import Module from './classes/Module';
import ModuleStore from './classes/ModuleStore';
import ModuleRenderer from './classes/ModuleRenderer';

import { t3ParserDictionary } from './lib/t3ParserDictionary'
import { t3NewParser, t3EndParser, t3StartParser } from './lib/t3Parsers';
import { t3RenderTable } from './lib/t3RenderTable';
import { t3Messages } from './lib/t3Messages';

import ContextStore from './classes/ContextStore';
import { t3ContextCollection } from './lib/t3ContextCollection';
import PlayerStore from './classes/PlayerStore';
import { IPlayerStore } from './interfaces/IPlayerStore';
import { IParserStore } from './interfaces/IParserStore';
// import { IMove } from './interfaces/IMove';

const parserStore = new ParserStore({ parserCollection: {} });
populateParserStore(parserStore);

const P1_id = 'p1';
const P2_id = 'p2';
const playerStore = new PlayerStore({});
populatePlayerStore(playerStore);

const pDelArgs = { parserDictionary: t3ParserDictionary, parserStore }
const parserDelegator = new ParserDelegator(pDelArgs);

const mRendArgs = { renderTable: t3RenderTable }
const moduleRenderer = new ModuleRenderer(mRendArgs);

const t3ModuleArgs = {
    id: "m-t3",
    name: "Tic Tac Toe",
    status: "NEW",
    moduleRenderer,
    parserDelegator,
    moduleData: {
        players: [P1_id, P2_id],
        board: new Board({ height: 3, width: 3, moves: [] }),
        activePlayerIndex: 0,
        messages: t3Messages
    },
}

const t3Module = new Module(t3ModuleArgs);
const moduleStore = new ModuleStore({})
moduleStore.addModule(t3Module);

const contextStore = new ContextStore({ contextCollection: t3ContextCollection });

const inputInterface = readline.createInterface(process.stdin, process.stdout);

const viewArgs = { 
    inputInterface, 
    outputInterface: console 
};
const view = new View(viewArgs);

const dispatcherArgs = { 
    view, 
    playerStore,
    moduleStore, 
    executionTable, 
    pre: [], 
    post: [], 
    otherProcessing: {} 
};
const dispatcher = new Dispatcher(dispatcherArgs);

const appArgs = { 
    dispatcher, 
    contextStore, 
    currentContextReference: "c1" 
};

// const m = moduleStore.getModule(t3Module.id);
// m.handleInput({
//     dispatcher,
//     moduleId: t3Module.id,
//     input: "ready",
// });

const appT3 = new App(appArgs);

appT3.run();

function populatePlayerStore(playerStore: IPlayerStore): void {
    const player1 = new Player({ id: P1_id, name: "Sam", mark: "X" });
    const player2 = new Player({ id: P2_id, name: "Dan", mark: "O" });
    playerStore.add(player1);
    playerStore.add(player2);
}

function populateParserStore(parserStore: IParserStore): void {
    parserStore.addParser(t3NewParser);
    parserStore.addParser(t3StartParser);
    parserStore.addParser(t3EndParser);
}
// TODO: Create containers.