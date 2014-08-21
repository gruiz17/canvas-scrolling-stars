// Generated by CoffeeScript 1.7.1
(function() {
  var $, CircleStar, FPS, StarField, draw, gameLoop, update;

  StarField = (function() {
    function StarField(type, radius, speed, direction, color, starCount) {
      var i, x, y, _i;
      this.stars = [];
      this.type = type;
      this.speed = speed;
      this.direction = direction;
      this.color = color;
      if (speed < 1) {
        throw new Error('Speed must be at least 1');
      } else if ((typeof direction === 'undefined') || (!(direction === 'UP' || direction === 'DOWN' || direction === 'LEFT' || direction === 'RIGHT'))) {
        throw new Error("Specify a direction from ['UP', 'DOWN', 'LEFT', 'RIGHT']");
      } else if (!(type === 'CIRCLE')) {
        console.log("enter one of these as first argument: ['CIRCLE']");
        throw new Error("didn't enter a valid type of star from ['CIRCLE']");
      } else {
        for (i = _i = 1; 1 <= starCount ? _i <= starCount : _i >= starCount; i = 1 <= starCount ? ++_i : --_i) {
          x = Math.floor((Math.random() * window.canvas.width) + 1);
          y = Math.floor((Math.random() * window.canvas.height) + 1);
          this.stars.push(new CircleStar(radius, x, y, speed, direction, color, this.stars));
        }
      }
    }

    StarField.prototype.draw = function() {
      var star, _i, _len, _ref;
      if (this.stars.length > 0) {
        _ref = this.stars;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          star = _ref[_i];
          star.draw();
        }
      }
    };

    StarField.prototype.moveStars = function() {
      var star, _i, _len, _ref;
      if (this.stars.length > 0) {
        _ref = this.stars;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          star = _ref[_i];
          star.move();
        }
      }
    };

    StarField.prototype.setDirection = function(direction) {
      var star, _i, _len, _ref;
      if (this.stars.length > 0) {
        _ref = this.stars;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          star = _ref[_i];
          star.direction = this.direction = direction;
        }
      }
    };

    StarField.prototype.freeze = function() {
      var star, _i, _len, _ref;
      if (this.stars.length > 0) {
        _ref = this.stars;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          star = _ref[_i];
          star.speed = 0;
        }
      }
    };

    StarField.prototype.resume = function() {
      this.setSpeed(this.speed);
      this.setDirection(this.direction);
    };

    StarField.prototype.setSpeed = function(speed) {
      var star, _i, _len, _ref;
      if (this.stars.length > 0) {
        _ref = this.stars;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          star = _ref[_i];
          if (speed > 8) {
            star.speed = this.speed = 8;
          } else if (speed < 1) {
            star.speed = this.speed = 1;
          } else {
            star.speed = this.speed = speed;
          }
        }
      }
    };

    StarField.prototype.changeSpeed = function(delta) {
      var star, _i, _len, _ref;
      if (this.stars.length > 0) {
        _ref = this.stars;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          star = _ref[_i];
          star.speed += delta;
          this.speed += delta;
          if (star.speed < 1) {
            star.speed = this.speed = 1;
          } else if (star.speed > 8) {
            star.speed = this.speed = 8;
          }
        }
      }
    };

    StarField.prototype.setColor = function(randomize, color) {
      var star, _i, _len, _ref;
      if (!randomize) {
        if (this.stars.length > 0) {
          _ref = this.stars;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            star = _ref[_i];
            star.color = this.color = color;
          }
        }
      } else {
        return;
      }
    };

    StarField.prototype.destroy = function() {
      this.stars = [];
    };

    return StarField;

  })();

  CircleStar = (function() {
    function CircleStar(radius, centerX, centerY, speed, direction, color, parentArray) {
      this.radius = radius;
      this.centerX = centerX;
      this.centerY = centerY;
      this.speed = speed;
      this.direction = direction;
      this.color = color;
      this.destroyed = false;
      this.parentArray = parentArray;
    }

    CircleStar.prototype.draw = function() {
      window.ctx.fillStyle = this.color;
      window.ctx.strokeStyle = this.color;
      window.ctx.beginPath();
      window.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
      window.ctx.fill();
      window.ctx.stroke();
      if (this.destroyed) {
        return this.destroy();
      }
    };

    CircleStar.prototype.move = function() {
      if (this.direction === "LEFT") {
        this.centerX -= this.speed;
      } else if (this.direction === "RIGHT") {
        this.centerX += this.speed;
      } else if (this.direction === "UP") {
        this.centerY -= this.speed;
      } else if (this.direction === "DOWN") {
        this.centerY += this.speed;
      }
      if (this.centerX < 0 || this.centerX > window.canvas.width || this.centerY < 0 || this.centerY > window.canvas.height) {
        return this.destroyed = true;
      }
    };

    CircleStar.prototype.destroy = function() {
      var index, newX, newY;
      newX = 0;
      newY = 0;
      if (this.direction === "LEFT") {
        newX = window.canvas.width;
        newY = Math.floor((Math.random() * window.canvas.height) + 1);
      } else if (this.direction === "RIGHT") {
        newY = Math.floor((Math.random() * window.canvas.height) + 1);
      } else if (this.direction === "UP") {
        newX = Math.floor((Math.random() * window.canvas.width) + 1);
        newY = window.canvas.height;
      } else if (this.direction === "DOWN") {
        newX = Math.floor((Math.random() * window.canvas.width) + 1);
      }
      this.parentArray.push(new CircleStar(this.radius, newX, newY, this.speed, this.direction, this.color, this.parentArray));
      index = this.parentArray.indexOf(this);
      return this.parentArray.splice(index, 1);
    };

    return CircleStar;

  })();

  $ = jQuery;

  FPS = 100;

  window.canvas = document.getElementById('game');

  window.rect = window.canvas.getBoundingClientRect();

  window.canvas.width = window.canvas.height = 570;

  window.ctx = window.canvas.getContext('2d');

  window.starField = new StarField("CIRCLE", 1, 1.5, "UP", "#ffffff", 200);

  $('#game').click(function(e) {});

  $('#game').attr('tabindex', '0').keydown(function(e) {
    console.log(e.keyCode);
    if (e.keyCode === 87) {
      window.starField.setDirection("UP");
    }
    if (e.keyCode === 83) {
      window.starField.setDirection("DOWN");
    }
    if (e.keyCode === 65) {
      window.starField.setDirection("LEFT");
    }
    if (e.keyCode === 68) {
      window.starField.setDirection("RIGHT");
    }
    if (e.keyCode === 81) {
      window.starField.freeze();
    }
    if (e.keyCode === 69) {
      window.starField.resume();
    }
    if (e.keyCode === 74) {
      window.starField.changeSpeed(-1);
    }
    if (e.keyCode === 75) {
      return window.starField.changeSpeed(1);
    }
  });

  $('#gamebox').mousemove(function(e) {});

  update = function() {
    window.starField.moveStars();
  };

  draw = function() {
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    window.starField.draw();
  };

  gameLoop = function() {
    update();
    draw();
  };

  setInterval(gameLoop, 1000 / FPS);

}).call(this);
