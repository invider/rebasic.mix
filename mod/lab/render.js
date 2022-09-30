const Z = 1

function draw() {
    background(env.context.border)

    const base = env.height < env.width? env.height : env.width
    env.tune.edge = base * .05

    const vram = this.vram
    const aspect = vram.width/vram.height

    // calculate target area
    const w = env.width - 2*env.tune.edge
    const h = env.height - 2*env.tune.edge

    // determine best scale
    const hscale = w/vram.width
    const vscale = h/vram.height
    const scale = hscale < vscale? hscale : vscale

    // calculate actual screen dimention and position
    const sw = vram.width * scale * env.tune.scale
    const sh = vram.height * scale * env.tune.scale
    const x = (env.width - sw)/2
    const y = (env.height - sh)/2

    blocky()
    //smooth()
    image(vram, x, y, sw, sh)

    this.x = x
    this.y = y
    this.w = sw
    this.h = sh
    this.scale = scale
}
