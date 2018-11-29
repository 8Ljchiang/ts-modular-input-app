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
import { STATUS_NEW } from './lib/constants';
import RendererStore from './classes/RendererStore';
import TextStore from './classes/TextStore';
// import { IMove } from './interfaces/IMove';

const parserStore = new ParserStore({ parserCollection: {} });
populateParserStore(parserStore);

const P1_id = 'p1';
const P2_id = 'p2';
const playerStore = new PlayerStore({});
populatePlayerStore(playerStore);

const delegatorArgs = { parserDictionary: t3ParserDictionary, parserStore }
const parserDelegator = new ParserDelegator(delegatorArgs);

const moduleRendererArgs = { id: "mr-1", renderTable: t3RenderTable }
const moduleRenderer = new ModuleRenderer(moduleRendererArgs);

const rendererStore = new RendererStore({});
rendererStore.add(moduleRenderer);

const textStore = new TextStore({});
textStore.add(t3Messages);

const t3ModuleArgs = {
    id: "m-t3",
    name: "Tic Tac Toe",
    status: STATUS_NEW,
    moduleRenderer: "mr-1",
    parserDelegator,
    moduleData: {
        players: [P1_id, P2_id],
        board: new Board({ height: 3, width: 3, moves: [] }),
        activePlayerIndex: 0,
        messages: "t-t3-module-1"
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
    textStore,
    executionTable,
    rendererStore,
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

const appT3 = new App(appArgs);

appT3.run();

function populatePlayerStore(playerStore: IPlayerStore): void {
    const DEFAULT_P1 = 'Player1';
    const DEFAULT_P2 = 'Player2';
    const MARK_1 = 'X';
    const MARK_2 = 'O';
    const player1 = new Player({ id: P1_id, name: DEFAULT_P1, mark: MARK_1 });
    const player2 = new Player({ id: P2_id, name: DEFAULT_P2, mark: MARK_2 });
    playerStore.add(player1);
    playerStore.add(player2);
}

function populateParserStore(parserStore: IParserStore): void {
    parserStore.addParser(t3NewParser);
    parserStore.addParser(t3StartParser);
    parserStore.addParser(t3EndParser);
}

// TODO: Create containers.