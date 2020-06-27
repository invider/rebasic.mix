function generateNoise(w, h) {
    if (!this.mask) this.mask = []

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const c = RGB(RND(255), RND(255), RND(255))
            this.mask[y * w + x] = c
        }
    }

}

function drawNoise() {
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const c = this.mask[y * w + x]
            fill(c)
            rect(x, y, 1, 1)
        }
    }
}

function paint() {
    const w = env.width
    const h = env.height
    //this.generateNoise(w, h)

    save()
    fill(env.tune.background)
    rect(0, 0, w, h)


    rect(RND(w), RND(h), 1, 1)
    rect(RND(w), RND(h), 1, 1)

    lineWidth(2)
    stroke('#202020')

    rect(20, 20, w-40, h-40)
    line(0, 0, w, h)
    line(w, 0, 0, h)

    //font('8px pixel-operator-mono8')
    font('10px coolville')
    alignLeft()
    baseTop()
    fill('#000000')
    text('Welcome to Low Res Mode!', 1, 1)
    fill('#aaff90')
    text('Welcome to Low Res Mode!', 0, 0)

    restore()
}

let dirty = true
function draw() {
    if (dirty) {
        this.paint()
        dirty = true
    }
}