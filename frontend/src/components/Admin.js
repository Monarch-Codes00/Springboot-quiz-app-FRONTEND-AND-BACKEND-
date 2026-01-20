import React, { useState, useEffect } from 'react';
import quizApi from '../services/quizApi';

function Admin() {
  const [questions, setQuestions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    questionText: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctOption: 1
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await quizApi.getAllQuestions();
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error('Error loading questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({
      ...newQuestion,
      [name]: name === 'correctOption' ? parseInt(value) : value
    });
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await quizApi.addQuestion(newQuestion);
      setNewQuestion({
        questionText: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctOption: 1
      });
      setShowAddForm(false);
      loadQuestions(); // Refresh the list
    } catch (err) {
      setError('Failed to add question. Please try again.');
      console.error('Error adding question:', err);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await quizApi.deleteQuestion(id);
        loadQuestions(); // Refresh the list
      } catch (err) {
        setError('Failed to delete question. Please try again.');
        console.error('Error deleting question:', err);
      }
    }
  };

  const getCorrectOptionText = (question, correctOption) => {
    const options = [question.option1, question.option2, question.option3, question.option4];
    return options[correctOption - 1]; // Backend uses 1-based indexing
  };

  if (loading) {
    return <div className="admin-panel">Loading questions...</div>;
  }

  return (
    <div className="admin-panel">
      <h2>Quiz Administration</h2>

      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <div className="admin-actions">
        <button
          className="btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Question'}
        </button>
        <button className="btn" onClick={loadQuestions}>
          Refresh
        </button>
      </div>

      {showAddForm && (
        <div className="question-form">
          <h3>Add New Question</h3>
          <form onSubmit={handleAddQuestion}>
            <div className="form-group">
              <label>Question Text:</label>
              <input
                type="text"
                name="questionText"
                value={newQuestion.questionText}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Option 1:</label>
              <input
                type="text"
                name="option1"
                value={newQuestion.option1}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Option 2:</label>
              <input
                type="text"
                name="option2"
                value={newQuestion.option2}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Option 3:</label>
              <input
                type="text"
                name="option3"
                value={newQuestion.option3}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Option 4:</label>
              <input
                type="text"
                name="option4"
                value={newQuestion.option4}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Correct Option (1-4):</label>
              <select
                name="correctOption"
                value={newQuestion.correctOption}
                onChange={handleInputChange}
                required
              >
                <option value={1}>Option 1</option>
                <option value={2}>Option 2</option>
                <option value={3}>Option 3</option>
                <option value={4}>Option 4</option>
              </select>
            </div>

            <button type="submit" className="btn">Add Question</button>
          </form>
        </div>
      )}

      <div className="question-list">
        <h3>Existing Questions ({questions.length})</h3>
        {questions.length === 0 ? (
          <p>No questions found. Add some questions to get started.</p>
        ) : (
          questions.map((question) => (
            <div key={question.id} className="question-item">
              <div className="text">
                <strong>{question.questionText}</strong>
                <div style={{ marginTop: '10px', fontSize: '14px' }}>
                  <div>1. {question.option1}</div>
                  <div>2. {question.option2}</div>
                  <div>3. {question.option3}</div>
                  <div>4. {question.option4}</div>
                  <div style={{ marginTop: '5px', color: 'green' }}>
                    Correct: {getCorrectOptionText(question, question.correctOption || 1)}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Admin;