class Animal {
    constructor(name, latinName) {
        this.name = name
        this.latinName = latinName
    }
}

const animalNames = [
    ["Cow",    "Cos-cos"  ],
    ["Dog",    "Doggimus" ],
    ["Cat",    "Feline"   ],
    ["Pigoen", "Pica pica"]
]

const animals = animalNames.map(animalName => new Animal(...animalName))

console.log(animals)
