function init() {
    this.cur = 0
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
    // escape non-ascii and control characters
    const code = c.charCodeAt(0)
    if (code < 32 || code > 126) return

    //if (c === "'") c = '"'
    //if (c === '&') return
    //if (c === '{') c = '['
    //if (c === '}') c = ']'
    
    if (this.cur === 0) {
        this.buf.push(c)
        const nextLine = lab.textmode.outc(c)
        if (nextLine) this.my --
    } else if (this.cur < 0) {
        const pos = this.buf.length - abs(this.cur)
        this.buf.splice(pos, 0, c)
        lab.textmode.insc(c)
    }
}

function backspace() {
    if (this.buf.length > 0) {
        if (this.cur < 0) {
            const pos = this.buf.length - abs(this.cur)
            this.buf.splice(pos-1, 1)
            lab.textmode.backshift()
        } else {
            this.buf.splice(-1, 1)
            lab.textmode.backspace()
        }
    }
}

function saveHistory(cmd) {
    let last
    if (this.history.length > 0) {
        last = this.history[this.history.length - 1]
    }
    if (cmd && cmd !== last) {
        this.unexecuted = null
        this.history.push(cmd)
        this.historyPos = this.history.length
    }
}

function command(cmd) {
    this.saveHistory(cmd)
    lab.vm.inputHandler(cmd)
}

function enter() {
    lab.textmode.returnCursor()
    this.command(this.buf.join(''))
    this.cur = 0
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

function home() {
    const shift = this.buf.length - abs(this.cur)
    for (let i = 0; i < shift; i++) this.left()
}

function right() {
    if (this.cur < 0) {
        this.cur ++
        lab.textmode.right()
    }
}

function left() {
    const pos = abs(this.cur)
    if (pos < this.buf.length) {
        this.cur --
        lab.textmode.left()
    }
}

function end() {
    while(this.cur < 0) this.right()
}

function del() {
    if (this.buf.length > 0 && this.cur < 0) {
        const pos = this.buf.length - abs(this.cur)
        this.buf.splice(pos, 1)
        this.cur ++
        lab.textmode.del()
    }
}
