let car = {
    name: "Fiat 600",
    isWorking: false,
    passengers: {
        mum: "Missing.",
        cousin: "Fred"
    }
}

console.log(car)
console.log()

car.name                = "BMW Z4"
car.isWorking           = true
car.passengers.mate     = "Omar"
car.passengers.friend   = "Petunia"
car.passengers.collegue = "John"

console.log(car)
console.log(
    Object
        .keys(car.passengers)
        .map(relation => car.passengers[relation])
)