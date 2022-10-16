var nrOfVertices = 3;

var jumpratio = .5;
var rule = 0;
var coloring = 0;


const vertices = [];
var colorIncrement = 360 / nrOfVertices;

const d = Math.min(document.body.clientWidth, innerHeight) - 6;
const r = d / 2;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.style.width = d + "px";
canvas.style.height = d + "px";
canvas.width = d;
canvas.height = d;


var prevRand, nextRand, prevX, prevY, nextX, nextY, x, y;


function setup(resetVertices = true) {
  const phi = 2 * Math.PI / nrOfVertices;
  colorIncrement = 360 / nrOfVertices;
  if (resetVertices) vertices.length = 0;

  ctx.clearRect(0, 0, d, d);

  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.strokeStyle = "blue";
  ctx.arc(r, r, r, 0, 6.283185307179586);
  ctx.stroke();
  ctx.closePath();

  ctx.lineWidth = "2";
  ctx.strokeStyle = "red";
  for (let n = 0; n < nrOfVertices; ++n) {
    x = vertices[n] ? vertices[n][0] : r + r * Math.cos(n*phi);
    y = vertices[n] ? vertices[n][1] : r + r * Math.sin(n*phi);

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

    x = x + (nextX - x) * jumpratio;
    y = y + (nextY - y) * jumpratio;

    ctx.fillRect(Math.floor(x),Math.floor(y),1,1);
    prevX = nextX;
    prevY = nextY;
  }
}

setup();

requestAnimationFrame(step);
