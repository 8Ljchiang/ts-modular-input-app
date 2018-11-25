export interface IView {
    inputInterface: any;
    outputInterface: any;
    show(text: string): void;
    clear(): void;
    setPrompt(text: string): void;
}