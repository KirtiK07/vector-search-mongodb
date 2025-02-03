// app.js
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Employee = require('./models/employee');
const Department = require('./models/department');
const { loadGloVe, generateEmbedding } = require('./utils/glove');
const { createFaissIndex, searchFaissIndex } = require('./utils/faiss');

const app = express();
const port = 3000;

// Load GloVe embeddings
const gloveEmbeddings = loadGloVe();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Add an employee to the database
app.post('/add/employee', async (req, res) => {
  try {
    const { name, employeeId, introduction } = req.body;
    const embedding = generateEmbedding(introduction, gloveEmbeddings);

    const employee = new Employee({
      employeeId,
      name,
      introduction,
      embedding
    });

    await employee.save();
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

// Add a department to the database
app.post('/add/department', async (req, res) => {
  try {
    const { name, departmentId, summary } = req.body;
    const embedding = generateEmbedding(summary, gloveEmbeddings);

    const department = new Department({
      departmentId,
      name,
      summary,
      embedding
    });

    await department.save();
    res.status(201).json({ message: 'Department added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add department' });
  }
});

// Perform vector search
app.post('/search', async (req, res) => {
  try {
    const { query } = req.body;  // Query text input
    const queryEmbedding = generateEmbedding(query, gloveEmbeddings);
    // console.log(queryEmbedding);

    const employees = await Employee.find();
    const embeddings = employees.map(emp => emp.embedding);
    //  console.log(embeddings);
    const index = createFaissIndex(embeddings);
    const searchResults = searchFaissIndex(index, queryEmbedding);

    const resultIds = searchResults['labels'];  // Indices of the closest matches
    const results = resultIds.map(idx => employees[idx]);

    res.json(results[0]);  // Return the search results
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
