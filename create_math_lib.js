const mlib = {
    add:  (a, b) => Number(a) + Number(b),
    mult: (a, b) => Number(a) + Number(b),

    add_string_length: (a, b) => a.toString().length + b.toString().length
}

// ---

console.log(mlib.add(4, 5))
console.log(mlib.mult(4, 5))
console.log(mlib.add_string_length({}, "world!"))
console.log(mlib.add({}, "world!"))
