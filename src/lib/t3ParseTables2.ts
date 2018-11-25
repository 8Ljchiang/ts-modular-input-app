
import { STATUS_START, STATUS_NEW, STATUS_END } from "./constants";
import { IModule } from "../interfaces/IModule";
import { IParseArgs } from '../interfaces/Args';
import { addMove, setStatus, showOptions, showT3OpenMoves, t3NewGame } from './actionBuilders';

export const newGameHandlers = {
    ready: function(args: IParseArgs) {
        const action = setStatus(STATUS_START, args.moduleId);
        args.dispatcher.process(action);
    },
    default: function(args: IParseArgs) {
        args.dispatcher.process({});
    },
    error: function(args: IParseArgs) {
        // console.log('error: rendering options');
		const options = this.options({});
		const action = showOptions(options, args.moduleId);
		args.dispatcher.process(action);
        // args.view.show("Input not recognized as a valid option.");
        // args.view.show("Options: " + this.options(args).join(", "));
    },
    options: function(args: any) { 
        return ["ready"]
    }
}

export const startedGameHandlers = {
    default: function(args: IParseArgs) {
		const action = addMove(args.input, args.moduleId);
		args.dispatcher.process(action);
    },
    error: function(args: IParseArgs) {
		const action = showT3OpenMoves(args.moduleId);
		args.dispatcher.process(action);
        // args.view.show("Input not recognized as a valid option.");
        // args.view.show("Options: " + this.options(args).join(", "));
    },
    options: function(args: any) { 
        return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((p) => p.toString());
        // const emptyPositions = args.module.moduleData.board.getEmptyPositions().map((position: number) => {
        //     return position.toString();
        // });
        // return emptyPositions; 
    }
}

export const endGameHandlers = {
    new: function(args: IParseArgs) {
		const action = t3NewGame(args.moduleId);
        args.dispatcher.process(action);
    },
    quit: function(args: any) {
		args.dispatcher.process({});
        // console.log("Quit handler has not been defined.");
        // process.exit(0);
    },
    default: function(args: any) {
		args.dispatcher.process({});
        // args.view.show("Default[end]: Has not been defined");
    },
    error: function(args: any) {
        const options = this.options({});
		const action = showOptions(options, args.moduleId);
		args.dispatcher.process(action);
    },
    options: function(args: any) { 
        return ["new", "quit"]
    }
}
