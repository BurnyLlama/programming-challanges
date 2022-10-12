const person = {
    name: "Fabian",
    birthYear: 2004,
    job: "teacher",
    height: 172,
    present() {
        console.log(`The person ${this.name} is ${new Date(Date.now()).getFullYear() - this.birthYear} years old. The person could be okay with working as a ${this.job}. The person is ${this.height} cm tall.`)
    }
}

person.present()