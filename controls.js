const verticesModifier = document.getElementsByClassName("nr-of-vertices-modifier");
for (modifier of verticesModifier) {
  modifier.onclick = function() {
    let field = this.dataset.field;
    let modifierVal = this.dataset.val;

    let nrOfVerticesInput = document.getElementsByName(field)[0];
    let currentVal = nrOfVerticesInput.value;

    let newValue = Number(currentVal) + Number(modifierVal);
    if (newValue > 1) {
      nrOfVerticesInput.value = newValue;
      nrOfVertices = newValue;
      setup();

      document.getElementById("custom-vertices").checked = false;
    }
  }
}

document.getElementsByName("nrOfVertices")[0].onkeyup = function() {
  let newValue = this.value;
  if (newValue > 1) {
    nrOfVertices = newValue;
    setup();

    document.getElementById("custom-vertices").checked = false;
  } else if (newValue != "") {
    this.value = 2;
    nrOfVertices = 2;
    setup();

    document.getElementById("custom-vertices").checked = false;
  }
}

const ruleModifier = document.getElementsByName("rule");
for (modifier of ruleModifier) {
  modifier.onclick = function() {
    rule = Number(this.value);
    setup(false);
  }
}

const coloringModifier = document.getElementsByName("coloring");
for (modifier of coloringModifier) {
  modifier.onclick = function() {
    coloring = Number(this.value);
    setup(false);
  }
}

const jumpratioModifier = document.getElementsByName("jumpratio");
document.getElementById("ratio").innerHTML = "(" + jumpratio.toFixed(3) + ")";
for (modifier of jumpratioModifier) {
  modifier.onclick = function() {
    jumpratio = Number(this.value);
    setup(false);
    document.getElementById("ratio").innerHTML = "(" + jumpratio.toFixed(3) + ")";
    if (this.id == "custom-jumpratio") document.getElementById("custom-vertices").checked = false;
  }
}

document.getElementById("canvas").onclick = function() {
  const cX = event.clientX - canvas.offsetLeft;
  const cY = event.clientY - canvas.offsetTop;
  if (document.getElementById("custom-jumpratio").checked) {
    const deltaX = Math.abs(d - cX);
    const deltaY = Math.abs(d - cY);
    const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    jumpratio = delta / d;
    setup(false);
    document.getElementById("ratio").innerHTML = "(" + jumpratio.toFixed(3) + ")";
  }

  if (document.getElementById("custom-vertices").checked) {
    vertices.push([cX, cY]);
    nrOfVertices++;
    setup(false);
  }
}

document.getElementById("custom-vertices").onclick = function(e) {
  document.getElementById("custom-jumpratio").checked = false;
}
