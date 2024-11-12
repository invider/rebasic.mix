function setup() {
    const W = _$.env.context.width
    const H = _$.env.context.height

    const canvas = ctx.canvas

    ctx.width = W
    ctx.height = H
    canvas.width = W
    canvas.height = H
    canvas.style.width = '' + W + 'px'
    canvas.style.height = '' + H + 'px'
    env.width = W
    env.height = H

    //lab.mem.generateNoise(W, H)
}
