class CircleStar
  constructor: (radius, centerX, centerY, speed, direction, color, parentArray) ->
    @radius = radius
    @centerX = centerX
    @centerY = centerY
    @speed = speed
    @direction = direction
    @color = color
    @destroyed = false
    @parentArray = parentArray

  draw: ->
    window.ctx.fillStyle = @color
    window.ctx.strokeStyle = @color
    window.ctx.beginPath()
    window.ctx.arc(@centerX, @centerY, @radius, 0, 2 * Math.PI, false)
    window.ctx.fill()
    window.ctx.stroke()
    if (@destroyed)
      @destroy()

  move: ->
    if (@direction == "LEFT")
      @centerX -= @speed
    else if (@direction == "RIGHT")
      @centerX += @speed
    else if (@direction == "UP")
      @centerY -= @speed
    else if (@direction == "DOWN")
      @centerY += @speed
    if (@centerX < 0 or @centerX > window.canvas.width or @centerY < 0 or @centerY > window.canvas.height)
      @destroyed = true

  destroy: ->
    newX = 0
    newY = 0
    if (@direction == "LEFT")
      newX = window.canvas.width
      newY = Math.floor((Math.random() * window.canvas.height) + 1);
    else if (@direction == "RIGHT")
      newY = Math.floor((Math.random() * window.canvas.height) + 1);
    else if (@direction == "UP")
      newX = Math.floor((Math.random() * window.canvas.width) + 1);
      newY = window.canvas.height
    else if (@direction == "DOWN")
      newX = Math.floor((Math.random() * window.canvas.width) + 1);

    @parentArray.push(new CircleStar(@radius, newX, newY, @speed, @direction, @color, @parentArray))

    index = @parentArray.indexOf(this)
    @parentArray.splice(index, 1)
