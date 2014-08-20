class CircleStar
  constructor: (radius, centerX, centerY, speed, direction, color) ->
    @radius = radius
    @centerX = centerX
    @centerY = centerY
    @speed = speed
    @direction = direction
    @color = color

  draw: ->
    window.ctx.fillStyle = @color
    window.ctx.strokeStyle = @color
    window.ctx.beginPath()
    window.ctx.arc(@centerX, @centerY, @radius, 0, 2 * Math.PI, false)
    window.ctx.fill()
    window.ctx.stroke()