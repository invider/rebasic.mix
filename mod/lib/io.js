const io = {

    open: function() {},
    
    prn: function() {
    },

    print: function(str) {
        lab.textmode.println(str)
    },

    input: function(then) {
        log('input::')
        lab.ioCtrl.acceptInput(then)
    },

    cls: function() {
        lab.textmode.clear()
    },

    close: function() {},
}
