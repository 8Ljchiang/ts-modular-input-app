import { getEmptyPositions } from './t3BoardAnalyzerHelpers';

// skill is a number between 0 and 1;
// if randomChance is less than the skill input, then a skilled move is returned.
export function getMove(args: { boardSize: number, boardMoves: any[], skill: number }): number {
	const { skill } = args;
	const randomChance = Math.random();
	if (skill > 0 && skill < 1 && randomChance < skill) {
		// return getSkilledMove(args);
		return getRandomMove(args);
	}
	return getRandomMove(args);
}

export function getRandomMove(args: { boardSize: number, boardMoves: any[] }): number {
	const emptyPositions = getEmptyPositions(args);
	const randomIndex = Math.floor(Math.random() * emptyPositions.length);
	return emptyPositions[randomIndex];
}

// This utilizes the minimax function.
export function getSkilledMove(args: { boardSize: number, boardMoves: any[] }): number {
	return 0;
}