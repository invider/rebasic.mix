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
    const W = env.context.width
    const H = env.context.height

    /*
    // cool
    this.font = 'px coolville'
    this.fontSize = 10
    this.curSize = 8
    this.curShift = 0
    this.fw = 5
    this.fh = 10


    // basis33
    this.font = 'px basis33'
    this.fontSize = 8
    this.curSize = 6
    this.curShift = 1
    this.fw = 4
    this.fh = 8

    // operator
    this.font = 'px pixel-operator-mono8'
    this.fontSize = 6
    this.curSize = 8
    this.curShift = -1
    this.fw = 6
    this.fh = 10

    // typewriter
    this.font = 'px typewriter'
    this.fontSize = 6
    this.curSize = 8
    this.curShift = 0
    this.fw = 5
    this.fh = 10
    */

    // monogram
    this.font = 'px monogram'
    this.fontSize = 12
    this.curSize = 8
    this.curShift = 2
    this.fw = 5
    this.fh = 10

    this.tw = floor(W / this.fw) - 1
    this.th = floor(H / this.fh)
    this.dx = floor(W - this.tw*this.fw)/2
    this.dy = floor(H - this.th*this.fh)/2

    env.context.columns = this.tw
    env.context.rows    = this.th
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

function getc(x, y) {
    if (x < 0 || x >= this.tw || y < 0 || y >= this.h) return // out of screen
    return this.cell[y * this.tw + x]
}

// get the next char from the position
function getnc(x, y) {
    x++
    if (x >= this.tw) {
        x = 0
        y++
    }
    if (x < 0 || x >= this.tw || y < 0 || y >= this.h) return SPACE
    return this.cell[y * this.tw + x]
}

function putc(x, y, c) {
    if (!c || c.length !== 1) return // not a symbol
    if (x < 0 || x >= this.tw || y < 0 || y >= this.h) return // out of screen
    //this.cell[y * this.tw + x] = c
    this.cell[y * this.tw + x] = c.toUpperCase()
}

function swap(x, y, c) {
    if (!c || c.length !== 1) return // not a symbol
    if (x < 0 || x >= this.tw || y < 0 || y >= this.h) return // out of screen
    const s = this.cell[y * this.tw + x]
    this.cell[y * this.tw + x] = c.toUpperCase()
    return s
}

function outc(c) {
    this.timer = 0
    if (c === '\n') {
        this.returnCursor()
    } else {
        this.putc(this.cx, this.cy, c)
        return this.shiftCursor()
    }
}

function insc(c) {
    // shift the first line
    let tx = this.cx
    let ty = this.cy
    let s = this.getc(tx++, ty)
    while (tx < this.tw) {
        s = this.swap(tx, ty, s)
        tx ++
    }
    while (ty < this.th) {
        tx = 0
        while(tx < this.w) {
            s = this.swap(tx, ty, s)
            tx ++
        }
        ty ++
    }
    this.outc(c)
}

function del() {
    this.right()
    this.backshift()
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

function left() {
    this.timer = 0
    if (this.cx === 0) {
        if (this.cy > 0) {
            this.cy --
            this.cx = this.tw - 1
        } else {
            return false // unable to move left
        }
    } else {
        this.cx --
    }
    return true
}

function right() {
    this.timer = 0
    if (this.cx >= this.tw - 1) {
        if (this.cy < this.th - 1)  {
            this.cy ++
            this.cx = 0
        } else {
            return false // unable to move right
        }
    } else {
        this.cx ++
    }
    return true
}

function backspace() {
    this.left()
    this.putc(this.cx, this.cy, SPACE)
}

function backshift() {
    this.backspace()

    let tx = this.cx
    let ty = this.cy
    // shift the first line
    while (tx < this.tw) {
        const nextc = this.getnc(tx, ty)
        this.putc(tx, ty, nextc)
        tx ++
    }
    while (ty < this.th) {
        tx = 0
        while(tx < this.w) {
            s = this.swap(tx, ty, s)
            tx ++
        }
        ty ++
    }
}

function htab(x) {
    if (!x) return
    this.cx = limit(x - 1, 0, this.tw - 1)
}

function vtab(y) {
    if (!y) return
    this.cy = limit(y - 1, 0, this.th - 1)
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
            fill(env.context.ink)
            const c = cell[y*tw + x] || '?'
            text(c, x*fw*scale, y*fh*scale)
        }
    }

    if (this.timer % 1 < .5) {
        if (this.cx >= 0 && this.cx < tw
                && this.cy >= 0 && this.cy < th) {
            fill(env.context.ink)
            rect(this.cx*fw*scale,
                    (this.cy*fh + this.curShift)*scale,
                    fw*scale, this.curSize*scale)
            //text(CUR, this.cx*fw*scale, this.cy*fh*scale)
        }
    }

    restore()
}
