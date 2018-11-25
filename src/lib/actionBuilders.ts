import { T3_MOVE, T3_NEW_GAME, RENDER_MODULE, SHOW_OPTIONS, SHOW_T3_OPEN_MOVES, SET_MODULE_STATUS, CYCLE_PLAYER, HANDLE_INPUT, T3_GAME_CHECK } from './actionTypes';
import { IAction } from '../interfaces/IAction';

export function addMove(move: any, moduleId: string): IAction {
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

export function setStatus(status: string, moduleId: string): IAction {
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

export function cyclePlayer(moduleId: string): IAction {
	const action: IAction = {
		type: CYCLE_PLAYER,
		payload: {},
		refData: {
			moduleId
		}
	}

	return action;
}

export function showOptions(options: string[], moduleId: string): IAction {
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

export function showT3OpenMoves(moduleId: string): IAction {
	const action: IAction = {
		type: SHOW_T3_OPEN_MOVES,
		payload: {},
		refData: {
			moduleId
		}
	}

	return action;
}

export function t3NewGame(moduleId: string): IAction {
	const action: IAction = {
		type: T3_NEW_GAME,
		payload: {},
		refData: {
			moduleId
		}
	}

	return action;
}

export function renderModule(moduleId: string): IAction {
	const action: IAction = {
		type: RENDER_MODULE,
		payload: {},
		refData: {
			moduleId
		}
	}

	return action;
}

export function handleInput(input: string, moduleId: string): IAction {
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

export function t3GameCheck(moduleId: string): IAction {
	const action: IAction = {
		type: T3_GAME_CHECK,
		payload: {},
		refData: {
			moduleId
		}
	}

	return action;
}