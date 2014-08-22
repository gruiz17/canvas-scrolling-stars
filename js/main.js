// Generated by CoffeeScript 1.7.1
(function() {
  var $, CircleStar, FPS, Singleton, StarField, draw, gameLoop, invert, update,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Singleton = (function() {
    function Singleton() {}

    Singleton._instance = null;

    Singleton.getInstance = function() {
      return this._instance || (this._instance = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(this, arguments, function(){}));
    };

    return Singleton;

  })();

  StarField = (function(_super) {
    __extends(StarField, _super);

    function StarField(type, radius, speed, direction, color, starCount, layers) {
      var bigLayerMultiplier, finalPartitionSize, i, j, layerObject, multiplier, nearFinalStarCount, partitionSize, small, smallLayerDivisor, x, y, _i, _j, _k, _l, _m, _n, _o;
      this.stars = [];
      this.type = type;
      this.speed = speed;
      this.direction = direction;
      this.color = color;
      this.starCount = starCount;
      this.layers = layers;
      this.layered = false;
      if (speed < 1) {
        throw new Error('Speed must be at least 1');
      } else if ((typeof direction === 'undefined') || (!(direction === 'UP' || direction === 'DOWN' || direction === 'LEFT' || direction === 'RIGHT'))) {
        throw new Error("Specify a direction from ['UP', 'DOWN', 'LEFT', 'RIGHT']");
      } else if (!(type === 'CIRCLE')) {
        console.log("enter one of these as first argument: ['CIRCLE']");
        throw new Error("didn't enter a valid type of star from ['CIRCLE']");
      } else if (!(typeof layers === 'undefined')) {
        this.layered = true;
        partitionSize = Math.floor(starCount / layers);
        smallLayerDivisor = bigLayerMultiplier = 3;
        small = false;
        multiplier = 1;
        for (i = _i = 1; 1 <= layers ? _i <= layers : _i >= layers; i = 1 <= layers ? ++_i : --_i) {
          if (layers === 1) {
            this.layered = false;
            for (j = _j = 1; 1 <= partitionSize ? _j <= partitionSize : _j >= partitionSize; j = 1 <= partitionSize ? ++_j : --_j) {
              x = Math.floor((Math.random() * window.canvas.width) + 1);
              y = Math.floor((Math.random() * window.canvas.height) + 1);
              this.stars.push(new CircleStar(radius, x, y, speed, direction, color, this.stars));
            }
          } else {
            this.layered = true;
            layerObject = {};
            layerObject.layerArray = [];
            layerObject.first = false;
            layerObject.small = small;
            layerObject.ratio = multiplier;
            if (i === 1) {
              layerObject.first = true;
              for (j = _k = 1; 1 <= partitionSize ? _k <= partitionSize : _k >= partitionSize; j = 1 <= partitionSize ? ++_k : --_k) {
                x = Math.floor((Math.random() * window.canvas.width) + 1);
                y = Math.floor((Math.random() * window.canvas.height) + 1);
                layerObject.layerArray.push(new CircleStar(radius, x, y, speed, direction, color, layerObject.layerArray));
              }
            } else if (i === layers) {
              nearFinalStarCount = this.stars.reduce(function(a, b) {
                return a + b;
              });
              if (nearFinalStarCount + partitionSize < starCount) {
                finalPartitionSize = starCount - nearFinalStarCount;
                for (j = _l = 1; 1 <= finalPartitionSize ? _l <= finalPartitionSize : _l >= finalPartitionSize; j = 1 <= finalPartitionSize ? ++_l : --_l) {
                  x = Math.floor((Math.random() * window.canvas.width) + 1);
                  y = Math.floor((Math.random() * window.canvas.height) + 1);
                  if (small) {
                    layerObject.layerArray.push(new CircleStar(radius / multiplier, x, y, speed / multiplier, direction, color, layerObject.layerArray));
                  } else {
                    layerObject.layerArray.push(new CircleStar(radius * multiplier, x, y, speed * multiplier, direction, color, layerObject.layerArray));
                  }
                }
              } else {
                for (j = _m = 1; 1 <= partitionSize ? _m <= partitionSize : _m >= partitionSize; j = 1 <= partitionSize ? ++_m : --_m) {
                  x = Math.floor((Math.random() * window.canvas.width) + 1);
                  y = Math.floor((Math.random() * window.canvas.height) + 1);
                  if (small) {
                    layerObject.layerArray.push(new CircleStar(radius / multiplier, x, y, speed / multiplier, direction, color, layerObject.layerArray));
                  } else {
                    layerObject.layerArray.push(new CircleStar(radius * multiplier, x, y, speed * multiplier, direction, color, layerObject.layerArray));
                  }
                }
              }
            } else {
              for (j = _n = 1; 1 <= partitionSize ? _n <= partitionSize : _n >= partitionSize; j = 1 <= partitionSize ? ++_n : --_n) {
                x = Math.floor((Math.random() * window.canvas.width) + 1);
                y = Math.floor((Math.random() * window.canvas.height) + 1);
                if (small) {
                  layerObject.layerArray.push(new CircleStar(radius / multiplier, x, y, speed / multiplier, direction, color, layerObject.layerArray));
                } else {
                  layerObject.layerArray.push(new CircleStar(radius * multiplier, x, y, speed * multiplier, direction, color, layerObject.layerArray));
                }
              }
            }
            if (small) {
              small = false;
            } else {
              small = true;
              multiplier *= 2;
            }
            this.stars.push(layerObject);
          }
        }
      } else {
        for (i = _o = 1; 1 <= starCount ? _o <= starCount : _o >= starCount; i = 1 <= starCount ? ++_o : --_o) {
          x = Math.floor((Math.random() * window.canvas.width) + 1);
          y = Math.floor((Math.random() * window.canvas.height) + 1);
          this.stars.push(new CircleStar(radius, x, y, speed, direction, color, this.stars));
        }
      }
    }

    StarField.prototype.draw = function() {
      var layer, star, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      if (this.stars.length > 0) {
        if (this.layered === true) {
          _ref = this.stars;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            layer = _ref[_i];
            _ref1 = layer.layerArray;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              star = _ref1[_j];
              star.draw();
            }
          }
        } else {
          _ref2 = this.stars;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            star = _ref2[_k];
            star.draw();
          }
        }
      }
    };

    StarField.prototype.moveStars = function() {
      var layer, star, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      if (this.stars.length > 0) {
        if (this.layered === true) {
          _ref = this.stars;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            layer = _ref[_i];
            _ref1 = layer.layerArray;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              star = _ref1[_j];
              star.move();
            }
          }
        } else {
          _ref2 = this.stars;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            star = _ref2[_k];
            star.move();
          }
        }
      }
    };

    StarField.prototype.setDirection = function(direction) {
      var layer, star, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      this.direction = direction;
      if (this.stars.length > 0) {
        if (this.layered === true) {
          _ref = this.stars;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            layer = _ref[_i];
            _ref1 = layer.layerArray;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              star = _ref1[_j];
              star.direction = direction;
            }
          }
        } else {
          _ref2 = this.stars;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            star = _ref2[_k];
            star.direction = direction;
          }
        }
      }
    };

    StarField.prototype.freeze = function() {
      var layer, star, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      if (this.stars.length > 0) {
        if (this.layered === true) {
          _ref = this.stars;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            layer = _ref[_i];
            _ref1 = layer.layerArray;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              star = _ref1[_j];
              star.speed = 0;
            }
          }
        } else {
          _ref2 = this.stars;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            star = _ref2[_k];
            star.speed = 0;
          }
        }
      }
    };

    StarField.prototype.resume = function() {
      this.setSpeed(this.speed);
      this.setDirection(this.direction);
    };

    StarField.prototype.setSpeed = function(speed) {
      var adjustedSpeed, i, star, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref, _ref1, _ref2, _ref3, _ref4;
      if (this.stars.length > 0) {
        if (this.layered === true) {
          adjustedSpeed = speed;
          if (speed > 8) {
            adjustedSpeed = 8;
          } else if (speed < 1) {
            adjustedSpeed = 1;
          }
          for (i = _i = 1, _ref = this.layers; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
            if (i === 1) {
              _ref1 = this.stars[i - 1].layerArray;
              for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
                star = _ref1[_j];
                star.speed = adjustedSpeed;
              }
            } else {
              if (this.stars[i - 1].small) {
                _ref2 = this.stars[i - 1].layerArray;
                for (_k = 0, _len1 = _ref2.length; _k < _len1; _k++) {
                  star = _ref2[_k];
                  star.speed = adjustedSpeed / this.stars[i - 1].ratio;
                }
              } else {
                _ref3 = this.stars[i - 1].layerArray;
                for (_l = 0, _len2 = _ref3.length; _l < _len2; _l++) {
                  star = _ref3[_l];
                  star.speed = adjustedSpeed * this.stars[i - 1].ratio;
                }
              }
            }
          }
        } else {
          _ref4 = this.stars;
          for (_m = 0, _len3 = _ref4.length; _m < _len3; _m++) {
            star = _ref4[_m];
            if (speed > 8) {
              star.speed = this.speed = 8;
            } else if (speed < 1) {
              star.speed = this.speed = 1;
            } else {
              star.speed = this.speed = speed;
            }
          }
        }
      }
    };

    StarField.prototype.changeSpeed = function(delta) {
      var i, star, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref, _ref1, _ref2, _ref3, _ref4;
      if (this.stars.length > 0) {
        if (this.layered === true) {
          for (i = _i = 1, _ref = this.layers; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
            if (i === 1) {
              if (this.speed + delta <= 1) {
                this.speed = 1;
              } else if (this.speed + delta >= 8) {
                this.speed = 8;
              } else {
                this.speed += delta;
              }
              _ref1 = this.stars[0].layerArray;
              for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
                star = _ref1[_j];
                star.speed = this.speed;
              }
            } else {
              if (this.stars[i - 1].small) {
                _ref2 = this.stars[i - 1].layerArray;
                for (_k = 0, _len1 = _ref2.length; _k < _len1; _k++) {
                  star = _ref2[_k];
                  if (this.speed <= 1) {
                    star.speed = 1 / this.stars[i - 1].ratio;
                  } else if (this.speed >= 8) {
                    star.speed = 8 / this.stars[i - 1].ratio;
                  } else {
                    star.speed += delta / this.stars[i - 1].ratio;
                  }
                }
              } else {
                _ref3 = this.stars[i - 1].layerArray;
                for (_l = 0, _len2 = _ref3.length; _l < _len2; _l++) {
                  star = _ref3[_l];
                  if (this.speed <= 1) {
                    star.speed = 1 * this.stars[i - 1].ratio;
                  } else if (this.speed >= 8) {
                    star.speed = 8 * this.stars[i - 1].ratio;
                  } else {
                    star.speed += delta * this.stars[i - 1].ratio;
                  }
                }
              }
            }
          }
        } else {
          _ref4 = this.stars;
          for (_m = 0, _len3 = _ref4.length; _m < _len3; _m++) {
            star = _ref4[_m];
            star.speed += delta;
            this.speed += delta;
            if (star.speed < 1) {
              star.speed = this.speed = 1;
            } else if (star.speed > 8) {
              star.speed = this.speed = 8;
            }
          }
        }
      }
    };

    StarField.prototype.setColor = function(color) {
      var layer, star, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      this.color = color;
      if (this.stars.length > 0) {
        if (this.layered) {
          _ref = this.stars;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            layer = _ref[_i];
            _ref1 = layer.layerArray;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              star = _ref1[_j];
              star.color = color;
            }
          }
        } else {
          _ref2 = this.stars;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            star = _ref2[_k];
            star.color = color;
          }
        }
      }
    };

    StarField.prototype.setBg = function(color) {
      window.canvas.style.backgroundColor = color;
    };

    StarField.prototype.clear = function() {
      var i, layer, _i, _j, _len, _ref, _ref1;
      if (this.layered) {
        for (i = _i = i, _ref = this.layers; i <= _ref ? _i <= _ref : _i >= _ref; i = i <= _ref ? ++_i : --_i) {
          _ref1 = this.stars;
          for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
            layer = _ref1[_j];
            layer = [];
          }
        }
      } else {
        this.stars = [];
      }
    };

    return StarField;

  })(Singleton);

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

  $('#game').click(function(e) {});

  invert = true;

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
    if (e.keyCode === 73) {
      if (invert) {
        window.starField.setColor('#000000');
        window.starField.setBg('#ffffff');
        invert = false;
      } else {
        window.starField.setColor('#ffffff');
        window.starField.setBg('#000000');
        invert = true;
      }
    }
    if (e.keyCode === 74) {
      window.starField.changeSpeed(-1);
    }
    if (e.keyCode === 75) {
      return window.starField.changeSpeed(1);
    }
  });

  $('#gamebox').mousemove(function(e) {});

  FPS = 100;

  window.canvas = document.getElementById('game');

  window.rect = window.canvas.getBoundingClientRect();

  window.canvas.width = window.canvas.height = 570;

  window.ctx = window.canvas.getContext('2d');

  window.starField = StarField.getInstance("CIRCLE", 1, 1, "UP", "#ffffff", 100, 4);

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
