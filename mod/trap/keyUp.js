function keyUp(e) {
    const key = e.key.toLowerCase()
    if (env.currentKey === key) {
        env.currentKey = ''
    }
}
