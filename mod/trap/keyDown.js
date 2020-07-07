function keyDown(e) {
    if (e.ctrlKey) {
        switch(e.code) {
            case 'KeyC':
            case 'Backspace':
                if (!lab.vm.interrupted
                        || lab.vm.resumeOnInput) {
                    lab.vm.interrupt(false)
                    lab.vm.command.print('...interrupted')
                }
        }

    } else if (e.key.length === 1) {
        lab.ioCtrl.inputKey(e.key)
    } else {
        switch (e.code) {
            case 'Enter':
                lab.ioCtrl.enter()
                break
            case 'Backspace':
                lab.ioCtrl.backspace()
                break
            case 'ArrowUp':
                lab.ioCtrl.prev()
                break

            case 'ArrowDown':
                lab.ioCtrl.next()
                break
        }
    }
}
