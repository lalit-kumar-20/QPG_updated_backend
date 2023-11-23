Question Paper Generator

Overview:

The Question Paper Generator is a Full stack application that has three endpoints for managing and generating question papers. It allows users to submit questions with attributes such as question text, subject, topic, difficulty, and marks. Additionally, it generates question papers based on specified difficulty percentages.

Prerequisites:

npm (Node Package Manager)
Installation

Clone the repository:

git clone https://github.com/lalit-kumar-20 Question_Paper_Generator.git


Navigate to the project directory:

cd question-paper-generator

Install dependencies:

npm install 

npm i express

npm i bootstrap
Usage


1. Start the Server
use

npm start
or run

This will start the backend server on http://localhost:3001.

This will start the frontend server on http://localhost:3000.

2. Submit a Question


Use the provided HTML form saveQuestion to submit a question with attributes such as question text, subject, topic, difficulty, and marks.

3. Generate a Question Paper
Use the generateQuestionPaper button endpoint to generate a question paper with the specified difficulty percentages. The generated question paper will be returned in JSON format.

We can also set the Total marks of the question paper, percentage of questions from easy, medium and hard difficulty using the updateDifficulty form according to our requirements. If not provided, the default values have been set to total marks = 100 , Difficulty: (20% Easy, 50% Medium, 30% Hard ).

GET http://localhost:3001/generatePaper

packages:

express

body-parser

Server-Side Logic (server.js)

Endpoints:

Save Question Endpoint:

Path: http://localhost:3001/add-question (POST)

Description: Saves a new question to the question store file (question_store.js).
Input: JSON object containing question details (question, subject, topic, difficulty, marks).
Output: JSON response with a success message.
Update Difficulty Endpoint:

Path: http://localhost:3001/update-difficulty (POST)

Description: Updates the difficulty levels based on the provided percentages.
Input: JSON object containing total marks, easy percentage, medium percentage, and hard percentage.
Output: JSON response with a success message.
Generate Question Paper Endpoint:

Path: /generatePaper (GET)

Description: Generates a question paper based on the stored questions and configured difficulty levels.
Input: Query parameter for the output format (e.g., JSON).
Output: JSON response containing the generated question paper.
Functions:
Shuffle Function:
Shuffles an array using the Fisher-Yates algorithm.
Client-Side Logic (front-end folder)
UI Elements(using Bootstrap Framework):
Submit a Question Form:

Allows users to input question details and save them.
Update Difficulty Form:

Allows users to update difficulty levels based on total marks and percentage values for easy, medium, and hard.
Generate Question Paper Button:

Triggers the generation of a question paper based on the configured difficulty levels.
Question Paper Container:

Displays the generated question paper.
Functions:
saveQuestion Function:

Sends a POST request to the server to save a new question.
updateDifficulty Function:

Sends a POST request to the server to update difficulty levels.
generateQuestionPaper Function:

Sends a GET request to the server to generate a question paper and displays it.
displayQuestionPaper Function:

Displays the generated question paper on the UI.
Extensions:
The application is completely adaptable to the following extensions ->

select topic and set precentage Function:
Sends a POST request to select the required percentage of questions from the selected topic.
