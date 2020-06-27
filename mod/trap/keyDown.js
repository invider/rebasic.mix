function keyDown(e) {
    if (e.code === 'Enter') {
        lab.textmode.returnCursor()

    } else if (e.code === 'Backspace') {
        lab.textmode.backspace()

    } else if (e.key.length === 1) {
        lab.textmode.outc(e.key)
    } 
}
