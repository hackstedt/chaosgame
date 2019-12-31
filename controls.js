const verticesModifier = document.getElementsByClassName("nr-of-vertices-modifier");
for (modifier of verticesModifier) {
  modifier.onclick = function(){
    let field = this.dataset.field;
    let modifierVal = this.dataset.val;

    let nrOfVerticesInput = document.getElementsByName(field)[0];
    let currentVal = nrOfVerticesInput.value;

    let newValue = Number(currentVal) + Number(modifierVal);
    nrOfVerticesInput.value = newValue;
    nrOfVertices = newValue;
    setup();
  }
  document.getElementsByName("nrOfVertices")[0].onkeyup = function(){
    let newValue = this.value;
    nrOfVertices = newValue;
    setup();
  }
};

const ruleModifier = document.getElementsByName("rule");
for (modifier of ruleModifier) {
  modifier.onclick = function() {
    rule = Number(this.value);
    setup();
  }
};

const coloringModifier = document.getElementsByName("coloring");
for (modifier of coloringModifier) {
  modifier.onclick = function() {
    coloring = Number(this.value);
    setup();
  }
};

const jumpratioModifier = document.getElementsByName("jumpratio");
for (modifier of jumpratioModifier) {
  modifier.onclick = function() {
    jumpratio = Number(this.value);
    setup();
  }
};
