package com.aptechph.task_management_system.tasks.dto;

public class AnswerDto {
    private Long questionId;
    private int selectedOption;

    public AnswerDto() {}

    public AnswerDto(Long questionId, int selectedOption) {
        this.questionId = questionId;
        this.selectedOption = selectedOption;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public int getSelectedOption() {
        return selectedOption;
    }

    public void setSelectedOption(int selectedOption) {
        this.selectedOption = selectedOption;
    }
}