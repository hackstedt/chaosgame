var nrOfVertices = 3;

var jumpratio = .5;
var rule = 0;
var coloring = 0;


const vertices = [];
var phi = 2 * Math.PI / nrOfVertices;
var colorIncrement = 360 / nrOfVertices;

const width = innerWidth, height = innerHeight;
const length = Math.min(width, height);
const lengthHalf = length / 2;

const d = length * .95;
const R = d / 2;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.style.width = length + "px";
canvas.style.height = length + "px";
canvas.width = length;
canvas.height = length;


var prevRand, nextRand, prevX, prevY, nextX, nextY, x, y;


function setup(resetVertices = true) {
  phi = 2 * Math.PI / nrOfVertices;
  colorIncrement = 360 / nrOfVertices;
  if (resetVertices) vertices.length = 0;

  ctx.clearRect(0, 0, length, length);

  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.strokeStyle = "blue";
  ctx.arc(lengthHalf, lengthHalf, R, 0, 6.283185307179586);
  ctx.stroke();
  ctx.closePath();

  ctx.lineWidth = "2";
  ctx.strokeStyle = "red";
  for (let n = 0; n < nrOfVertices; ++n) {
    x = vertices[n] ? vertices[n][0] : lengthHalf + R * Math.cos(n*phi);
    y = vertices[n] ? vertices[n][1] : lengthHalf + R * Math.sin(n*phi);

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 6.283185307179586);
    ctx.stroke();
    ctx.closePath();

    vertices[n] || vertices.push([x, y]);
  }
  [x, y] = vertices[Math.floor(Math.random() * nrOfVertices)];
}

function step() {

  requestAnimationFrame(step);

  for (let n = 0; ++n < 555;) {
    nextRand = Math.floor(Math.random() * nrOfVertices);
    [nextX, nextY] = vertices[nextRand];

    if (rule) {
      switch (rule) {
        case 1:
          while (nextX == prevX && nextY == prevY) {
            [nextX, nextY] = vertices[Math.floor(Math.random() * nrOfVertices)];
          }
          break;
        case 2:
          while (nextRand == (prevRand + nrOfVertices - 1 ) % nrOfVertices) {
            nextRand = Math.floor(Math.random() * nrOfVertices);
          }
          [nextX, nextY] = vertices[nextRand];
          prevRand = nextRand;
          break;
        case 3:
          while (nextRand == (prevRand + nrOfVertices - 2 ) % nrOfVertices || nextRand == (prevRand + nrOfVertices + 2 ) % nrOfVertices) {
            nextRand = Math.floor(Math.random() * nrOfVertices);
          }
          [nextX, nextY] = vertices[nextRand];
          prevRand = nextRand;
          break;
        case 4:
          break;
      }
    }

    switch (coloring) {
      case 0:
        ctx.fillStyle = "#e6e338";
        break;
      case 1:
        ctx.fillStyle = "hsl(" + nextRand * colorIncrement + ", 80%, 50%)";
        break;
      case 2:
        ctx.fillStyle = "hsl(" + (nextX - x)/d * 360 + ", 100%,"+ (nextY - y)/d * 100 + "%)";
        break;
      case 3:
        ctx.fillStyle = "hsl(" + Math.abs((nextX - x))/d * 360 + ", 100%,"+ Math.abs((nextY - y))/d * 100 + "%)";
        break;
    }

    // x =(nextX - x) * jumpratio + lengthHalf;
    // y =(nextY - y) * jumpratio + lengthHalf;
    x = x + (nextX - x) * jumpratio;
    y = y + (nextY - y) * jumpratio;

    ctx.fillRect(Math.floor(x),Math.floor(y),1,1);
    prevX = nextX;
    prevY = nextY;
  }
}

setup();

requestAnimationFrame(step);
