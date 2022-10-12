const x = parseInt(process.argv[2])
const y = parseInt(process.argv[3])

const results = {
    sum:     x + y,
    product: x * y,
    mod_xy:  x % y,
    mod_yx:  y % x
}

console.log("Chosen numbers:")
console.table({ x, y })

console.log("Results:")
console.table(results)