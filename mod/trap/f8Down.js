let shots = 0

function f8Down(e) {
    if (e.repeat) return
    lib.img.screenshot('rebasic-' + (++shots))
}
