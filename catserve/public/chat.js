let ws = null

$(function () {
  if (window.username) {
    startChat()
  }
})

function startChat () {
  ws = adonis.Ws().connect()

  ws.on('open', () => {
    $('.connection-status').addClass('connected')
    subscribeToChannel()
  })

  ws.on('error', () => {
    $('.connection-status').removeClass('connected')
  })
}

function subscribeToChannel () {
    const chat = ws.subscribe('chat')
  
    chat.on('error', () => {
      $('.connection-status').removeClass('connected')
    })
  
    chat.on('message', (message) => {
      console.log(message)
      $('.messages').append(`
        <div class="message"><h3> ${message.username} </h3> <p> ${message.message} </p> </div>
      `)
    })
    chat.on ('close',()=> {
      ws.getSubscription('chat').emit('message', {
        username: 'server',
        message: window.username + " ออกจากห้องเเชท" 
      })

    })

    chat.on ('ready',()=> {
      ws.getSubscription('chat').emit('message', {
        username: 'server',
        message: window.username + "ได้เข้าห้องเเชท" 
      })
    })

    chat.on ('id', (event) => {
      console.log("Line 51 ",event)
    }) 
  }

  $('#message').keyup(function (e) {
    if (e.which === 13) {
      e.preventDefault()
  
      const message = $(this).val()
      $(this).val('')

  
      ws.getSubscription('chat').emit('message', {
        username: window.username,
        message: message
      })
      return
    }
  })