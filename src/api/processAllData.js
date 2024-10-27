import dataProcessor from './dataProcessor.js';

export default function processAllData(rawData) {
  return rawData.map((item) => dataProcessor(item));
}
