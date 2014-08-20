$ = jQuery

FPS = 100
window.canvas = document.getElementById('game')
window.rect = window.canvas.getBoundingClientRect()

window.canvas.width = window.canvas.height = 550

window.ctx = window.canvas.getContext('2d')

# window.GAME_START = false
# window.ROUND_START = false
# window.LIVES = 3
# window.LEVEL = 1

# window.movable = false

# document.getElementById('lifecount').innerHTML = window.LIVES
# document.getElementById('levelcount').innerHTML = window.LEVEL
document.getElementById('message').innerHTML = "Click to play!"

window.direction = 'LEFT'
window.starCount = 200

drawStars = (radius, direction, color) ->
  starArray = []
  for i in [1..window.starCount]
    x = Math.floor((Math.random() * window.canvas.width) + 1);
    y = Math.floor((Math.random() * window.canvas.height) + 1);
    starArray.push(new CircleStar(radius, x, y, "0", direction, color))
  return starArray

window.stars = drawStars(1, "LEFT", "#ffffff")

$('#game').click (e) ->

$('#gamebox').mousemove (e) ->

update = () ->
  return

draw = () ->
  window.ctx.clearRect(0, 0, 550, 550)
  star.draw() for star in window.stars
  return

gameLoop = () ->
  update()
  draw()
  return

setInterval(gameLoop, 1000/FPS)