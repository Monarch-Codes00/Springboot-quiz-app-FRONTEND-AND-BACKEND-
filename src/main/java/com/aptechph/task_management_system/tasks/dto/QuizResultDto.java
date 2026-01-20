package com.aptechph.task_management_system.tasks.dto;

public class QuizResultDto {
    private int score;
    private int totalQuestions;

    public QuizResultDto() {}

    public QuizResultDto(int score, int totalQuestions) {
        this.score = score;
        this.totalQuestions = totalQuestions;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }
}