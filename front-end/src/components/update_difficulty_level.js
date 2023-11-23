import React, { useState } from 'react';

const UpdateDifficulty = () => {
  const [totalMarks, setTotalMarks] = useState('');
  const [easyPercentage, setEasyPercentage] = useState('');
  const [mediumPercentage, setMediumPercentage] = useState('');
  const [hardPercentage, setHardPercentage] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);

  const handleUpdateDifficulty = async () => {
    // Validate input values
    if (!totalMarks || !easyPercentage || !mediumPercentage || !hardPercentage) {
      setAlertMessage('Please fill out all fields');
      return;
    }

    // Calculate new difficulty levels

    try {
      const response = await fetch('http://localhost:3001/update-difficulty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalMarks: parseInt(totalMarks),
          easyPercentage,
          mediumPercentage,
          hardPercentage,
        }),
      });

      if (response.ok) {
        setAlertMessage('Difficulty updated successfully');
        // Optionally, you can redirect the user or update the UI
      } else {
        setAlertMessage('Failed to update difficulty');
      }
    } catch (error) {
      setAlertMessage('Error updating difficulty');
      console.error('Error updating difficulty:', error);
    }
  };

  return (
    <div className="container mt-4 my-5">
      <h2>Update Difficulty Level for Generating a New Paper</h2>
      {alertMessage && (
        <div className={`alert ${alertMessage.includes('success') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {alertMessage}
        </div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="totalMarks" className="form-label">
            Total Marks
          </label>
          <input
            type="number"
            className="form-control"
            id="totalMarks"
            value={totalMarks}
            placeholder='Enter Max. Marks'
            onChange={(e) => setTotalMarks(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="easyPercentage" className="form-label">
            Easy Percentage
          </label>
          <input
            type="number"
            className="form-control"
            id="easyPercentage"
            value={easyPercentage}
            placeholder='0-100%'
            onChange={(e) => setEasyPercentage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mediumPercentage" className="form-label">
            Medium Percentage
          </label>
          <input
            type="number"
            className="form-control"
            id="mediumPercentage"
            value={mediumPercentage}
            placeholder='0-100% accordingly'
            onChange={(e) => setMediumPercentage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hardPercentage" className="form-label">
            Hard Percentage
          </label>
          <input
            type="number"
            className="form-control"
            id="hardPercentage"
            value={hardPercentage}
            placeholder='0-100% accordingly'
            onChange={(e) => setHardPercentage(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdateDifficulty}>
          Update Difficulty Level
        </button>
      </form>
    </div>
  );
};

export default UpdateDifficulty;
