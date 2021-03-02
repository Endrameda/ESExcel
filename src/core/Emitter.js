export class Emitter {
    constructor() {
        this.listeners = {}
    }

    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }

        this.listeners[event].forEach(listener => {
            listener(...args)
        })

        return true
    }

    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

// Example, testing emitter
// const emitter = new Emitter()
//
// const unsubscribe = emitter.subscribe('asd', info => console.log(info))
// emitter.emit('asd', 123)
//
// setTimeout(() => {
//     emitter.emit('asd', 'After 2 seconds')
// }, 2000)
//
// setTimeout(() => {
//     unsubscribe()
// }, 2000)
//
// setTimeout(() => {
//     emitter.emit('asd', 'After 4 seconds')
// }, 4000)
