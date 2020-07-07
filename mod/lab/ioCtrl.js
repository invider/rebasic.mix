function init() {
    this.buf = []
    this.history = []
    this.historyPos = 0
}

function sync(cmd) {
    cmd = cmd || ''
    // clean up current message
    this.buf.forEach(c => lab.textmode.backspace())
    this.buf = cmd.split('')
    lab.textmode.printout(cmd)
}

function inputKey(c) {
    if (c === "'") c = '"'

    this.buf.push(c)
    const nextLine = lab.textmode.outc(c)
    if (nextLine) this.my --
}

function backspace() {
    if (this.buf.length > 0) {
        this.buf.splice(-1, 1)
        lab.textmode.backspace()
    }
}

function command(cmd) {
    let last
    if (this.history.length > 0) {
        last = this.history[this.history.length - 1]
    }
    if (cmd && cmd !== last) {
        this.unexecuted = null
        this.history.push(cmd)
        this.historyPos = this.history.length
        lab.vm.inputHandler(cmd)
    }
}

function enter() {
    lab.textmode.returnCursor()
    this.command(this.buf.join(''))
    this.buf = []
}

function prev() {
    if (this.historyPos > 0) {
        if (this.historyPos === this.history.length) {
            this.unexecuted = this.buf.join('')
        }
        this.historyPos --
        const cmd = this.history[this.historyPos]
        this.sync(cmd)
    }
}

function next() {
    if (this.historyPos < this.history.length) {
        this.historyPos ++
        let cmd = this.history[this.historyPos]
        if (!cmd && this.unexecuted) {
            cmd = this.unexecuted
        }
        this.sync(cmd)
    }
}
