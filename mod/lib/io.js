const io = {

    open: function() {},
    
    prn: function(line) {
        lab.textmode.printout(line)
    },

    print: function(line) {
        for (let i = 0; i < arguments.length; i++) {
            if (i > 0) lab.textmode.outc(' ')
            lab.textmode.printout(arguments[i])
        }
        lab.textmode.outc('\n')
    },

    input: function() {
        // print out
        for (let i = 0; i < arguments.length; i++) {
            const v = arguments[i]

            if (typeof v === 'object' && v.id) {
                this.inputTarget = v.id
                this.assign(v.id, 'waiting for values')
            } else {
                this.command.prn('' + v + ' ')
                //process.stdout.write('' + v + ' ')
            }
        }
        this.interrupted = true
    },

    cls: function() {
        lab.textmode.clear()
    },

    close: function() {},
}
