// utils/faiss.js
const faiss = require('faiss-node');  // FAISS package for node

// Function to create a FAISS index from embeddings
function createFaissIndex(embeddings) {
  // Ensure embeddings is an array
  if (!Array.isArray(embeddings)) {
    throw new TypeError('Embeddings should be an array');
  }

  // Ensure that each embedding is a valid 1D array with length 50 (GloVe 50D)
  const dimension = 50; // GloVe 50D embeddings

  embeddings.forEach(embedding => {
    if (!Array.isArray(embedding) || embedding.length !== dimension) {
      throw new TypeError('Each embedding should be a 1D array with length 50');
    }
  });

  // Initialize a FAISS index (index flat with L2 distance)
  const index = new faiss.IndexFlatL2(dimension);

//   Flatten the 2D array of embeddings into a 1D Float32Array
//   f32_embedding_mat = new Array();
  embeddings.forEach(embedding => {
    const embeddingMatrix = [];
    embeddingMatrix.push(...embedding);
    // f32_embedding_mat.push();
    index.add(embeddingMatrix);
    });
    // console.log(f32_embedding_mat.length)
// const embeddingMatrix = embeddings.map(embedding => new Float32Array(embedding));
// console.log(embeddingMatrix);
  // Add the flattened embeddings to the FAISS index
//   console.log(embeddingMatrix.length);
//   embeddingMatrix.forEach(embedding => {
//   })
//   return 1;
  return index;
}

// Function to perform the search in the FAISS index
function searchFaissIndex(index, queryEmbedding) {
  const k = 5;  // Number of nearest neighbors to return
  const result = index.search(queryEmbedding, 2);  // Perform the search with the query embedding
  return result;  // Returns the indices of the closest matches
}

module.exports = { createFaissIndex, searchFaissIndex };
