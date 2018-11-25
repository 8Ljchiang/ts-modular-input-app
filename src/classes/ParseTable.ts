import { ITable } from "../interfaces/ITable";
import { IParseTable } from "../interfaces/IParseTable";
import { IModule } from "../interfaces/IModule";
// import { IView } from "../interfaces/IView";
import { IDispatcher } from "../interfaces/IDispatcher";
import { IParseTableArgs } from "../interfaces/Args";

export default class ParseTable implements IParseTable {
    public handlers: ITable; 
    
    constructor (args: { handlers: ITable }) {
        this.handlers = args.handlers;
    }

    handle(args: IParseTableArgs) {
        const { input } = args;
        if (this._isValidOption(args)) {
            if (this._containsHandler(input)) {
                this.handlers[input](args);
            } else if (this.handlers['default'] !== null) {
                this.handlers['default'](args);
            }
        } else {
            this.handleError(args);
        }
    }
    handleError(args: IParseTableArgs) {
        // console.log("Warning: '" + args.input + "' has no path (OutOfBounds).");
        if (this.handlers['error'] !== null) {
            this.handlers['error'](args);
        }
    }
    _isValidOption(args: any): boolean {
        const options = this.handlers['options'](args);
        return options.includes(args.input);
    }
    _containsHandler(key: string): boolean {
        const validHandlers = Object.keys(this.handlers).filter((key) => {
            const naHandlers = ['default', 'error', 'options'];
            if (naHandlers.includes(key)) {
                return false;
            }
            return true;
        });
        return validHandlers.includes(key);
    }
}