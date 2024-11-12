const io = {

    open: function() {},
    
    print: function(line) {
        let semi = false
        let comma = false

        for (let i = 0; i < arguments.length; i++) {
            let val = arguments[i]
            if (val === undefined) val = ''

            if (typeof val === 'object') {
                if (val.semi) {
                    semi = true
                } else if (val.comma) {
                    comma = true
                }
            } else {
                if (i > 0 && comma) lab.textmode.outc(' ')
                lab.textmode.printout('' + val)
                semi = false
                comma = false
            }
        }
        if (comma) lab.textmode.outc(' ')
        if (!semi && !comma) lab.textmode.outc('\n')
    },

    input: function() {
        // print out
        for (let i = 0; i < arguments.length; i++) {
            const v = arguments[i]

            if (typeof v === 'object' && v.id) {
                this.inputTarget = v
            } else {
                lab.textmode.printout('' + v + ' ')
                //process.stdout.write('' + v + ' ')
            }
        }
        this.waitForInput()
    },

    cls: function() {
        lab.textmode.clear()
        this.command.paper()
    },

    clt: function() {
        lab.textmode.clear()
    },

    htab: function(x) {
        lab.textmode.htab(x)
    },

    vtab: function(y) {
        lab.textmode.vtab(y)
    },

    rom: function() {
        const vm = this
        vm.command.print('=== ROM EXAMPLES ===')
        Object.keys(lib.rom._dir).forEach(key => {
            vm.command.print(key + ' ', { semi: true })
        })
        vm.command.print('')
    },

    close: function() {},
}

io.print.usage = '(val1),(val2);(val3);...'
io.print.man = 'print out\n'
       + '    the list of values,\n'
       + '    a space is used when separated by [,],\n'
       + '    nothing is used when separated by [;],\n'
       + '    skip the new line when ended by [;],\n'
       + '    [print] with no arguments prints a new line'


io.cls.man = 'clear the screen'
io.home = io.cls

io.clt.man = 'clear the text buffer'

io.rom.man = 'list examples from rom'

io.htab.man = 'set horizontal cursor position'
io.vtab.man = 'set vertical cursor position'

io.close.service = true // hide from help
