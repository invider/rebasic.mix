function sync() {
    ctx.putImageData(lab.framebuffer, 0, 0)
}

function put(x, y, RGBA) {
    if (x < 0 || x >= env.width || y < 0 || y >= env.height) return
    let i = (y * env.width + x) * 4
    lab.pdata[i++] = RGBA[0]
    lab.pdata[i++] = RGBA[1]
    lab.pdata[i++] = RGBA[2]
    lab.pdata[i  ] = RGBA[3]
}
