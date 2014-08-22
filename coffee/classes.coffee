class Singleton
  @_instance: null
  @getInstance: ->
    @_instance or= new @( arguments... )

class StarField extends Singleton
  constructor: (type, radius, speed, direction, color, starCount, layers) ->
    @stars = []
    @type = type
    @speed = speed
    @direction = direction
    @color = color
    @starCount = starCount
    @layers = layers
    @layered = false

    if (speed < 1)
      throw new Error('Speed must be at least 1')
    else if (typeof direction == 'undefined') or (!(direction in ['UP', 'DOWN', 'LEFT', 'RIGHT']))
      throw new Error("Specify a direction from ['UP', 'DOWN', 'LEFT', 'RIGHT']")
    else if (!(type in ['CIRCLE']))
      console.log("enter one of these as first argument: ['CIRCLE']")
      throw new Error("didn't enter a valid type of star from ['CIRCLE']")
    else if (!(typeof layers == 'undefined'))
      @layered = true
      partitionSize = Math.floor(starCount/layers)
      smallLayerDivisor = bigLayerMultiplier = 3
      small = false
      multiplier = 1
      for i in [1..layers]
        if (layers == 1)
          @layered = false
          for j in [1..partitionSize]
            x = Math.floor((Math.random() * window.canvas.width) + 1);
            y = Math.floor((Math.random() * window.canvas.height) + 1);
            @stars.push(new CircleStar(radius, x, y, speed, direction, color, @stars))
        else
          @layered = true
          layerObject = {}
          layerObject.layerArray = []
          layerObject.first = false
          layerObject.small = small
          layerObject.ratio = multiplier
          if (i == 1)
            layerObject.first = true
            for j in [1..partitionSize]
              x = Math.floor((Math.random() * window.canvas.width) + 1);
              y = Math.floor((Math.random() * window.canvas.height) + 1);
              layerObject.layerArray.push(new CircleStar(radius, x, y, speed, direction, color, layerObject.layerArray))
          else if (i == layers)
            nearFinalStarCount = @stars.reduce((a,b) -> a + b)
            if (nearFinalStarCount + partitionSize < starCount)
              finalPartitionSize = starCount - nearFinalStarCount
              for j in [1..finalPartitionSize]
                x = Math.floor((Math.random() * window.canvas.width) + 1);
                y = Math.floor((Math.random() * window.canvas.height) + 1);
                if small
                  layerObject.layerArray.push(new CircleStar(radius/multiplier, x, y, speed/multiplier, direction, color, layerObject.layerArray))
                else
                  layerObject.layerArray.push(new CircleStar(radius * multiplier, x, y, speed * multiplier, direction, color, layerObject.layerArray))
            else
              for j in [1..partitionSize]
                x = Math.floor((Math.random() * window.canvas.width) + 1);
                y = Math.floor((Math.random() * window.canvas.height) + 1);
                if small
                  layerObject.layerArray.push(new CircleStar(radius/multiplier, x, y, speed/multiplier, direction, color, layerObject.layerArray))
                else
                  layerObject.layerArray.push(new CircleStar(radius * multiplier, x, y, speed * multiplier, direction, color, layerObject.layerArray))
          else
            for j in [1..partitionSize]
              x = Math.floor((Math.random() * window.canvas.width) + 1);
              y = Math.floor((Math.random() * window.canvas.height) + 1);
              if small
                layerObject.layerArray.push(new CircleStar(radius/multiplier, x, y, speed/multiplier, direction, color, layerObject.layerArray))
              else
                layerObject.layerArray.push(new CircleStar(radius * multiplier, x, y, speed * multiplier, direction, color, layerObject.layerArray))
          if small
            small = false
          else
            small = true
            multiplier *= 2
          @stars.push(layerObject)
    else
      for i in [1..starCount]
        x = Math.floor((Math.random() * window.canvas.width) + 1);
        y = Math.floor((Math.random() * window.canvas.height) + 1);
        @stars.push(new CircleStar(radius, x, y, speed, direction, color, @stars))

  # @determineType: (type) ->
  #   if (type == 'CIRCLE')
  #     return 'todo'

  draw: () ->
    if (@stars.length > 0)
      if (@layered == true)
        for layer in @stars
          star.draw() for star in layer.layerArray
      else
        star.draw() for star in @stars
    return

  moveStars: () ->
    if (@stars.length > 0)
      if (@layered == true)
        for layer in @stars
          star.move() for star in layer.layerArray
      else
        star.move() for star in @stars
    return

  setDirection: (direction) ->
    @direction = direction
    if (@stars.length > 0)
      if (@layered == true)
        for layer in @stars
          for star in layer.layerArray
            star.direction = direction
      else
        for star in @stars
          star.direction = direction
    return

  freeze: () ->
    if (@stars.length > 0)
      if (@layered == true)
        for layer in @stars
          for star in layer.layerArray
            star.speed = 0
      else
        for star in @stars
          star.speed = 0
    return

  resume: () ->
    @setSpeed(@speed)
    @setDirection(@direction)
    return

  setSpeed: (speed) ->
    if (@stars.length > 0)
      if (@layered == true)
        adjustedSpeed = speed
        if speed > 8
          adjustedSpeed = 8
        else if speed < 1
          adjustedSpeed = 1
        for i in [1..@layers]
          if (i == 1)
            for star in @stars[i-1].layerArray
              star.speed = adjustedSpeed
          else
            if (@stars[i-1].small)
              for star in @stars[i-1].layerArray
                star.speed = adjustedSpeed/@stars[i-1].ratio
            else
              for star in @stars[i-1].layerArray
                star.speed = adjustedSpeed * @stars[i-1].ratio
      else
        for star in @stars
          if speed > 8
            star.speed = @speed = 8
          else if speed < 1
            star.speed = @speed = 1
          else
            star.speed = @speed = speed
    return

  changeSpeed: (delta) ->
    if (@stars.length > 0)
      if (@layered == true)
        for i in [1..@layers]
          if (i == 1)
            if (@speed + delta <= 1)
              @speed = 1
            else if (@speed + delta >= 8)
              @speed = 8
            else
              @speed += delta
            for star in @stars[0].layerArray
              star.speed = @speed
          else
            if (@stars[i-1].small)
              for star in @stars[i-1].layerArray
                if @speed <= 1
                  star.speed = 1/@stars[i-1].ratio
                else if @speed >= 8
                  star.speed = 8/@stars[i-1].ratio
                else
                  star.speed += delta/@stars[i-1].ratio
            else
              for star in @stars[i-1].layerArray
                if @speed <= 1
                  star.speed = 1 * @stars[i-1].ratio
                else if @speed >= 8
                  star.speed = 8 * @stars[i-1].ratio
                else
                  star.speed += delta * @stars[i-1].ratio
      else
        for star in @stars
          star.speed += delta
          @speed += delta
          if star.speed < 1
            star.speed = @speed = 1
          else if star.speed > 8
            star.speed = @speed = 8
    return

  setColor: (color) ->
    @color = color
    if (@stars.length > 0)
      if (@layered)
        for layer in @stars
          for star in layer.layerArray
            star.color = color
      else
        for star in @stars
          star.color = color
    return

  setBg: (color) ->
    # todo: gotta do this too
    window.canvas.style.backgroundColor = color
    return

  clear: () ->
    if (@layered)
      for i in [i..@layers]
        layer = [] for layer in @stars
    else
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
