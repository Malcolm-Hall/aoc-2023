import { Day } from "../types/solver";

export const day: Day = {
    parts: [
        {
            examples: [
                {
                    input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
                    expected: '142'
                }
            ],
            expected: '54697',
            solver: (input: string): string => {
                const lines = input.split('\n');
                let sum = 0;
                for (const line of lines) {
                    const [firstDigit, lastDigit] = getFirstLastNumericDigit(line);
                    const value = firstDigit.concat(lastDigit);
                    sum += parseInt(value);
                }
                return sum.toString();
            }
        },
        {
            examples: [
                {
                    input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
                    expected: '281'
                }
            ],
            expected: '54885',
            solver: (input: string): string => {
                const lines = input.split('\n');
                let sum = 0;
                for (const line of lines) {
                    const [firstDigit, lastDigit] = getFirstLastDigit(line);
                    const value = firstDigit.concat(lastDigit);
                    sum += parseInt(value);
                }
                return sum.toString();
            }
        }

    ]
}

function getFirstLastNumericDigit(line: string): [string, string] {
    let firstDigit, lastDigit;
    for (let idx = 0; idx < line.length; idx++) {
        const digit = getNumericDigit(line, idx);
        if (digit) {
            lastDigit = digit;
            if (!firstDigit) firstDigit = digit;
        }
    }

    if (!firstDigit || !lastDigit) {
        throw 'No digits in line!'
    }

    return [firstDigit, lastDigit];
}

function getFirstLastDigit(line: string): [string, string] {
    let firstDigit, lastDigit;
    for (let idx = 0; idx < line.length; idx++) {
        const digit = getNumericDigit(line, idx) ?? getLetterDigit(line, idx);
        if (digit) {
            lastDigit = digit;
            if (!firstDigit) firstDigit = digit;
        }
    }

    if (!firstDigit || !lastDigit) {
        throw 'No digits in line!'
    }

    return [firstDigit, lastDigit];
}

function getNumericDigit(line: string, idx: number) {
    return DIGITS.find(({ digit }) => line.startsWith(digit, idx))?.digit;
}

function getLetterDigit(line: string, idx: number) {
    return DIGITS.find(({ word }) => line.startsWith(word, idx))?.digit;
}

const DIGITS = [
    { word: 'one', digit: '1' },
    { word: 'two', digit: '2' },
    { word: 'three', digit: '3' },
    { word: 'four', digit: '4' },
    { word: 'five', digit: '5' },
    { word: 'six', digit: '6' },
    { word: 'seven', digit: '7' },
    { word: 'eight', digit: '8' },
    { word: 'nine', digit: '9' }
];
