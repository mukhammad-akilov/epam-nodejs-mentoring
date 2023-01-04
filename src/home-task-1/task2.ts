import csvtojson from "csvtojson";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Book {
    Book: string;
    Author: string;
    Amount: number;
    Price: number;
}

const csvFilePath = path.join(__dirname, './csv/nodejs-excel.csv');
const resultFilePath= path.join(__dirname, './result/result.txt');

const csvReadStream = fs.createReadStream(csvFilePath);
const resultWriteStream = fs.createWriteStream(resultFilePath);

// csvReadStream.on('data', (chunk: Buffer) => {
//     // console.log(chunk.toString());
// })

const objLowerCaseKeys = (obj: Object) => {
    const formatedObject = Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
    );

    return formatedObject;
}

const onError = (error: Error) => {
    console.log('Error:', error);
}

const onComplete = (): void => {
    console.log('Reading is finished');
}

const readFile = async () => {
    // Read content using stream to save memory
    csvtojson().fromFile(csvFilePath).subscribe(async (book: Book, lineNumber: number) => {
    const resultBook: Book = await new Promise((resolve, reject)=>{
       resolve(book);
    })

    // Write result to the result file
    const modifiedBook = objLowerCaseKeys(resultBook);

    resultWriteStream.write(`${JSON.stringify(modifiedBook)}\n`);
    console.log(resultBook);
}, onError, onComplete)
}

readFile();