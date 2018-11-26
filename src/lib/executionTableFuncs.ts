import { IAction } from '../interfaces/IAction';
import { IDispatcher } from '../interfaces/IDispatcher';
import { IModule } from '../interfaces/IModule';
import { STATUS_END, STATUS_NEW, STATUS_START } from './constants';
import { t3GameCheck, showT3OpenMoves } from './actionBuilders';

export function T3_MOVE_FN(action: IAction, dispatcher: IDispatcher): void {
	// module copy is added to action refData via dispatcher _preExecution middleware.
	const module = action.refData.module;
	if (module) {
		const { players, activePlayerIndex, board } = module.moduleData;
		const { playerStore, moduleStore } = dispatcher;
		const currentPlayerId = players[activePlayerIndex];
		const player = playerStore.get(currentPlayerId);
		const currentPlayerMark = player ? player.mark : ' ';
      
        const position = parseInt(action.payload.move);
        if (board.isPositionEmpty(position)) {
            const addMoveArgs = {
                playerId: currentPlayerId,
                position: position.toString(),
                mark: currentPlayerMark
			}
			
			moduleStore.updateModuleDataMoves(module.id, addMoveArgs);
		
			const t3GameCheckAction = t3GameCheck(action.refData.moduleId);
			t3GameCheckAction.refData.moveSuccess = true;
			dispatcher.execute(t3GameCheckAction);
		} else {
			const t3GameCheckAction = t3GameCheck(action.refData.moduleId);
			t3GameCheckAction.refData.moveSuccess = false;
			dispatcher.execute(t3GameCheckAction);

			const openMovesAction = showT3OpenMoves(action.refData.moduleId);;
			dispatcher.execute(openMovesAction);
		}
	}
}

export function SET_MODULE_STATUS_FN(action: IAction, dispatcher: IDispatcher): void {
	// const module = action.refData.module;
	const moduleId = action.refData.moduleId;
	if (moduleId) {
		const { moduleStore } = dispatcher;
		const status = action.payload.status;

		moduleStore.updateModule(moduleId, { status });
		// module.setStatus(status);
	}
}

export function T3_NEW_GAME_FN(action: IAction, dispatcher: IDispatcher): void {
	// const module = action.refData.module;
	const moduleId = action.refData.moduleId;
	if (moduleId) {
		const { moduleStore } = dispatcher;
		moduleStore.updateModule(moduleId, { status: STATUS_NEW });
		moduleStore.resetModuleDataMoves(moduleId);
		// module.setStatus(STATUS_NEW);
		// module.moduleData.board.reset();
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
			view: dispatcher.view,
			playerStore: dispatcher.playerStore
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
	const { moduleId } = action.refData;
	if (module.status === STATUS_START) {
		const { moduleStore } = dispatcher;
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
			moduleStore.updateModule(moduleId, { status: STATUS_END });
			
			// module.setStatus(STATUS_END);
			// module.setStatus("DRAW");
		}
	
		// Note: Otherwise cycle player.
		else {
			if (action.refData.moveSuccess) {
				const nextPlayerIndex = getNextPlayerIndex(module);
				moduleStore.updateModuleData(moduleId, { activePlayerIndex: nextPlayerIndex });
				// cycleActivePlayer(module);
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

function getNextPlayerIndex(module: IModule): number {
	const { players, activePlayerIndex } = module.moduleData;
	if (activePlayerIndex < players.length - 1) {
		return activePlayerIndex + 1;
	} else {
		return 0;
	}
}