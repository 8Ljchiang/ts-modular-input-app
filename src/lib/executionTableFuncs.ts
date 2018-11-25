import { IAction } from '../interfaces/IAction';
import { IDispatcher } from '../interfaces/IDispatcher';
import { IModule } from '../interfaces/IModule';
import { STATUS_END, STATUS_NEW, STATUS_START } from './constants';
import { t3GameCheck, showT3OpenMoves } from './actionBuilders';

export function T3_MOVE_FN(action: IAction, dispatcher: IDispatcher): void {
	const module = action.refData.module;

	if (module) {
		const { players, activePlayerIndex, board } = module.moduleData;
        const currentPlayer = players[activePlayerIndex];
      
        const position = parseInt(action.payload.move);
        if (board.isPositionEmpty(position)) {
            const addMoveArgs = {
                playerId: currentPlayer.id,
                position: position.toString(),
                mark: currentPlayer.mark
			}
			
			module.moduleData.board.addMove(addMoveArgs);

			const t3GameCheckAction = t3GameCheck(action.refData.moduleId);
			t3GameCheckAction.refData.moveSuccess = true;
			dispatcher.queueAction(t3GameCheckAction);
		} else {
			const t3GameCheckAction = t3GameCheck(action.refData.moduleId);
			t3GameCheckAction.refData.moveSuccess = false;
			dispatcher.queueAction(t3GameCheckAction);

			const openMovesAction = showT3OpenMoves(action.refData.moduleId);;
			dispatcher.queueAction(openMovesAction);
		}
	}
}

export function SET_MODULE_STATUS_FN(action: IAction, dispatcher: IDispatcher): void {
	const module = action.refData.module;

	if (module) {
		const status = action.payload.status;
		module.setStatus(status);
	}
}

export function T3_NEW_GAME_FN(action: IAction, dispatcher: IDispatcher): void {
	const module = action.refData.module;

	if (module) {
		module.setStatus(STATUS_NEW);
		module.moduleData.board.reset();
	}
}

export function SHOW_OPTIONS_FN(action: IAction, dispatcher: IDispatcher): void {
	dispatcher.view.show(`Warning: Input not recognized as a valid option.`);
	
	const options = action.payload.options;
	if (options && Array.isArray(options) && options.length > 0) {
		dispatcher.view.show("Options: " + options.join(", "));
	}
}

export function SHOW_T3_OPEN_MOVES_FN(action: IAction, dispatcher: IDispatcher): void {
	const module = action.refData.module;
	dispatcher.view.show("Showing a list of available moves.");

	if (module) {
		const emptyPositions = module.moduleData.board.getEmptyPositions();
		const options = emptyPositions.map((pos: number) => pos.toString());
		dispatcher.view.show("Options: " + options.join(", "));
	}
}

export function RENDER_MODULE_FN(action: IAction, dispatcher: IDispatcher): void {
	const module = action.refData.module;
	
	if (module) {
		const args = {
            module,
            view: dispatcher.view
        }
        module.moduleRenderer.render(args);
	}
}

export function HANDLE_INPUT_FN(action: IAction, dispatcher: IDispatcher): void {
	const module = action.refData.module;
	const trimmedInput = action.payload.input.trim();
	if (module) {
		module.handleInput({ input: trimmedInput, dispatcher, moduleId: action.refData.moduleId });
	}
}

export function T3_GAME_CHECK_FN(action: IAction, dispatcher: IDispatcher): void {
	const module = action.refData.module;

	if (module.status === STATUS_START) {
		// Note: Check if there is a winner.
		// const patternChecker = {};
		// const { players, activePlayerIndex, board } = module.moduleData;
		// const currentPlayer = players[activePlayerIndex];
		// const currentMark = currentPlayer.mark;
		// const markerPosittions = board.getMarkPositions(currentMark):
		// if (patternChecker.containsPattern(markerPositions)) {
		// 	module.setStatus("WINNER");
		// }
	
		// Note: Check if there the board is full.
		if (module.moduleData.board.getEmptyPositions().length <= 0) {
			module.setStatus(STATUS_END);
			// module.setStatus("DRAW");
		}
	
		// Note: Otherwise cycle player.
		else {
			if (action.refData.moveSuccess) {
				cycleActivePlayer(module);
			}
		}
	}
}

function cycleActivePlayer(module: IModule): void {
    let { players, activePlayerIndex } = module.moduleData;
    if (activePlayerIndex < players.length - 1) {
        module.moduleData.activePlayerIndex = activePlayerIndex + 1;
    } else {
        module.moduleData.activePlayerIndex = 0;
    }
}