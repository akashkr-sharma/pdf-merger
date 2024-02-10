const fs = require('fs');
const shell = require('shelljs');
const PDFMerger = require('pdf-merger-js');

const inputFolder = './input';
const output =  './output';
const currentPath = shell.pwd();

const concatPdfFiles = async (inputFile) =>{
    console.log("merge process started now")
    const merger = new PDFMerger();
    const pdfs = [];
    for(let i=0; i<inputFile.length; i++) {
        const filename = inputFile[i];
        const fileAbsPath = `${inputFolder}/${filename}`;
        console.log("file picked for processing: ", filename)
        await merger.add(fileAbsPath);
    }
    const time = new Date();
    const outputFilename = `opt-${time.getTime()}.pdf`;
    console.log("output filename: ", outputFilename);
    await merger.save(`${output}/${outputFilename}`);
}

async function main() {
    const inputFiles = shell.ls(`${currentPath}/${inputFolder}`);
    await concatPdfFiles(inputFiles);
    console.log("job completed")
}


main();