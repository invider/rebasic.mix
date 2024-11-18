function register(page) {
    if (!page) return
    if (!lib.page) lib.touch('page')

    //trimTail(brief.buf)
    //brief.body = brief.buf.join('\n')
    lib.page.attach(page)
}

function page(src, name, path) {
    log('!!! ' + src)
}
