// Expected result:
// 1 1 0 1 1 0 1 1 0 1 1 1 0
// 1 1 0 1 1 0 1 1 1 0 1 1 0
// 1 1 0 1 1 1
// -------------------------

const a = [1, 1, 0]
const b = [1, 1, 1]
const c = [0, 1, 1]
const d = [0]

const lines = [
    [a, a, a, b, d],
    [a, a, b, c, d],
    [a, b],
]

lines.forEach(line => console.log(...line.flat()))