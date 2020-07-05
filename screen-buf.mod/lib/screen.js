const palette = [
    '#000000',
    '#f4f4f4',
    '#1a1c2c',
    '#5d275d',
    '#b13e53',
    '#ef7d57',
    '#ffcd75',
    '#a7f070',
    '#38b764',
    '#257179',
    '#29366f',
    '#3b5dc9',
    '#41a6f6',
    '#73eff7',
    '#94b0c2',
    '#566c86',
    '#333c57',
]

let color = '#000000'

const screen = {


    plot: function(x, y, ci) {
        let c = color
        if (isNumber(ci)) {
            c = palette[ci | 0] || color
        }
        ctx.fillStyle = c
        ctx.fillRect(x, y, 1, 1)
    },

    box: function(x, y, w, h, ci) {
        let c = color
        if (isNumber(ci)) {
            c = palette[ci | 0] || color
        }
        ctx.fillStyle = c
        ctx.fillRect(x, y, w, h)
    },
}
