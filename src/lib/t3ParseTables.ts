
import { STATUS_START, STATUS_NEW, STATUS_END } from "./constants";
import { IModule } from "../interfaces/IModule";

export const newGameHandlers = {
    ready: function(args: any) {
        args.module.setStatus(STATUS_START);
    },
    default: function(args: any) {
        args.view.show("Default[new]: Has not been defined");
    },
    error: function(args: any) {
        args.view.show("Input not recognized as a valid option.");
        args.view.show("Options: " + this.options(args).join(", "));
    },
    options: function(args: any) { 
        return ["ready"]
    }
}

export const startedGameHandlers = {
    default: function(args: any) {
        
        const { players, activePlayerIndex, board } = args.module.moduleData;
        const currentPlayer = players[activePlayerIndex];
      
        const position = parseInt(args.input);
        if (board.isPositionEmpty(position)) {
            const addMoveArgs = {
                playerId: currentPlayer.id,
                position: args.input,
                mark: currentPlayer.mark
            }
            args.module.moduleData.board.addMove(addMoveArgs);
            cycleActivePlayer(args.module);
        }
        if (board.getEmptyPositions().length === 0) {
            args.module.setStatus(STATUS_END);
        }
    },
    error: function(args: any) {
        args.view.show("Input not recognized as a valid option.");
        args.view.show("Options: " + this.options(args).join(", "));
    },
    options: function(args: any) { 
        const emptyPositions = args.module.moduleData.board.getEmptyPositions().map((position: number) => {
            return position.toString();
        });
        return emptyPositions; 
    }
}

export const endGameHandlers = {
    new: function(args: any) {
        args.module.setStatus(STATUS_NEW);
        args.module.moduleData.board.reset();
    },
    quit: function(args: any) {
        console.log("Quit handler has not been defined.");
        // process.exit(0);
    },
    default: function(args: any) {
        args.view.show("Default[end]: Has not been defined");
    },
    error: function(args: any) {
        args.view.show("Input not recognized as a valid option.");
        args.view.show("Options: " + this.options(args).join(", "));
    },
    options: function(args: any) { 
        return ["new", "quit"]
    }
}

function cycleActivePlayer(module: IModule) {
    let { players, activePlayerIndex } = module.moduleData;
    if (activePlayerIndex < players.length - 1) {
        module.moduleData.activePlayerIndex = activePlayerIndex + 1;
    } else {
        module.moduleData.activePlayerIndex = 0;
    }
}