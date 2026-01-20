const API_BASE_URL = '/api/quiz';

class QuizApiService {
  // Get all questions for quiz
  async getQuizQuestions() {
    const response = await fetch(`${API_BASE_URL}/questions`);
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    return response.json();
  }

  // Submit quiz answers
  async submitQuiz(answers) {
    const response = await fetch(`${API_BASE_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    });
    if (!response.ok) {
      throw new Error('Failed to submit quiz');
    }
    return response.json();
  }

  // Admin: Get all questions
  async getAllQuestions() {
    const response = await fetch(`${API_BASE_URL}/admin/questions`);
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    return response.json();
  }

  // Admin: Add question
  async addQuestion(questionData) {
    const response = await fetch(`${API_BASE_URL}/admin/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    });
    if (!response.ok) {
      throw new Error('Failed to add question');
    }
    return response.json();
  }

  // Admin: Delete question
  async deleteQuestion(id) {
    const response = await fetch(`${API_BASE_URL}/admin/questions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete question');
    }
  }
}

export default new QuizApiService();