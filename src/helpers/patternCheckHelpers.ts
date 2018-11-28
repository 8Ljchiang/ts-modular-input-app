export function containsPattern(positions: number[], patterns: string[]): boolean {
	return findPattern(positions, patterns) ? true : false;
}	

export function findPattern(positions: number[], patterns: string[]): number[] | null {
	for (const pattern of patterns) {
		const patternPositions = pattern.split(",").map((stringPosition: string) => parseInt(stringPosition, 10));
		const matches = [];
		for (const position of positions) {
			if (patternPositions.indexOf(position) !== -1) {
				matches.push(position);
			}
		}

		if (matches.length === patternPositions.length) return matches;
	}
	return null;
}