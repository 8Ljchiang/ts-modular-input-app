import { STATUS_START } from "./constants";
import { IParseArgs } from '../interfaces/Args';
import { addMove, setStatus, showOptions, showT3OpenMoves, t3NewGame } from './actionBuilders';

export const newGameHandlers = {
    ready: function(args: IParseArgs) {
        const action = setStatus(STATUS_START, args.moduleId);
        args.dispatcher.queueAction(action);
    },
    default: function(args: IParseArgs) {
        args.dispatcher.queueAction({});
    },
    error: function(args: IParseArgs) {
		const options = this.options({});
		const action = showOptions(options, args.moduleId);
		args.dispatcher.queueAction(action);
    },
    options: function(args: any) { 
        return ["ready"]
    }
}

export const startedGameHandlers = {
    default: function(args: IParseArgs) {
		const action = addMove(args.input, args.moduleId);
		args.dispatcher.queueAction(action);
    },
    error: function(args: IParseArgs) {
		const action = showT3OpenMoves(args.moduleId);
		args.dispatcher.queueAction(action);
    },
    options: function(args: IParseArgs) { 
        const module = args.dispatcher.moduleStore.getModule(args.moduleId);
        return module.moduleData.board.getEmptyPositions().map((p: number) => p.toString());
    }
}

export const endGameHandlers = {
    new: function(args: IParseArgs) {
		const action = t3NewGame(args.moduleId);
        args.dispatcher.queueAction(action);
    },
    quit: function(args: any) {
		args.dispatcher.queueAction({});
    },
    default: function(args: any) {
		args.dispatcher.queueAction({});
    },
    error: function(args: any) {
        const options = this.options({});
		const action = showOptions(options, args.moduleId);
		args.dispatcher.queueAction(action);
    },
    options: function(args: any) { 
        return ["new", "quit"]
    }
}
