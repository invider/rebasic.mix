const palette = [


    //'#000000', // black
    //'#dc322f', // red
]

const colors = {

    'yellow':   '#b58900', // solar
    'orange':   '#cb4b16', // solar
    'purple':   '#5d275d',
    'red':      '#e9362b', // solar
    'magenta':  '#d33682', // solar

    'dark blue': '#29366f', // dark blue
    'violet':   '#6c71c4', // solar
    'some blue': '#3b5dc9', // blue
    'blue':     '#268bd2', // solar
    'sky':      '#41a6f6', // sky
    'not-cyan': '#73eff7', // cyan

    'deep-teal': '#002b36', // base 03
    'base-teal': '#073642', // base 02
    'ocean':     '#257179', // darker teal
    'teal':      '#2aa198', // solar - cyan

    'green':    '#859900', // solar
    'grass':    '#38b764', // green
    'salad':    '#a7f070', // salad

    'base01':   '#586e75', // base 01
    'base00':   '#657b83', // base 00
    'base0':    '#839496', // base 0
    'base1':    '#93a1a1', // base 1
    'metal':    '#94b0c2', // metal
    'dark-metal': '#566c86', // dark metal
    'gray-blue':  '#333c57', // grayish blue
    'bluisn-black': '#1a1c2c', // bluish black
    'black':    '#252527',
    'white':    '#fdf6e3', // base 3
    'pale-mocca':  '#eee8d5', // base 2 - pale mocca
    'pale-yellow': '#d1cf94', // pale yellow paper
    'brown':    '#d98148',
    'dark-orange': '#ef7d57', // orange
    'dark-red': '#b13e53', // red
    'bright-yellow': '#ffcd75', // yellow

    'gray':     '#808080',
}

Object.values(colors).forEach(c => palette.push(c))

function mapColor(ci) {
    let c = color
    if (isNumber(ci)) {
        c = palette[ci | 0] || color
        color = c
    } else if (isString(ci)) {
        if (ci.startsWith('#')) {
            c = ci
        } else {
            const cn = colors[ci]
            if (cn) c = ci
        }
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
