import { isContext } from "vm";
import { STATUS_START } from "./constants";

export const newGameHandlers = {
    ready: function(args: any) {
        args.context.setState(STATUS_START);
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
        const position = parseInt(args.input);
        args.context.playPosition(position);
    },
    error: function(args: any) {
        args.view.show("Input not recognized as a valid option.");
        args.view.show("Options: " + this.options(args).join(", "));
    },
    options: function(args: any) { 
        const emptyPositions = args.context.board.getEmptyPositions().map((position: number) => {
            return position.toString();
        });
        return emptyPositions; 
    }
}

export const endGameHandlers = {
    new: function(args: any) {
        args.context.reset();
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
