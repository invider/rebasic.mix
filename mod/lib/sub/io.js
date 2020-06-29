const io = {

    open: function() {},
    
    /*
    prn: function(line) {
        lab.textmode.printout(line)
    },
    */

    print: function(line) {
        let comma = true
        for (let i = 0; i < arguments.length; i++) {
            let val = arguments[i]
            if (val === undefined) val = ''

            if (typeof val === 'object' && val.semi) {
                comma = false

            } else {
                if (i > 0 && comma) lab.textmode.outc(' ')
                lab.textmode.printout(val)
                comma = true
            }
        }
        if (comma) lab.textmode.outc('\n')
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
        this.interrupt(true)
    },

    cls: function() {
        lab.textmode.clear()
    },

    close: function() {},
}
