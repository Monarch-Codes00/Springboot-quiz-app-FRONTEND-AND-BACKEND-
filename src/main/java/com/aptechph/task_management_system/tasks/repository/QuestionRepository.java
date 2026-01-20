package com.aptechph.task_management_system.tasks.repository;

import com.aptechph.task_management_system.tasks.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}