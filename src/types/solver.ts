
type Solver = (input: string) => string;

export type DayModule = {
    day: Day
}

export type Day = {
    parts: Part[]
}

type Part = {
    expected?: string;
    examples: Example[];
    solver?: Solver;
    skip?: boolean;
}

type Example = {
    input: string;
    expected: string;
}
