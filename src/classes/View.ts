import { IView } from "../interfaces/IView";

export default class View implements IView {
    show(text: string): void {
        console.log(text);
    }
}