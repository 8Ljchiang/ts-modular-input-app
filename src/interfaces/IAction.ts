export type IAction = {
	type: string;
	payload: { [key: string]: any };
	refData: { moduleId: string; [key: string]: any };
}