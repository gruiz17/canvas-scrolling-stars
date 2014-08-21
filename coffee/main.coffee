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
# document.getElementById('message').innerHTML = "J -> Slow Down, K -> Speed Up"

window.starField = new StarField("CIRCLE", 1, 1.5, "UP", "#ffffff", 100)

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