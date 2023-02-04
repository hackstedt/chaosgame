var nrOfVertices = 3;
var prevNrOfVertices = 0;

var jumpratio = .5;
var rule = 0;
var coloring = 0;

var bgColor = document.getElementById("bg-color-picker").value;
var fgColor = document.getElementById("fg-color-picker").value;

document.body.style.backgroundColor = bgColor;


const vertices = [];
var colorIncrement = 360 / nrOfVertices;

const d = Math.min(document.body.clientWidth, innerHeight);
const r = d / 2;

const canvasWraper = document.getElementById("canvas-wraper");
const fgCanvas = document.getElementById("fg-canvas");
const bgCanvas = document.getElementById("bg-canvas");
const fgCtx = fgCanvas.getContext("2d");
const bgCtx = bgCanvas.getContext("2d");

canvasWraper.style.width = d + "px";
canvasWraper.style.height = d + "px";
canvasWraper.width = d;
canvasWraper.height = d;
fgCanvas.style.width = d + "px";
fgCanvas.style.height = d + "px";
fgCanvas.width = d;
fgCanvas.height = d;
bgCanvas.style.width = d + "px";
bgCanvas.style.height = d + "px";
bgCanvas.width = d;
bgCanvas.height = d;


var prevRand, nextRand, prevX, prevY, nextX, nextY, x, y, somehowDifferent;
var setupNeeded = true;


function setup() {
  setupNeeded = false;

  nrOfVertices = Number(document.getElementById("nrOfVertices").value);
  const phi = 2 * Math.PI / nrOfVertices;

  somehowDifferent = document.getElementById("somehow-different").checked;

  colorIncrement = 360 / nrOfVertices;

  bgCtx.fillStyle = bgColor;
  bgCtx.fillRect(0,0,d,d);
  fgCtx.clearRect(0,0,d,d);

  fgCtx.beginPath();
  fgCtx.lineWidth = "1";
  fgCtx.strokeStyle = "darkblue";
  fgCtx.arc(r, r, r, 0, 6.283185307179586);
  fgCtx.stroke();
  fgCtx.closePath();


  if (!document.getElementById("custom-vertices").checked && prevNrOfVertices != nrOfVertices)
    vertices.length = 0;

  prevNrOfVertices = nrOfVertices;

  fgCtx.lineWidth = "2";
  fgCtx.strokeStyle = "darkred";

  for (let n = 0; n < nrOfVertices; ++n) {
    x = vertices[n] ? vertices[n][0] : r + r * Math.cos(n*phi);
    y = vertices[n] ? vertices[n][1] : r + r * Math.sin(n*phi);

    fgCtx.beginPath();
    fgCtx.arc(x, y, 2, 0, 6.283185307179586);
    fgCtx.stroke();
    fgCtx.closePath();

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
        bgCtx.fillStyle = fgColor;
        break;
      case 1:
        bgCtx.fillStyle = "hsl(" + nextRand * colorIncrement + ", 80%, 50%)";
        break;
      case 2:
        bgCtx.fillStyle = "hsl(" + (nextX - prevX)/d * 360 + ", 100%,"+ (nextY - prevY)/d * 100 + "%)";
        break;
      case 3:
        bgCtx.fillStyle = "hsl(" + Math.abs((nextX - prevX))/d * 360 + ", 100%,"+ Math.abs((nextY - prevY))/d * 100 + "%)";
        break;
    }

    if (somehowDifferent) {
      x = x + (nextX - x) * jumpratio;
      y = y + (nextY - y) * jumpratio;
      bgCtx.fillRect(Math.floor(x),Math.floor(y),1,1);
      prevX = nextX;
      prevY = nextY;
    } else {
      prevX = prevX + (nextX - prevX) * jumpratio;
      prevY = prevY + (nextY - prevY) * jumpratio;
      bgCtx.fillRect(Math.floor(prevX),Math.floor(prevY),1,1);
    }
  }
}

requestAnimationFrame(step);
