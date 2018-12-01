import { T3_MOVE, T3_NEW_GAME, RENDER_MODULE, SHOW_OPTIONS, SHOW_T3_OPEN_MOVES, SET_MODULE_STATUS, CYCLE_PLAYER, HANDLE_INPUT, T3_GAME_CHECK, T3_AUTO_MOVE } from './actionTypes';
import { IAction } from '../interfaces/IAction';

export function addMoveAction(move: any, moduleId: string): IAction {
	const action: IAction = {
		type: T3_MOVE,
		payload: {
			move
		},
		refData: {
			moduleId
		}
	}
	
	return action;
}

export function autoMoveAction(skill: number, moduleId: string): IAction {
	const action: IAction = {
		type: T3_AUTO_MOVE,
		payload: {
			skill,
		},
		refData: {
			moduleId
		}
	}
	return action;
}

export function setStatusAction(status: string, moduleId: string): IAction {
	const action: IAction = {
		type: SET_MODULE_STATUS,
		payload: {
			status
		},
		refData: {
			moduleId
		}
	}

	return action;
}

export function cyclePlayerAction(moduleId: string): IAction {
	const action: IAction = {
		type: CYCLE_PLAYER,
		payload: {},
		refData: {
			moduleId
		}
	}

	return action;
}

export function showOptionsAction(options: string[], moduleId: string): IAction {
	const action: IAction = {
		type: SHOW_OPTIONS,
		payload: {
			options
		},
		refData: {
			moduleId
		}
	}

	return action;
}

export function showT3OpenMovesAction(moduleId: string): IAction {
	const action: IAction = {
		type: SHOW_T3_OPEN_MOVES,
		payload: {},
		refData: {
			moduleId
		}
	}

	return action;
}

export function t3NewGameAction(moduleId: string): IAction {
	const action: IAction = {
		type: T3_NEW_GAME,
		payload: {},
		refData: {
			moduleId
		}
	}

	return action;
}

export function renderModuleAction(moduleId: string): IAction {
	const action: IAction = {
		type: RENDER_MODULE,
		payload: {},
		refData: {
			moduleId
		}
	}

	return action;
}

export function handleInputAction(input: string, moduleId: string): IAction {
	const action: IAction = {
		type: HANDLE_INPUT,
		payload: {
			input
		},
		refData: {
			moduleId
		}
	}
	
	return action;
}

export function t3GameCheckAction(moduleId: string): IAction {
	const action: IAction = {
		type: T3_GAME_CHECK,
		payload: {},
		refData: {
			moduleId
		}
	}

	return action;
}