function init() {
    this.buf = []
    this.queue = []
}

function acceptInput(then) {
    this.accept = true
    this.queue.push(then)
}

function inputKey(c) {
    this.buf.push(c)
    lab.textmode.outc(c)
}

function backspace() {
    if (this.buf.length > 0) {
        this.buf.splice(-1, 1)
    }
    lab.textmode.backspace()
}

function command(cmd) {
    log('[' + cmd + ']')

    // check for an input callback
    if (this.queue.length > 0) {
        const then = this.queue.shift()
        then(cmd)
    } else {
        lab.vm.inputHandler(cmd)
    }
}

function enter() {
    lab.textmode.returnCursor()
    this.command(this.buf.join(''))
    this.buf = []
}
