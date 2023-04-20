'use strict';
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
//   const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
// const key = 'PASTE_YOUR_COMPUTER_VISION_KEY_HERE';
// const endpoint = 'PASTE_YOUR_COMPUTER_VISION_ENDPOINT_HERE';
const Ass5ImageVision_Endpoint = "https://ass5imagevision.cognitiveservices.azure.com/";
const Ass5ImageVision_KEY1 = "bc8d3fc0b0d541dd867608e38da64981";

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': Ass5ImageVision_KEY1 } }),
  Ass5ImageVision_Endpoint
);

async function processImage(blobStorageAddress) {

    console.log("queue trigger executed XDDDDDDDDDD")
    const options = {
        maxCandidates: 5,
        language: "en"
      };
    const printedText = (await computerVisionClient.recognizePrintedText(true, blobStorageAddress, options));
    // parse each part from the doc
    // Jimmy version
    // const lines = result.analyzeResult.pages.map(page => page.lines.map(line => line.content.split(":").map(part => part.trim()))).reduce((acc, list) => acc.concat(list));

    const bodyText = JSON.parse(printedText._response.bodyAsText);
    const lines = bodyText.regions[0].lines;
    // console.log(lines)
    let texts = [];
    for (let i = 0; i < lines.length; i++) {
        let words = lines[i].words;
        // console.log(i, words);
        let text = "";
        for (let j = 0; j < words.length; j++) {
            text+=words[j].text + " ";
        }
        // console.log(text);
        texts.push(text);
        // break;
    }
    const result = texts.join(" %-% "); // custom splitter
    console.log(`Tags: ${result}`);
    return {"doc_text":result};
}

module.exports = async function (context, blobStorageAddress) {
    context.log('JavaScript queue trigger function processed work item', blobStorageAddress);
    const printedText = await processImage(blobStorageAddress);
    // store the text to database
    context.bindings.outputDocument = printedText;

};


