var nrOfVertices = 3;
var prevNrOfVertices = 0;

var jumpratio = .5;
var rule = 0;
var coloring = 0;


const vertices = [];
var colorIncrement = 360 / nrOfVertices;

const d = Math.min(document.body.clientWidth, innerHeight);
const r = d / 2;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.style.width = d + "px";
canvas.style.height = d + "px";
canvas.width = d;
canvas.height = d;


var prevRand, nextRand, prevX, prevY, nextX, nextY, x, y, somehowDifferent;
var setupNeeded = true;


function setup() {
  setupNeeded = false;

  nrOfVertices = Number(document.getElementById("nrOfVertices").value);
  const phi = 2 * Math.PI / nrOfVertices;

  somehowDifferent = document.getElementById("somehow-different").checked;

  colorIncrement = 360 / nrOfVertices;

  ctx.clearRect(0, 0, d, d);

  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.strokeStyle = "darkblue";
  ctx.arc(r, r, r, 0, 6.283185307179586);
  ctx.stroke();
  ctx.closePath();


  if (!document.getElementById("custom-vertices").checked && prevNrOfVertices != nrOfVertices)
    vertices.length = 0;

  prevNrOfVertices = nrOfVertices;

  ctx.lineWidth = "2";
  ctx.strokeStyle = "darkred";

  for (let n = 0; n < nrOfVertices; ++n) {
    x = vertices[n] ? vertices[n][0] : r + r * Math.cos(n*phi);
    y = vertices[n] ? vertices[n][1] : r + r * Math.sin(n*phi);

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 6.283185307179586);
    ctx.stroke();
    ctx.closePath();

    vertices[n] || vertices.push([x, y]);
  }

  if (nrOfVertices > 1)
    [prevX, prevY] = vertices[Math.floor(Math.random() * nrOfVertices)];
}

function step() {
  if (setupNeeded)
    setup();

  requestAnimationFrame(step);

  if (nrOfVertices < 2)
    return;

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
        ctx.fillStyle = "hsl(" + (nextX - prevX)/d * 360 + ", 100%,"+ (nextY - prevY)/d * 100 + "%)";
        break;
      case 3:
        ctx.fillStyle = "hsl(" + Math.abs((nextX - prevX))/d * 360 + ", 100%,"+ Math.abs((nextY - prevY))/d * 100 + "%)";
        break;
    }

    if (somehowDifferent) {
      x = x + (nextX - x) * jumpratio;
      y = y + (nextY - y) * jumpratio;
      ctx.fillRect(Math.floor(x),Math.floor(y),1,1);
      prevX = nextX;
      prevY = nextY;
    } else {
      prevX = prevX + (nextX - prevX) * jumpratio;
      prevY = prevY + (nextY - prevY) * jumpratio;
      ctx.fillRect(Math.floor(prevX),Math.floor(prevY),1,1);
    }
  }
}

requestAnimationFrame(step);
