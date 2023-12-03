import { readFileSync } from 'node:fs'

export function readInput(day: number) {
    return readFileSync(`./input/d${day}.txt`, { encoding: 'utf-8' });
}