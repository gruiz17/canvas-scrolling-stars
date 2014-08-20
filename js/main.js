// Generated by CoffeeScript 1.7.1
(function() {
  var $, CircleStar, FPS, draw, drawStars, gameLoop, update;

  CircleStar = (function() {
    function CircleStar(radius, centerX, centerY, speed, direction, color) {
      this.radius = radius;
      this.centerX = centerX;
      this.centerY = centerY;
      this.speed = speed;
      this.direction = direction;
      this.color = color;
    }

    CircleStar.prototype.draw = function() {
      window.ctx.fillStyle = this.color;
      window.ctx.strokeStyle = this.color;
      window.ctx.beginPath();
      window.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
      window.ctx.fill();
      return window.ctx.stroke();
    };

    return CircleStar;

  })();

  $ = jQuery;

  FPS = 100;

  window.canvas = document.getElementById('game');

  window.rect = window.canvas.getBoundingClientRect();

  window.canvas.width = window.canvas.height = 550;

  window.ctx = window.canvas.getContext('2d');

  document.getElementById('message').innerHTML = "Click to play!";

  window.direction = 'LEFT';

  window.starCount = 200;

  drawStars = function(radius, direction, color) {
    var i, starArray, x, y, _i, _ref;
    starArray = [];
    for (i = _i = 1, _ref = window.starCount; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
      x = Math.floor((Math.random() * window.canvas.width) + 1);
      y = Math.floor((Math.random() * window.canvas.height) + 1);
      starArray.push(new CircleStar(radius, x, y, "0", direction, color));
    }
    return starArray;
  };

  window.stars = drawStars(1, "LEFT", "#ffffff");

  $('#game').click(function(e) {});

  $('#gamebox').mousemove(function(e) {});

  update = function() {};

  draw = function() {
    var star, _i, _len, _ref;
    window.ctx.clearRect(0, 0, 550, 550);
    _ref = window.stars;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      star = _ref[_i];
      star.draw();
    }
  };

  gameLoop = function() {
    update();
    draw();
  };

  setInterval(gameLoop, 1000 / FPS);

}).call(this);
