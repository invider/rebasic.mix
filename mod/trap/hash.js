function hash(str) {
    setTimeout(() => {
        lab.vm.exec('load "' + str.substring(1) + '"')
        lab.vm.exec('run')
    }, 100)
}
