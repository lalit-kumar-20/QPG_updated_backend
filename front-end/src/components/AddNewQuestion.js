import React, { useState } from 'react';

const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [marks, setMarks] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);

  const handleAddQuestion = async () => {
    if (!question || !subject || !topic || !difficulty || !marks) {
        setAlertMessage('Please fill out all attributes');
        return;
      }
    try {
      const response = await fetch('http://localhost:3001/add-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          subject,
          topic,
          difficulty,
          marks,
        }),
      });

      if (response.ok) {
        console.log('Question added successfully');
        setAlertMessage('Question added successfully');
        // Optionally, you can redirect the user or update the UI
      } else {
        console.error('Failed to add question');
        setAlertMessage('Failed to add question');
      }
    } catch (error) {
      console.error('Error adding question:', error);
      setAlertMessage('Error adding question');

    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Question</h2>
      {alertMessage && (
        <div className={`alert ${alertMessage.includes('success') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {alertMessage}
        </div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="question" className="form-label">Question:</label>
          <input
            type="text"
            className="form-control"
            id="question"
            value={question}
           
            placeholder='Write Question'
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject:</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            value={subject}
            placeholder='Mention Subject'
            required
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="topic" className="form-label">Topic:</label>
          <input
            type="text"
            className="form-control"
            id="topic"
            value={topic}
            required
            placeholder='Mention topic'
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="difficulty" className="form-label">Difficulty:</label>
          <input
            type="text"
            className="form-control"
            id="difficulty"
            value={difficulty}
            required
            placeholder='Mention: Easy/Medium/Hard'
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="marks" className="form-label">Marks:</label>
          <input
            type="number"
            className="form-control"
            id="marks"
            value={marks}
            required
            placeholder='For Easy-5, Medium-8, Hard-10'
            onChange={(e) => setMarks(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
