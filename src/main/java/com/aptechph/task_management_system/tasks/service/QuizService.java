package com.aptechph.task_management_system.tasks.service;

import com.aptechph.task_management_system.tasks.dto.AnswerDto;
import com.aptechph.task_management_system.tasks.dto.QuizResultDto;
import com.aptechph.task_management_system.tasks.model.Question;
import com.aptechph.task_management_system.tasks.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuestionRepository questionRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    public QuizResultDto submitQuiz(List<AnswerDto> answers) {
        List<Question> questions = questionRepository.findAll();
        int score = 0;
        for (AnswerDto answer : answers) {
            Question q = questions.stream().filter(qu -> qu.getId().equals(answer.getQuestionId())).findFirst().orElse(null);
            if (q != null && q.getCorrectOption() == answer.getSelectedOption()) {
                score++;
            }
        }
        return new QuizResultDto(score, questions.size());
    }
}