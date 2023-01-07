const verticesModifier = document.getElementsByClassName("nr-of-vertices-modifier");
const customVerticesCheckbox = document.getElementById("custom-vertices");
const nrOfVerticesInput = document.getElementById("nrOfVertices");

for (modifier of verticesModifier) {
  modifier.onclick = function() {
    customVerticesCheckbox.checked = false;
    setupNeeded = true;

    switch (this.dataset.change) {
      case 'increase':
        nrOfVerticesInput.stepUp();
        break;
      case 'decrease':
        nrOfVerticesInput.stepDown();
        break;
    }
  }
}

document.getElementById("nrOfVertices").onchange = function() {
  setupNeeded = true;
}

document.getElementById("nrOfVertices").onkeyup = function() {
  customVerticesCheckbox.checked = false;
  this.value = parseInt(this.value);
  setupNeeded = true;
}

const ruleModifier = document.getElementsByName("rule");
for (modifier of ruleModifier) {
  modifier.onclick = function() {
    rule = Number(this.value);
    setupNeeded = true;
  }
}

const coloringModifier = document.getElementsByName("coloring");
for (modifier of coloringModifier) {
  modifier.onclick = function() {
    coloring = Number(this.value);
    setupNeeded = true;
  }
}

const jumpratioModifier = document.getElementsByName("jumpratio");
document.getElementById("ratio").innerHTML = "(" + jumpratio.toFixed(3) + ")";
for (modifier of jumpratioModifier) {
  modifier.onclick = function() {
    jumpratio = Number(this.value);
    setupNeeded = true;
    document.getElementById("ratio").innerHTML = "(" + jumpratio.toFixed(3) + ")";
    if (this.id == "custom-jumpratio") {
      customVerticesCheckbox.checked = false;
      for (let i=0; i<1; i+=.1) {
        setTimeout(()=>{
          jumpratio = 1-i;
          setupNeeded = true;
        }, i*555);
      }
    }
  }
}

document.getElementById("canvas").onclick = function() {
  const cX = event.clientX - canvas.offsetLeft;
  const cY = event.clientY - canvas.offsetTop;

  if (document.getElementById("custom-jumpratio").checked) {
    jumpratio = cX / d;
    setupNeeded = true;
    document.getElementById("ratio").innerHTML = "(" + jumpratio.toFixed(3) + ")";
  }

  if (customVerticesCheckbox.checked) {
    vertices.push([cX, cY]);
    nrOfVerticesInput.stepUp();
    setupNeeded = true;
  }
}
  document.getElementById("somehow-different").onclick = function() {
    setupNeeded = true;
  }

customVerticesCheckbox.onclick = function(e) {
  document.getElementById("custom-jumpratio").checked = false;
}
