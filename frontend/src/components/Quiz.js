import React, { useState, useEffect } from 'react';
import quizApi from '../services/quizApi';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await quizApi.getQuizQuestions();
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error('Error loading questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const answerList = Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId: parseInt(questionId),
        selectedOption: selectedOption + 1 // Backend expects 1-based indexing
      }));

      const result = await quizApi.submitQuiz(answerList);
      setResults(result);
      setShowResults(true);
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      console.error('Error submitting quiz:', err);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
    setError(null);
  };

  if (loading) {
    return <div className="quiz-container">Loading questions...</div>;
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="error-message" style={{ color: 'red', marginBottom: '20px' }}>
          {error}
        </div>
        <button className="btn" onClick={loadQuestions}>Retry</button>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="quiz-container">
        <div className="result-display">
          <h2>Quiz Results</h2>
          <div className="score">
            {results.score}/{results.totalQuestions}
          </div>
          <p>
            You scored {results.score} out of {results.totalQuestions} questions correctly.
          </p>
          <p>
            Percentage: {((results.score / results.totalQuestions) * 100).toFixed(1)}%
          </p>
          <button className="btn" onClick={handleRestart}>Take Quiz Again</button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <p>No questions available. Please contact the administrator.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="quiz-container">
      <div className="question-card">
        <div className="question-header">
          <h3>Question {currentQuestionIndex + 1} of {questions.length}</h3>
        </div>

        <div className="question-text">
          {currentQuestion.questionText}
        </div>

        <div className="options">
          {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((option, index) => (
            <label
              key={index}
              className={`option ${currentAnswer === index ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={index}
                checked={currentAnswer === index}
                onChange={() => handleAnswerSelect(currentQuestion.id, index)}
              />
              {option}
            </label>
          ))}
        </div>

        <div className="navigation-buttons">
          <button
            className="btn"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          {currentQuestionIndex < questions.length - 1 ? (
            <button
              className="btn"
              onClick={handleNext}
              disabled={currentAnswer === undefined}
            >
              Next
            </button>
          ) : (
            <button
              className="btn"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== questions.length}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>

      <div className="progress">
        <p>Progress: {Object.keys(answers).length}/{questions.length} questions answered</p>
      </div>
    </div>
  );
}

export default Quiz;