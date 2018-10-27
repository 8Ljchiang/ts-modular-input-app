export interface IView {
    show(text: string): void;
    clear(): void;
    setPrompt(text: string): void;
}