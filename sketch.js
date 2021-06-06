let model;
let targetLabel;
let trainingData = [];

let state = "collection";

function setup() {
  createCanvas(400, 400);

  let options = {
    inputs: ["x", "y"],
    outputs: ["label"],
    task: "classification",
    debug: "true",
  };
  model = ml5.neuralNetwork(options);
}

function keyPressed() {
  if (key == "t") {
    state = "training";
    console.log("training process to start");
    model.normalizeData();
    let options = {
      epochs: 100,
    };
    model.train(options, whileTraining, finishedTraining);
  } else if (key == "s") {
    model.saveData("mouse-click");
    model.save();
  } else if (key == "m") {
    const modelInfo = {
      model: "model/model.json",
      metadata: "model/model_meta.json",
      weights: "model/model.weights.bin",
    };
    model.load(modelInfo, modelLoaded);
    state = "prediction";
  } else {
    targetLabel = key.toUpperCase();
  }
}

function modelLoaded() {
  console.log("model loaded");
}

function whileTraining(epoch, loss) {
  console.log(epoch);
}

function finishedTraining() {
  state = "prediction";
  console.log("finishedTraining");
}

function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY,
  };

  if (state == "collection") {
    let target = {
      label: targetLabel,
    };
    model.addData(inputs, target);
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);
  } else if (state == "prediction") {
    model.classify(inputs, gotResults);
  }
}

function gotResults(err, results) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(results);
  stroke(0);
  fill(0, 0, 255, 100);
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(results[0].label, mouseX, mouseY);
}
