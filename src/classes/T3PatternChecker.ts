import { IT3PatternChecker } from "../interfaces/IT3PatternChecker";

export class T3PatternChecker implements IT3PatternChecker {
	containsPattern(positions: number[], patterns: string[]): boolean {
		return this.findPattern(positions, patterns) ? true : false;
	}	
	findPattern(positions: number[], patterns: string[]): string[] | null {
		for (const pattern of patterns) {
			const patternPositions = pattern.split(",").map((stringPosition: string) => parseInt(stringPosition, 10));
			const matches = [];
			for (const position of positions) {
				if (patternPositions.indexOf(position) !== -1) {
					matches.push(pattern);
				}
			}

			if (matches.length === patternPositions.length) return matches;
		}
		return null;
	}
}
