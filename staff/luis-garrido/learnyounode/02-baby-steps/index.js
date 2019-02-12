
const total = process.argv.reduce((acc, item, index) => {
    if (index >= 2) {
        return Number(acc) + Number(item)
    }
    else return 0
})

console.log(total)
