import { Day } from "../types/solver";

export const day: Day = {
    parts: [
        {
            examples: [
                {
                    input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
                    expected: '13'
                }
            ],
            expected: '19855',
            solver: (input: string): string => {
                const cards = getCards(input);
                return cards.map(getMatchingNumbers)
                    .map(it => it.reduce((acc) => {
                        if (acc === 0) return 1;
                        return acc * 2;
                    }, 0))
                    .reduce((acc, val) => acc + val)
                    .toString();
            },
        },
        {
            examples: [
                {
                    input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
                    expected: '30'
                }
            ],
            expected: '10378710',
            solver: (input: string): string => {
                const cards = getCards(input);
                const copies = new Map<number, number>(cards.map((_, idx) => [idx, 1]));

                for (const [idx, card] of cards.entries()) {
                    const matchingNumbers = getMatchingNumbers(card);
                    const copyCount = copies.get(idx) as number;
                    for (let i = 1; i <= matchingNumbers.length; i++) {
                        const value = copies.get(idx + i) as number;
                        copies.set(idx + i, value + copyCount);
                    }
                }

                return Array.from(copies.values())
                    .reduce((acc, val) => acc + val)
                    .toString();
            },
        }
    ]
}

type Card = {
    winningNumbers: string[];
    numbers: string[];
};

function getCards(input: string): Card[] {
    return input
        .split('\n')
        .map((card) => card
            .split(':')
            .at(1)
            ?.split('|')
            .map(jt => jt.match(/(\d+)/g))
        ).map(jt => ({
            winningNumbers: jt![0] as string[],
            numbers: jt![1] as string[]
        }));
}

function getMatchingNumbers(card: Card): string[] {
    const numberSet = new Set(card.numbers);
    return card.winningNumbers
        .filter(it => numberSet.has(it))
}
