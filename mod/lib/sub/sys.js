module.exports = {

    load: function load(name) {
        if (name) {
            name = name.toLowerCase()
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
    },

    help: function help(name) {
        const vm = this

        // normalize possible ReBasic id object
        if (name && typeof name === 'object') {
            name = name.id
        }

        if (name) {
            const fn = vm.command[name] || vm.fun[name]
            if (!fn) {
                vm.command.print(name + ' - unknown command')
            } else {
                let def = name
                if (fn.usage) def += ' ' + fn.usage
                if (fn.man) def += ' - ' + fn.man
                vm.command.print(def)
            }

        } else {
            const ls = []
            Object.keys(vm.command).forEach((cmd, i) => {
                if (cmd.startsWith('_')) return
                const obj = vm.command[cmd]
                if (typeof obj !== 'function' || obj.service) return
                ls.push(cmd)
                //vm.command.print(prefix + cmd, { semi: true })
            })
            Object.keys(vm.fun).forEach((fn, i) => {
                if (fn.startsWith('_')) return
                const obj = vm.fun[fn]
                if (typeof obj !== 'function' || obj.service) return
                ls.push(fn + '()')
                //vm.command.print(fn + '() ', { semi: true })
            })
            for (let i = 0; i < ls.length; i++) {
                const name = ls[i]
                const prefix = i > 0? ' * ' : ''
                vm.command.print(prefix + name, { semi: true })
            }
            vm.command.print('')
        }

    }
}
