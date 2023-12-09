import { Day } from "../types/solver"

export const day: Day = {
    parts: [
        {
            examples: [
                {
                    input: `Time:      7  15   30
Distance:  9  40  200`,
                    expected: '288'
                }
            ],
            expected: '1083852',
            solver: (input: string): string => {
                const races = parseRaces(input);
                return races.map(countWaysToWin)
                    .reduce((acc, val) => acc * val, 1)
                    .toString();
            }
        },
        {
            examples: [
                {
                    input: `Time:      7  15   30
Distance:  9  40  200`,
                    expected: '71503'
                }
            ],
            expected: '23501589',
            solver: (input: string): string => {
                const race = parseRace(input);

                return countWaysToWin(race).toString();
            }
        }
    ]
}

type Race = { time: number; distance: number; };

function parseRaces(input: string) {
    const [times, distances] = input.split('\n')
        .map((line) => line.match(/(\d+)/g)?.map(it => parseInt(it)));

    if (!times || !distances || times.length !== distances.length) throw 'Bad Input!';

    const races: Race[] = [];
    for (let i = 0; i < times.length; i++) {
        races.push({
            time: times[i],
            distance: distances[i]
        });
    }

    return races;
}

function parseRace(input: string) {
    const [time, distance] = input.split('\n')
        .map((line) => line.match(/(\d+)/g)?.reduce((acc, val) => acc + val))
        .filter((it): it is string => !!it)
        .map((it) => parseInt(it));

    return {
        time,
        distance
    }
}

function countWaysToWin(race: Race) {
    let count = 0;
    for (let i = 1; i < race.time; i++) {
        const distance = getDistance(i, race.time);
        if (distance > race.distance) count++;
    }
    return count;
}

function getDistance(holdTime: number, raceTime: number) {
    const speed = holdTime;
    const time = raceTime - holdTime;
    return speed * time;
}