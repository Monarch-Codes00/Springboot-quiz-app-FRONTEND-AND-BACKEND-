package com.aptechph.task_management_system.tasks.controller;

import com.aptechph.task_management_system.tasks.dto.*;
import com.aptechph.task_management_system.tasks.model.Question;
import com.aptechph.task_management_system.tasks.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // Admin: Get all questions
    @GetMapping("/admin/questions")
    public ResponseEntity<List<QuestionResponseDto>> getAllQuestions() {
        List<Question> questions = quizService.getAllQuestions();
        List<QuestionResponseDto> dtos = questions.stream().map(this::toResponseDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Admin: Add question
    @PostMapping("/admin/questions")
    public ResponseEntity<QuestionResponseDto> addQuestion(@RequestBody QuestionRequestDto dto) {
        Question question = new Question();
        question.setQuestionText(dto.getQuestionText());
        question.setOption1(dto.getOption1());
        question.setOption2(dto.getOption2());
        question.setOption3(dto.getOption3());
        question.setOption4(dto.getOption4());
        question.setCorrectOption(dto.getCorrectOption());
        Question saved = quizService.addQuestion(question);
        return ResponseEntity.ok(toResponseDto(saved));
    }

    // Admin: Delete question
    @DeleteMapping("/admin/questions/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        quizService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    // User: Get questions for quiz
    @GetMapping("/questions")
    public ResponseEntity<List<QuestionResponseDto>> getQuizQuestions() {
        List<Question> questions = quizService.getAllQuestions();
        List<QuestionResponseDto> dtos = questions.stream().map(this::toResponseDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // User: Submit quiz
    @PostMapping("/submit")
    public ResponseEntity<QuizResultDto> submitQuiz(@RequestBody QuizSubmitRequestDto dto) {
        QuizResultDto result = quizService.submitQuiz(dto.getAnswers());
        return ResponseEntity.ok(result);
    }

    private QuestionResponseDto toResponseDto(Question question) {
        return new QuestionResponseDto(question.getId(), question.getQuestionText(),
                question.getOption1(), question.getOption2(), question.getOption3(), question.getOption4());
    }
}