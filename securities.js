let model;

let state = "collection";

let options = {
  dataUrl: "data/index.csv",
  inputs: [
    "date",
    "Sp",
    "DJIA",
    "NASDAQ",
    "NIKKI",
    "KOSPI",
    "Hangseng",
    "FTSE",
    "GDAX",
    "STOCKHOLM",
  ],
  outputs: ["NIFTY"],
  task: "classification",
  debug: true,
};

model = ml5.neuralNetwork(options, dataLoaded);

function dataLoaded() {
  //train model

  model.normalizeData();
  trainModel();

  //load model

  // const modelInfo = {
  //     model: "model/reliance/model.json",
  //     metadata: "model/reliance/model_meta.json",
  //     weights: "model/reliance/model.weights.bin",
  //   };
  // model.load(modelInfo, finishedTraining);
}

function trainModel() {
  const trainingOptions = {
    epochs: 32,
  };
  model.train(trainingOptions, finishedTraining);
}

function finishedTraining() {
  classify();
}

function classify() {
  const input = {
    date: "8/20/2020 15:30:00",
    Sp: "3385",
    DJIA: "27739",
    NASDAQ: "11264.95",
    NIKKI: "22920.3",
    KOSPI: "2304.59",
    Hangseng: "25113.84",
    FTSE: "6013.34",
    GDAX: "12830",
    STOCKHOLM: "1751.93",
  };

  model.classify(input, handleResult);
}

function handleResult(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  console.log(result);
  // model.save();
}
