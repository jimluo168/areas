import EventEmitter from 'events'

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter()

myEmitter.on('event', async (body) => {

  console.log(`${JSON.stringify(body)}`)
})


myEmitter.emit('event', {
  code: 200,
  data: 'hello world.',
  success: true
})
