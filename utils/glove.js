// utils/glove.js
const fs = require('fs');
const path = require('path');

// Load the GloVe embeddings from a file
const loadGloVe = () => {
  const gloveEmbeddings = {};
  const filePath = path.join(__dirname, 'glove.6B.50d.txt'); // Adjust the path if needed

  const fileData = fs.readFileSync(filePath, 'utf-8');
  const lines = fileData.split('\n');

  lines.forEach((line) => {
    const parts = line.split(' ');
    const word = parts[0];
    const embedding = parts.slice(1).map(parseFloat);
    gloveEmbeddings[word] = embedding;
  });

  return gloveEmbeddings;
};

// Function to generate embedding for text using GloVe
const generateEmbedding = (text, gloveEmbeddings) => {
  const words = text.split(' ');
  let embedding = new Array(50).fill(0);  // Adjust based on GloVe dimensions (50 in this case)
  let wordCount = 0;

  words.forEach(word => {
    if (gloveEmbeddings[word]) {
      const wordVec = gloveEmbeddings[word];
      for (let i = 0; i < embedding.length; i++) {
        embedding[i] += wordVec[i];
      }
      wordCount++;
    }
  });

  // Average the embeddings over the words
  if (wordCount > 0) {
    embedding = embedding.map(value => value / wordCount);  // Average the embeddings
  }

  return embedding;
};

module.exports = { loadGloVe, generateEmbedding };
