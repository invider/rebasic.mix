function keyDown(e) {
    if (e.code === 'Enter') {
        lab.ioCtrl.enter()

    } else if (e.code === 'Backspace') {
        lab.ioCtrl.backspace()

    } else if (e.key.length === 1) {
        lab.ioCtrl.inputKey(e.key)
    } 
}
