const x = parseInt(process.argv[2])
const y = parseInt(process.argv[3])

const sum      = (a, b) => a + b
const multiply = (a, b) => a * b
const modulos  = (a, b) => a % b

const results = {
    sum:     sum(x, y),
    product: multiply(x, y),
    mod_xy:  modulos(x, y),
    mod_yx:  modulos(y, x)
}

console.log("Chosen numbers:")
console.table({ x, y })

console.log("Results:")
console.table(results)