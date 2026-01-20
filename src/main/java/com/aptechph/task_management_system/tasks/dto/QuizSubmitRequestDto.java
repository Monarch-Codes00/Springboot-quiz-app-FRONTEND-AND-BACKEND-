package com.aptechph.task_management_system.tasks.dto;

import java.util.List;

public class QuizSubmitRequestDto {
    private List<AnswerDto> answers;

    public QuizSubmitRequestDto() {}

    public QuizSubmitRequestDto(List<AnswerDto> answers) {
        this.answers = answers;
    }

    public List<AnswerDto> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerDto> answers) {
        this.answers = answers;
    }
}