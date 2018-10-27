import readline from 'readline';
import App from './classes/App';
import ModuleStore from './classes/ModuleStore';
import Module from './classes/Module';
import ParserDelegator from './classes/ParserDelegator';
import ModuleRenderer from './classes/ModuleRenderer';

// import { IMove } from './interfaces/IMove';

const pDelArgs = {
    
}
const parserDelegator = new ParserDelegator(pDelArgs);

const mRendArgs = {

}

const moduleRenderer = new ModuleRenderer(mRendArgs);


const t3ModuleArgs = {
    id: "m-t3",
    name: "Tic Tac Toe",
    moduleData: {
        players: [],
        moves: [],

    }
}
const t3Module = new Module
const moduleStore = new ModuleStore()

const inputHandler = readline.createInterface(process.stdin, process.stdout);
const appArgs = { inputHandler };
const appT3 = new App(appArgs);

// TODO: Create containers.