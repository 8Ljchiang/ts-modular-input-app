export function isValidPosition(boardSize: number, position: number): boolean {
	return position > 0 && position <= boardSize;
}

export function getValidPositions(boardSize: number): number[] {
	const validPositions: number[] = [];
	const maxPosition = boardSize;
	for (let i = 1; i <= maxPosition; i++) {
		validPositions.push(i);
	}
	return validPositions;
}

export function getTakenPositions(boardMoves: any[]): number[] {
	return boardMoves.map((move: any) => {
		return parseInt(move.position);
	});
}

export function isPositionEmpty(boardMoves: any[], position: number): boolean {
	for (let move of boardMoves) {
		if (parseInt(move.position) === position) {
			return false;
		}
	}
	return true;
}

export function getEmptyPositions(args: { boardSize: number, boardMoves: any[] }): number[] {
	const { boardSize, boardMoves } = args;
	const emptyPositions: Array<number> = [];
	const takenPositions = getTakenPositions(boardMoves);
	for (let i = 0; i <= boardSize; i++) {
		if (!takenPositions.includes(i)) {
			emptyPositions.push(i)
		}
	}
	return emptyPositions;
}

export function getMarkPositions(boardMoves: any[], mark: string): number[] {
	const markPositions = [];
	for (let move of boardMoves) {
		if (move.mark === mark) {
			const position = parseInt(move.position);
			markPositions.push(position);
		}
	}
	return markPositions;
}
