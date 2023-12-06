import { readInput } from "./helpers/read-input";
import { DayModule } from "./types/solver";

Array(25).fill(0).forEach(async (_, dayIdx) => {
    const day = dayIdx + 1;
    const { day: { parts } }: DayModule = await import(`./solutions/d${day}`);

    parts.forEach(({ solver, examples, expected, skip }, partIdx) => {
        const part = partIdx + 1;

        examples.forEach(({ input, expected }, exampleIdx) => {
            const example = exampleIdx + 1;

            it(`Day ${day} Part ${part} - Example #${example} passes`, () => {
                const actual = solver?.(input);
                expect(actual).toEqual(expected);
            });
        })

        if (!skip || !expected) {
            it(`Day ${day} Part ${part} - Solution`, () => {
                const input = readInput(day);
                const result = solver?.(input);

                if (expected) {
                    expect(result).toEqual(expected);
                } else {
                    console.log(`Day ${day} Part ${part} result is ${result}`);
                }
            });
        }
    })
})