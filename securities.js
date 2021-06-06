let model;

let state = "collection";

let options = {
    dataUrl: 'data/securities.csv',
    inputs: ['close'],
    outputs:['label'],
    task:'classification',
    debug: true
};

model = ml5.neuralNetwork(options, dataLoaded);

function dataLoaded(){
   
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

function trainModel(){
    const trainingOptions = {
        epochs: 32
    }
    model.train(trainingOptions, finishedTraining)
}

function finishedTraining(){
    classify();
}

function classify(){
    const input = {
        close: 1195
    }

    model.classify(input, handleResult);
}

function handleResult(error, result){
    if(error){console.log(error); return}
    console.log(result);
    // model.save();
}
