import { IView } from "../interfaces/IView";
import readline from 'readline';

export default class View implements IView {
    public inputInterface: any; 

    constructor(args: {inputInterface: any}) {
        this.inputInterface = args.inputInterface;
    }

    show(text: string): void {
        console.log(text);
    }
    clear(): void {
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);
    }
    setPrompt(text: string): void {
        this.inputInterface.setPrompt(text);
        this.inputInterface.prompt();
    }
}