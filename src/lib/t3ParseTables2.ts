import { STATUS_START } from "./constants";
import { IParseArgs } from '../interfaces/Args';
import { addMoveAction, setStatusAction, showOptionsAction, showT3OpenMovesAction, t3NewGameAction, autoMoveAction } from '../helpers/actionBuilders';

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
        const validOptions = Object.keys(this).filter((key) => {
            const naHandlers = ['default', 'error', 'options'];
            if (naHandlers.includes(key)) {
                return false;
            }
            return true;
        });
        return validOptions;
    }
}

export const startedGameHandlers = {
    auto: function(args: IParseArgs) {
        const { dispatcher, moduleId } = args;
        const action = autoMoveAction(0.5, moduleId);
        dispatcher.process(action);
    },
    default: function(args: IParseArgs) {
		const action = addMoveAction(args.input, args.moduleId);
		args.dispatcher.process(action);
    },
    error: function(args: IParseArgs) {
        const options = this.options(args);
		const action = showOptionsAction(options, args.moduleId);
		args.dispatcher.process(action);
		// const action = showT3OpenMovesAction(args.moduleId);
		// args.dispatcher.process(action);
    },
    options: function(args: any) { 
        const moveOptions = args.dispatcher.moduleStore.getModule(args.moduleId).moduleData.board.getEmptyPositions().map((p: any) => p.toString());
        const validOptions = Object.keys(this).filter((key) => {
            const naHandlers = ['default', 'error', 'options'];
            if (naHandlers.includes(key)) {
                return false;
            }
            return true;
        });
        return [ ...validOptions, ...moveOptions ];
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
