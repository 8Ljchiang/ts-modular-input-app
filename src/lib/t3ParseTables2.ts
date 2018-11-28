import { STATUS_START } from "./constants";
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
		const options = this.options({});
		const action = showOptions(options, args.moduleId);
		args.dispatcher.process(action);
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
    },
    options: function(args: any) { 
        return args.dispatcher.moduleStore.getModule(args.moduleId).moduleData.board.getEmptyPositions().map((p: any) => p.toString());
    }
}

export const endGameHandlers = {
    new: function(args: IParseArgs) {
		const action = t3NewGame(args.moduleId);
        args.dispatcher.process(action);
    },
    quit: function(args: any) {
		args.dispatcher.process({});
    },
    default: function(args: any) {
		args.dispatcher.process({});
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
