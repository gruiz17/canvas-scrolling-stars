$ = jQuery

FPS = 100
window.canvas = document.getElementById('game')
window.rect = window.canvas.getBoundingClientRect()

window.canvas.width = window.canvas.height = 550

window.ctx = window.canvas.getContext('2d')

window.GAME_START = false
window.ROUND_START = false
window.LIVES = 3
window.LEVEL = 1

document.getElementById('lifecount').innerHTML = window.LIVES
document.getElementById('levelcount').innerHTML = window.LEVEL
document.getElementById('message').innerHTML = "Click to play!"

$('#game').click (e) ->

$('#gamebox').mousemove (e) ->

update() ->
  return
draw () ->
  window.ctx.clearRect(0, 0, 550, 550)
  return

gameLoop() ->
  update()
  draw()
  return

setInterval(gameLoop, 1000/FPS)