import { STATUS_START } from "./constants";
import { IParseArgs } from '../interfaces/Args';
import { addMoveAction, setStatusAction, showOptionsAction, showT3OpenMovesAction, t3NewGameAction } from '../helpers/actionBuilders';

export const newGameHandlers = {
    ready: function(args: IParseArgs) {
        const action = setStatusAction(STATUS_START, args.moduleId);
        args.dispatcher.process(action);
    },
    default: function(args: IParseArgs) {
        args.dispatcher.process({});
    },
    error: function(args: IParseArgs) {
		const options = this.options({});
		const action = showOptionsAction(options, args.moduleId);
		args.dispatcher.process(action);
    },
    options: function(args: any) { 
        return ["ready"]
    }
}

export const startedGameHandlers = {
    default: function(args: IParseArgs) {
		const action = addMoveAction(args.input, args.moduleId);
		args.dispatcher.process(action);
    },
    error: function(args: IParseArgs) {
		const action = showT3OpenMovesAction(args.moduleId);
		args.dispatcher.process(action);
    },
    options: function(args: any) { 
        return args.dispatcher.moduleStore.getModule(args.moduleId).moduleData.board.getEmptyPositions().map((p: any) => p.toString());
    }
}

export const endGameHandlers = {
    new: function(args: IParseArgs) {
		const action = t3NewGameAction(args.moduleId);
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
		const action = showOptionsAction(options, args.moduleId);
		args.dispatcher.process(action);
    },
    options: function(args: any) { 
        return ["new", "quit"]
    }
}
