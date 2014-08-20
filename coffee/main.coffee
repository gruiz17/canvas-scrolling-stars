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

drawStars = (type, radius, speed, direction, color, starCount) ->
  starArray = []
  if (type == "CIRCLE")
    for i in [1..starCount]
      x = Math.floor((Math.random() * window.canvas.width) + 1);
      y = Math.floor((Math.random() * window.canvas.height) + 1);
      starArray.push(new CircleStar(radius, x, y, speed, direction, color, starArray))
  else
    console.log("enter one of these as first argument: ['CIRCLE']")
    return
  return starArray

window.stars = drawStars("CIRCLE", 1, 1.5, "UP", "#ffffff", 200)

$('#game').click (e) ->

$('#game').attr('tabindex', '0').keydown (e) ->
  # document.getElementById('message').innerHTML = e.keyCode
  console.log(e.keyCode)
  if ( e.keyCode == 87 )
    for star in window.stars
      star.direction = "UP"

  if ( e.keyCode == 83 )
    for star in window.stars
      star.direction = "DOWN"

  if ( e.keyCode == 65 )
    for star in window.stars
      star.direction = "LEFT"

  if ( e.keyCode == 68 )
    for star in window.stars
      star.direction = "RIGHT"

  if ( e.keyCode == 74 )
    for star in window.stars
      if star.speed > 1
        star.speed -= 1

  if ( e.keyCode == 75 )
    for star in window.stars
      if star.speed < 7
        star.speed += 1

$('#gamebox').mousemove (e) ->

update = () ->
  star.move() for star in window.stars
  return

draw = () ->
  window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height)
  star.draw() for star in window.stars
  return

gameLoop = () ->
  update()
  draw()
  return

setInterval(gameLoop, 1000/FPS)