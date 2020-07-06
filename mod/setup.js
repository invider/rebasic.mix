function setupVM() {
    const vm = mod.rebasic.arch.vm()
    vm.lexFromSource = mod.rebasic.arch.lex
    vm.parse = mod.rebasic.arch.parser
            
    const core = mod.rebasic.lib.core
    for (let n in core) vm.defineCmd(n, core[n])

    const func = mod.rebasic.lib.func
    for (let n in func) vm.defineFun(n, func[n])

    const io = lib.sub.io
    for (let n in io) vm.defineCmd(n, io[n])

    const sys = lib.sub.sys
    for (let n in sys) vm.defineCmd(n, sys[n])

    const math = mod.rebasic.lib.math
    for (let n in math.fn) vm.defineFun(n, math.fn[n])
    for (let n in math.scope) vm.assign(n, math.scope[n])

    const str = mod.rebasic.lib.str
    for (let n in str) vm.defineFun(n, str[n])

    // graphics
    const screen = mod['screen-buf'].lib.screen
    for (let n in screen) vm.defineCmd(n, screen[n])

    // specific hooks to handle stdin/out
    vm.command.open() // open IO with io-specific procedure

    return vm
}

function repl() {
    const vm = setupVM()
    lab.attach(vm, 'vm')
    vm.repl()
}

function setup() {
    const buf = mod['screen-buf']
    lab.render.vram = buf.ctx.canvas
    buf.env.link(env.tune)

    mod['screen-buf'].lab.mem.clean()
    repl()

    if (window.location.hash) {
        trap('hash', window.location.hash)
    }
}
