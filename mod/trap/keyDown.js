function keyDown(e) {
    if (e.ctrlKey) {
        switch(e.code) {
            case 'KeyC':
            case 'Backspace':
                lab.vm.stop()
                break
        }

    } else if (e.key.length === 1) {
        lab.ioCtrl.inputKey(e.key)
    } else {
        switch (e.code) {
            case 'Escape':
                lab.vm.stop()
                break

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

            case 'Home':
                lab.ioCtrl.home()
                break
            case 'ArrowLeft':
                lab.ioCtrl.left()
                break
            case 'ArrowRight':
                lab.ioCtrl.right()
                break
            case 'End':
                lab.ioCtrl.end()
                break
            case 'Delete':
                lab.ioCtrl.del()
                break
        }
    }
}
