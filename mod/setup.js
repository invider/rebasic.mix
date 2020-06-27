function setup() {
    const buf = mod['screen-buf']
    lab.render.vram = buf.ctx.canvas
    buf.env.link(env.tune)
}
