import React, { useState } from "react";

const YourComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleDisplayData = async () => {
    fetch("http://localhost:3001/generatePaper")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data.questionPaper);
        console.log(typeof data);

        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

  // Empty dependency array means this effect runs once, similar to componentDidMount

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render your component with the data
  return (
    <div className="container mt-4">
      <h2>Generate Paper</h2>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleDisplayData}
      >
        Display Paper
      </button>

      <div className="container mt-4">
        <h1 className="text-center mb-4">Question Paper</h1>
        {data ? (
          <div>
            {data.questionPaper.map((item, index) => (
              <div key={index} className="mb-4">
                <h5 className="mb-3">Question {index + 1}</h5>
                <p className="mb-1">Question: {item.question}</p>
                <p className="mb-1">Subject: {item.subject}</p>
                <p className="mb-1">Topic: {item.topic}</p>
                <p className="mb-1">Difficulty: {item.difficulty}</p>
                <p className="mb-1">Marks: {item.marks}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No data available Please! Click on Display Paper</p>
        )}
      </div>
    </div>
  );
};

export default YourComponent;
