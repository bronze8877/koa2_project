const cp = require('child_process')
const { resolve } = require('path')
;(async () => {

    let invoked = false
    let script = resolve(__dirname, '../crawer/trailer.js')
    let child = cp.fork(script, [])

    child.on('error', err => {
        if (invoked) return
        invoked = true

        console.log(err)
    })

    child.on('exit', code => {
        if (invoked) return
        invoked = false
        let err = code === 0 ? null : new Error('exit code ' + code)

        console.log(err ||  'exit')
    })

    child.on('message',  data => {
        console.log(data)
    })
})()