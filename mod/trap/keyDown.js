function keyDown(e) {
    if (e.ctrlKey) {
        switch(e.code) {
            case 'KeyC':
            case 'Backspace':
                if (!lab.vm.interrupted) {
                    lab.vm.interrupt(false)
                    lab.vm.command.print('...interrupted')
                }
        }

    } else if (e.code === 'Enter') {
        lab.ioCtrl.enter()

    } else if (e.code === 'Backspace') {
        lab.ioCtrl.backspace()

    } else if (e.key.length === 1) {
        lab.ioCtrl.inputKey(e.key)
    } 
}
