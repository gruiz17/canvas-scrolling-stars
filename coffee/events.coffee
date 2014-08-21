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