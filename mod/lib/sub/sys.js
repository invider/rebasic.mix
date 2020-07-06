module.exports = {
    load: function load(name) {
        if (name) {
            // look up in ROM
            const src = lib.rom[name]
            if (src) {
                this.loadSource(src)
            } else {
                this.command.print(`can't find [${name}]`)
            }

        } else {
            let input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'text/bas')
            input.setAttribute('onchange', "$.lib.util.loadSourceFile(event)")
            input.click()
        }
    },

    save: function save(name) {
        name = name || 'source.bas'
        name = name.toLowerCase()
        if (name.indexOf('.') < 0) name += '.bas'

        const source = lab.vm.source()

        const a = document.createElement('a')
        a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(source)
        a.download = name
        a.click()
    }
}
