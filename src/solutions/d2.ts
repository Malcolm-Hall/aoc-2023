import { Day } from "../types/solver";

export const day: Day = {
    parts: [
        {
            examples: [
                {
                    input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
                    expected: '8'
                }
            ],
            expected: '2317',
            solver: (input: string): string => {
                const lines = input.split('\n');
                const games = lines.map(it => parseGame(it));
                const possibleGames = games.filter(it => isPossibleGame(it));
                return possibleGames
                    .map(it => it.id)
                    .reduce((acc, id) => acc + id)
                    .toString();
            }
        },
        {
            examples: [
                {
                    input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
                    expected: '2286'
                }
            ],
            expected: '74804',
            solver: (input: string): string => {
                const lines = input.split('\n');
                const games = lines.map(it => parseGame(it));
                const minCubes = games.map(it => getMinCubes(it));
                const powerSets = minCubes.map(({ red, green, blue }) => red * green * blue);
                return powerSets.reduce((acc, value) => acc + value).toString();
            }
        }
    ]
}

const MAX_CUBES: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14
};

type Run = {
    red: number;
    green: number;
    blue: number;
};

type Game = {
    id: number;
    runs: Run[];
};

function parseGame(line: string): Game {
    const [game, allRuns] = line.split(':');
    const gameId = game.match(/\d+/)?.at(0);
    const runs = allRuns.split(';').map((run) => getRun(run));

    return {
        id: parseInt(gameId ?? ''),
        runs
    }
}

function getRun(run: string): Run {
    return {
        red: getColorCount(run, 'red'),
        green: getColorCount(run, 'green'),
        blue: getColorCount(run, 'blue'),
    }
}

function getColorCount(run: string, color: keyof Run) {
    const regex = new RegExp(`(\\d+) ${color}`);
    const count = run.match(regex)?.at(1);
    return parseInt(count ?? '0');
}

function isPossibleGame(game: Game): boolean {
    return game.runs.every(it => isPossibleRun(it));
}

function isPossibleRun(run: Run): boolean {
    return Object.entries(run).every(([color, count]) => count <= MAX_CUBES[color])
}

function getMinCubes(game: Game): Run {
    const minCubes = { red: 0, green: 0, blue: 0 };
    game.runs.forEach(({ red, green, blue }) => {
        if (red > minCubes.red) minCubes.red = red;
        if (green > minCubes.green) minCubes.green = green;
        if (blue > minCubes.blue) minCubes.blue = blue;
    });
    return minCubes;
}