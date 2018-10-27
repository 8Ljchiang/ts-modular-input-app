export default class App {
    public inputHandler: any;
    public currentContextReference: any;
    public previousContextReference: any;
    public contextStore: any;
    
    constructor(args: {inputHandler: any}) {
        this.inputHandler = args.inputHandler;

        this.init();
    }

    init() {
        this.inputHandler.on('line', (line: any) => {

        });
    }
}