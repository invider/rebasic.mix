function setup() {
    const W = 200
    const H = 160

    const canvas = ctx.canvas

    ctx.width = W
    ctx.height = H
    canvas.width = W
    canvas.height = H
    canvas.style.width = '' + W + 'px'
    canvas.style.height = '' + H + 'px'
    env.width = W
    env.height = H

    lab.mem.generateNoise(W, H)
}
