import { Day } from "../types/solver";

export const day: Day = {
    parts: [
        {
            examples: [
                {
                    input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
                    expected: '4361'
                }
            ],
            expected: '531932',
            solver: (input: string): string => {
                const symbols = getSymbols(input);
                const partNumbers = getPartNumbers(input, symbols);

                return partNumbers.map((it) => parseInt(it))
                    .reduce((acc, val) => acc + val)
                    .toString();
            },
        },
        {
            examples: [
                {
                    input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
                    expected: '467835'
                }
            ],
            expected: '73646890',
            solver: (input: string): string => {
                const symbols = getSymbols(input);
                const gears = getGears(input, symbols);
                return gears
                    .map((it) => it.map(jt => parseInt(jt)).reduce((acc, val) => acc * val))
                    .reduce((acc, val) => acc + val, 0)
                    .toString();
            }
        }
    ]
}

type Symbol = { lineIdx: number, charIdx: number };
type ReplaceResult = { replacedLine: string, partNumber: string };
type Gear = [string, string];

function getSymbols(input: string): Symbol[] {
    const lineArr = input.split('\n');
    const symbols = [];

    for (const [lineIdx, line] of lineArr.entries()) {
        for (const [charIdx, char] of [...line].entries()) {
            if (char === '.' || isDigit(char)) continue;
            symbols.push({
                lineIdx,
                charIdx
            });
        }
    }

    return symbols;
}

function getPartNumbers(input: string, symbols: Symbol[]): string[] {
    const lineArr = input.split('\n');
    const partNumbers = [];

    for (const symbol of symbols) {
        const symbolPartNumbers = getSymbolPartNumbers(lineArr, symbol)
        partNumbers.push(...symbolPartNumbers);
    }

    return partNumbers;
}

function getSymbolPartNumbers(lineArr: string[], { lineIdx, charIdx }: Symbol) {
    const partNumbers = [];

    for (let y = lineIdx - 1; y <= lineIdx + 1; y++) {
        for (let x = charIdx - 1; x <= charIdx + 1; x++) {
            if (x === charIdx && y === lineIdx) continue;
            const neighbour = lineArr.at(y)?.at(x);
            if (!neighbour || !isDigit(neighbour)) continue;

            const result = getAndReplacePartNumber(lineArr[y], x);
            lineArr[y] = result.replacedLine;
            partNumbers.push(result.partNumber);
        }
    }

    return partNumbers;
}

function isDigit(char: string) {
    return char >= '0' && char <= '9';
}

function getAndReplacePartNumber(line: string, charIdx: number): ReplaceResult {
    let startIdx = charIdx;
    for (let x = startIdx; isDigit(line[x]); x--) {
        startIdx = x;
    }

    let endIdx = charIdx;
    for (let x = endIdx; isDigit(line[x]); x++) {
        endIdx = x + 1;
    }

    const partNumber = line.slice(startIdx, endIdx);
    const replacedLine = line.substring(0, startIdx) + '.'.repeat(partNumber.length) + line.substring(endIdx, line.length);

    return {
        partNumber,
        replacedLine
    };
}

function getGears(input: string, symbols: Symbol[]): Gear[] {
    const lineArr = input.split('\n');
    const gears = []
    for (const symbol of symbols) {
        const symbolChar = lineArr[symbol.lineIdx][symbol.charIdx];
        if (symbolChar !== '*') continue;
        const symbolPartNumbers = getSymbolPartNumbers(lineArr, symbol)
        if (symbolPartNumbers.length !== 2) continue;
        gears.push(symbolPartNumbers as Gear);
    }
    return gears;
}
