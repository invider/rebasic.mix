function draw() {
    const w = env.width
    const h = env.height

    fill(env.tune.background)
    rect(0, 0, w, h)

    lineWidth(1)
    stroke(.5, .5, .5)


    rect(0, 0, w, h)
    line(0, 0, w, h)
    line(w, 0, 0, h)
}
