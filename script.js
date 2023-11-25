document.addEventListener('DOMContentLoaded', function () {
    const quizForm = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');
    const submitButton = quizForm.querySelector('button[type="submit"]');
    const soundEffect = new Audio('saul.mp3');
    const incorrectSoundEffect = new Audio('incorrect.mp3'); 
    const answers = ['A', 'B', 'C', 'B', 'A'];

    function handleFormSubmit(event) {
        event.preventDefault();

        document.querySelectorAll('.question').forEach(questionDiv => {
            questionDiv.classList.remove('correct-answer', 'incorrect-answer');
        });

        let score = 0;

        answers.forEach((answer, i) => {
            const question = document.querySelector(`input[name="q${i + 1}"]:checked`);
            const correctOption = document.getElementById(`q${i + 1}${answer.toLowerCase()}`);
            const questionDiv = correctOption.closest('.question');

            if (question) {
                if (question.value === answer) {
                    score++;
                    questionDiv.classList.add('correct-answer');
                } else {
                    questionDiv.classList.add('incorrect-answer');
                }
            }

            if (!question && correctOption) {
                correctOption.closest('.question').classList.add('correct-answer');
            }
        });

        resultDiv.innerHTML = `<p class="quiz-result">Your score is: ${score}/${answers.length}</p>`;

        if (score === answers.length) {
            soundEffect.play();
        }
        else {
            incorrectSoundEffect.play();
        }
    }

    quizForm.addEventListener('submit', handleFormSubmit);

    document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleFormSubmit(e);
        }
    });

    document.querySelectorAll('.question').forEach(question => {
        question.addEventListener('click', function() {
            this.classList.add('question-clicked');
    
            setTimeout(() => {
                this.classList.remove('question-clicked');
            }, 700);
        });
    });
    
    submitButton.addEventListener('mouseover', function () {
        this.style.transform = 'scale(1.25)';
        this.style.transition = 'transform 0.2s';
    });

    submitButton.addEventListener('mouseout', function () {
        this.style.transform = 'scale(1)';
        this.style.transition = 'transform 0.2s';
    });
});
