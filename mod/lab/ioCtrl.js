function init() {
    this.buf = []
}

function inputKey(c) {
    if (c === "'") c = '"'
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
    lab.vm.inputHandler(cmd)
}

function enter() {
    lab.textmode.returnCursor()
    this.command(this.buf.join(''))
    this.buf = []
}

