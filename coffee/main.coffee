$ = jQuery

FPS = 100
window.canvas = document.getElementById('game')
window.rect = window.canvas.getBoundingClientRect()

window.canvas.width = window.canvas.height = 570

window.ctx = window.canvas.getContext('2d')

# window.GAME_START = false
# window.ROUND_START = false
# window.LIVES = 3
# window.LEVEL = 1

# window.movable = false

# document.getElementById('lifecount').innerHTML = window.LIVES
# document.getElementById('levelcount').innerHTML = window.LEVEL
document.getElementById('message').innerHTML = "J -> Slow Down, K -> Speed Up"

window.starField = new StarField("CIRCLE", 1, 1.5, "UP", "#ffffff", 200)

$('#game').click (e) ->

$('#game').attr('tabindex', '0').keydown (e) ->
  # document.getElementById('message').innerHTML = e.keyCode
  console.log(e.keyCode)
  if ( e.keyCode == 87 )
    window.starField.setDirection("UP")

  if ( e.keyCode == 83 )
    window.starField.setDirection("DOWN")

  if ( e.keyCode == 65 )
    window.starField.setDirection("LEFT")

  if ( e.keyCode == 68 )
    window.starField.setDirection("RIGHT")

  if ( e.keyCode == 81 )
    window.starField.freeze()

  if ( e.keyCode == 69 )
    window.starField.resume()

  if ( e.keyCode == 74 )
    window.starField.changeSpeed(-1)

  if ( e.keyCode == 75 )
    window.starField.changeSpeed(1)

$('#gamebox').mousemove (e) ->

update = () ->
  window.starField.moveStars()
  return

draw = () ->
  window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height)
  window.starField.draw()
  return

gameLoop = () ->
  update()
  draw()
  return

setInterval(gameLoop, 1000/FPS)