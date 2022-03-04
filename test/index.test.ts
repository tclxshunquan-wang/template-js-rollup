
test('test', () => {
    const module = import('../src/index')
    module.then((res) => {
        console.log(res.default.name)
    })
})
