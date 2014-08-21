class StarField
  constructor: (type, radius, speed, direction, color, starCount) ->
    @stars = []
    if (type == "CIRCLE")
      for i in [1..starCount]
        x = Math.floor((Math.random() * window.canvas.width) + 1);
        y = Math.floor((Math.random() * window.canvas.height) + 1);
        @stars.push(new CircleStar(radius, x, y, speed, direction, color, @stars))
    else
      console.log("enter one of these as first argument: ['CIRCLE']")
      throw new Error("didn't enter a valid type of star")

  draw: () ->
    if (@stars.length > 0)
      star.draw() for star in @stars
    return

  moveStars: () ->
    if (@stars.length > 0)
      star.move() for star in @stars
    return

  setDirection: (direction) ->
    if (@stars.length > 0)
      for star in @stars
        star.direction = direction
    return

  setSpeed: (speed) ->
    if (@stars.length > 0)
      for star in @stars
        if speed > 8
          star.speed = 8
        else if speed < 1
          star.speed = 1
        else
          star.speed = speed
    return

  changeSpeed: (delta) ->
    if (@stars.length > 0)
      for star in @stars
        star.speed += delta
        if star.speed < 1
          star.speed = 1
        else if star.speed > 8
          star.speed = 8
    return

  setColor: (randomize, color) ->
    if (!randomize)
      if (@stars.length > 0)
        for star in @stars
          star.color = color
    else
      # todo: more advanced randomization for user
      return
    return

  destroy: () ->
    @stars = []
    return


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
