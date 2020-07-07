const Z = 2
const SPACE = ' '

//const CUR = '*'
//const CUR = '_'
//const CUR = '█'

function init() {
    this.timer = 0
    this.cx = 0
    this.cy = 0
    this.cell = []
    this.adjust()
    this.clear()
}

function adjust() {
    const W = env.tune.width
    const H = env.tune.height

    /*
    // cool
    this.font = 'px coolville'
    this.fontSize = 10
    this.curSize = 8
    this.curShift = 0
    this.fw = 5
    this.fh = 10

    // operator
    this.font = 'px pixel-operator-mono8'
    this.fontSize = 8
    this.curSize = 8
    this.curShift = 0
    this.fw = 8
    this.fh = 12

    // basis33
    this.font = 'px basis33'
    this.fontSize = 8
    this.curSize = 6
    this.curShift = 1
    this.fw = 4
    this.fh = 8
    */
    // typewriter
    this.font = 'px typewriter'
    this.fontSize = 6
    this.curSize = 8
    this.curShift = 0
    this.fw = 5
    this.fh = 10

    this.tw = floor(W / this.fw) - 1
    this.th = floor(H / this.fh)
    console.dir(this.th)
    console.dir(H)
    this.dx = floor(W - this.tw*this.fw)/2
    this.dy = floor(H - this.th*this.fh)/2
}

function clear() {
    const w = this.tw
    const h = this.th
    const cell = this.cell

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            cell[y*w + x] = SPACE
        }
    }
    this.cx = 0
    this.cy = h - 1
}

function shiftScreen() {
    const w = this.tw
    const h = this.th
    const cell = this.cell

    for (let y = 1; y < h; y++) {
        for (let x = 0; x < w; x++) {
            cell[(y-1)*w + x] = cell[y*w + x]
        }
    }

    const y = h - 1
    for (let x = 0; x < w; x++) {
        cell[y*w + x] = SPACE
    }
}

function returnCursor() {
    this.cx = 0
    this.cy ++
    if (this.cy >= this.th) {
        this.shiftScreen()
        this.cy = this.th - 1
    }
}

function shiftCursor() {
    this.cx ++
    if (this.cx >= this.tw) {
        this.returnCursor()
        return true
    }
}

function setCursor(x, y) {
    this.cx = x
    this.cy = y
}


function putc(c, x, y) {
    if (!c || c.length !== 1) return
    if (x < 0 || x >= this.tw || y < 0 || y >= this.h) return
    //this.cell[y * this.tw + x] = c
    this.cell[y * this.tw + x] = c.toUpperCase()
}

function outc(c) {
    this.timer = 0
    if (c === '\n') {
        this.returnCursor()
    } else {
        this.putc(c, this.cx, this.cy)
        return this.shiftCursor()
    }
}

function printout(line) {
    line = line || ''
    line = '' + line
    for (let i = 0, ln = line.length; i < ln; i++) {
        this.outc(line.charAt(i))
    }
}

function println(line) {
    this.printout(line)
    this.returnCursor()
}

function backspace() {
    this.timer = 0
    if (this.cx === 0) {
        this.cy --
        this.cx = this.tw - 1
    } else {
        this.cx --
    }
    this.putc(SPACE, this.cx, this.cy)
}

function evo(dt) {
    this.timer += dt
}

function draw() {
    save()
    baseTop()
    alignLeft()

    const cell = this.cell
    const { x, y, scale } = lab.render
    translate(x + this.dx*scale, y + this.dy*scale)
    font(this.fontSize * scale + this.font)

    const tw = this.tw
    const th = this.th
    const fw = this.fw
    const fh = this.fh

    for (let y = 0, l1 = th; y < l1; y++) {
        for (let x = 0, l2 = tw; x < l2; x++) {
            fill(env.tune.face)
            const c = cell[y*tw + x] || '?'
            text(c, x*fw*scale, y*fh*scale)
        }
    }

    if (this.timer % 1 < .5) {
        if (this.cx >= 0 && this.cx < tw
                && this.cy >= 0 && this.cy < th) {
            fill(env.tune.face)
            rect(this.cx*fw*scale,
                    (this.cy*fh + this.curShift)*scale,
                    fw*scale, this.curSize*scale)
            //text(CUR, this.cx*fw*scale, this.cy*fh*scale)
        }
    }

    restore()
}
