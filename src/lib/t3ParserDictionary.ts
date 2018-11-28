import { STATUS_NEW, STATUS_START, STATUS_END, STATUS_WINNER, STATUS_DRAW } from "./constants";

export const t3ParserDictionary = {
    [STATUS_NEW]: "t3NewParser",
    [STATUS_START]: 't3StartParser',
    [STATUS_END]: 't3EndParser',
    [STATUS_WINNER]: 't3EndParser',
    [STATUS_DRAW]: 't3EndParser',
}