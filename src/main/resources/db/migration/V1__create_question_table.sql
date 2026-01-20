CREATE TABLE IF NOT EXISTS question (
    id BIGSERIAL PRIMARY KEY,
    question_text VARCHAR(500) NOT NULL,
    option1 VARCHAR(255) NOT NULL,
    option2 VARCHAR(255) NOT NULL,
    option3 VARCHAR(255) NOT NULL,
    option4 VARCHAR(255) NOT NULL,
    correct_option INTEGER NOT NULL CHECK (correct_option BETWEEN 1 AND 4)
);