function trimTail(buf) {
    if (buf && buf.length > 0 && buf[buf.length - 1] === '') {
        buf.pop()
        trimTail(buf)
    }
}

function register(brief) {
    if (!brief) return
    if (!lib.brief) lib.touch('brief')

    trimTail(brief.buf)
    brief.body = brief.buf.join('\n')
    lib.brief.attach(brief)
}

function brief(src, name, path) {
    const lines = src.split('\n')

    let brief
    lines.forEach(line => {
        const tline = line.trim()
        if (tline.startsWith('#')) return // comment line

        if (tline.length > 0) {
            if (tline.startsWith('>> ')) {
                // got a command definition
                const header = tline.substring(3).trim()
                const parts = header.split('-')
                if (parts.length === 2) {
                    const name = parts[0].trim()
                    const title = parts[1].trim()
                    register(brief)
                    brief = {
                        name:  name,
                        title: title,
                        buf:   [],
                    }
                } else {
                    log.err('expect topic definition: [' + line + ']')
                }
            } else {
                if (brief) {
                    brief.buf.push(line)
                } else {
                    log.err('ignoring: [' + line + ']')
                }
            }

        } else {
            if (brief) brief.buf.push(line)
        }
    })

    register(brief)
}
