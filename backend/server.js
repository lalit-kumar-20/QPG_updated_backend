const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dbData = require('./question_store'); // Import the data from db.js

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



app.post('/add-question', (req, res) => {
    const newQuestion = req.body;
    dbData.push(newQuestion);
    console.log('New question added:', newQuestion);
    res.json({ message: 'Question added successfully' });
  });

  // 
let totalMarks = 100;
let easyPercentage = 0.3;
let mediumPercentage = 0.4;
let hardPercentage = 0.3;

app.post('/update-difficulty', (req, res) => {
    let difficulty=req.body;
    totalMarks = difficulty.totalMarks;
    easyPercentage = (difficulty.easyPercentage)/100;
    mediumPercentage = (difficulty.mediumPercentage)/100;
    hardPercentage = (difficulty.hardPercentage)/100;
  
    res.json({ message: 'Difficulty updated successfully' });
  });

  app.get('/generatePaper', (req, res) => {
    console.log("fetching data");
    console.log(dbData);
  //  res.json(dbData); // Send the data from db.js as a JSON response
  let questions = [];
//   try {
//     const data = fs.readFileSync('question_store.js', 'utf8');
//     questions = JSON.parse(data);
//   } catch (err) {
//     console.error('Error reading question_store.js:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//     return;
//   }
    try {
        const data = fs.readFileSync('question_store.js', 'utf8');
        questions = JSON.parse(data);
    } catch (err) {
        console.error('Error reading question_store.js:', err);
        console.error('Content of question_store.js:', fs.readFileSync('question_store.js', 'utf8'));
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }

  // Calculate the number of questions for each difficulty level
  
  let easyMarks = Math.round(easyPercentage * totalMarks);
  let mediumMarks = Math.round(mediumPercentage * totalMarks);
  let hardMarks = Math.round(hardPercentage * totalMarks);
  
  // Filter questions based on difficulty and shuffle them
  const shuffledEasyQuestions = shuffle(questions.filter((q) => q.difficulty === 'Easy'));
  const shuffledMediumQuestions = shuffle(questions.filter((q) => q.difficulty === 'Medium'));
  const shuffledHardQuestions = shuffle(questions.filter((q) => q.difficulty === 'Hard'));
  
  // Select questions based on the calculated marks for each difficulty
  const selectedQuestions = [];
  for (const question of shuffledEasyQuestions) {
    if (easyMarks - question.marks >= 0) {
      selectedQuestions.push(question);
      easyMarks -= question.marks;
    } else {
      continue;
    }
  }
  
  for (const question of shuffledMediumQuestions) {
    if (mediumMarks - question.marks >= 0) {
      selectedQuestions.push(question);
      mediumMarks -= question.marks;
    } else {
      continue;
    }
  }
  
  for (const question of shuffledHardQuestions) {
    if (hardMarks - question.marks >= 0) {
      selectedQuestions.push(question);
      hardMarks -= question.marks;
    } else {
      continue;
    }
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Return the selected question paper in JSON format
  res.json({ questionPaper: selectedQuestions });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});