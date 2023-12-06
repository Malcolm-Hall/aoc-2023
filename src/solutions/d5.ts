import { Day } from "../types/solver";

export const day: Day = {
    parts: [
        {
            examples: [
                {
                    input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
                    expected: '35'
                }
            ],
            expected: '265018614',
            solver: (input: string): string => {
                const [seedsInput, ...mapsInput] = input.split('\n\n');

                const seeds = parseSeeds(seedsInput);
                const maps = mapsInput.map(parseMap);

                const locationNumbers = seeds.map(it => getLocationNumber(it, maps));

                return Math.min(...locationNumbers).toString();
            }
        },
        {
            examples: [
                {
                    input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
                    expected: '46'
                }
            ],
            expected: '63179500',
            skip: true,
            solver: (input: string): string => {
                const [seedsInput, ...mapsInput] = input.split('\n\n');

                const seeds = parseSeeds(seedsInput);
                const maps = mapsInput.map(parseMap);

                let minLocation = Infinity;
                for (let i = 0; i < seeds.length; i += 2) {
                    const start = seeds[i];
                    const range = seeds[i + 1];
                    for (let j = 0; j < range; j++) {
                        const seed = start + j;
                        const locationNumber = getLocationNumber(seed, maps);
                        if (locationNumber < minLocation) minLocation = locationNumber;
                    }
                }

                return minLocation.toString();
            }
        }
    ]
}

type AocMap = ReturnType<typeof parseMap>;

function parseSeeds(seeds: string) {
    return seeds.match(/(\d)+/g)?.map(it => parseInt(it)) as number[];
}

function parseMap(map: string) {
    return map.split('\n')
        .slice(1)
        .map(it => it.match(/(\d)+/g))
        .map(it => it?.map(jt => parseInt(jt)))
        .filter((it): it is number[] => !!it)
        .map(it => ({
            srcStart: it[1],
            dstStart: it[0],
            length: it[2]
        }))
        .sort((a, b) => b.srcStart - a.srcStart);
}

function getMapValue(map: AocMap, src: number) {
    const range = map.find(it => it.srcStart <= src);
    if (!range || src - range.srcStart >= range.length) return src;
    return range.dstStart + src - range.srcStart
}

function getLocationNumber(seed: number, maps: AocMap[]) {
    return maps.reduce((num, map) => getMapValue(map, num), seed)
}
