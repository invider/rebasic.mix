const palette = [
    '#000000', // black
    '#f4f4f4', // almost white
    '#1a1c2c', // bluish black
    '#5d275d', // purple
    '#b13e53', // red
    '#ef7d57', // orange
    '#ffcd75', // yellow
    '#d1cf94', // pale yellow paper
    '#a7f070', // salad
    '#38b764', // green
    '#257179', // teal
    '#29366f', // dark blue
    '#3b5dc9', // blue
    '#41a6f6', // sky
    '#73eff7', // cyan
    '#94b0c2', // metal
    '#566c86', // dark metal
    '#333c57', // grayish blue
    '#252527', // dark face
]

function mapColor(ci) {
    let c = color
    if (isNumber(ci)) {
        c = palette[ci | 0] || color
        color = c
    } else if (isString(ci) && ci.startsWith('#')) {
        c = ci
        color = c
    }
    return c
}

let color = '#000000'

const screen = {

    background: function(ci) {
        let c = mapColor(ci)
        ctx.fillStyle = c
        ctx.fillRect(0, 0, rx(1), ry(1))
    },

    face: function(ci) {
        let c = mapColor(ci)
        env.tune.face = c
    },

    plot: function(x, y, ci) {
        let c = mapColor(ci)
        ctx.fillStyle = c
        ctx.fillRect(x, y, 1, 1)
    },

    box: function(x, y, w, h, ci) {
        let c = mapColor(ci)
        ctx.fillStyle = c
        ctx.fillRect(x, y, w, h)
    },

}
