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
                this.inputTarget = v.id
                this.assign(v.id, 'waiting for values')
            } else {
                lab.textmode.printout('' + v + ' ')
                //process.stdout.write('' + v + ' ')
            }
        }
        this.waitForInput()
    },

    cls: function() {
        lab.textmode.clear()
    },

    rom: function() {
        const vm = this
        vm.command.print('=== ROM EXAMPLES ===')
        Object.keys(lib.rom._dir).forEach(key => {
            vm.command.print(key)
        })
    },

    close: function() {},
}

io.rom.man = 'list examples from rom'
