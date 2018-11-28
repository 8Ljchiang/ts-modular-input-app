export interface IT3PatternChecker {
	containsPattern(positions: Array<number>, patterns: Array<string>): boolean;
	findPattern(positions: Array<number>, patterns: Array<string>): string[] | null;
}