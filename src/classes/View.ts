import { IView } from "../interfaces/IView";
import readline from 'readline';
import { IOutputInterface } from "../interfaces/IOutputInterface";

export default class View implements IView {
    public inputInterface: any; 
    public outputInterface: IOutputInterface;

    constructor(args: { inputInterface: any, outputInterface: any }) {
        this.inputInterface = args.inputInterface;
        this.outputInterface = args.outputInterface;
    }

    show(text: string): void {
        this.outputInterface.log(text);
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