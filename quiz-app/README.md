# Quizzical - React Quiz App

A simple, fun, and interactive quiz app built with React. Test your knowledge with random trivia questions fetched from the Open Trivia Database API. Features include answer shuffling, instant feedback, scoring, and a play-again option.

---

## Features

- Fetches 5 random multiple-choice trivia questions from [Open Trivia Database](https://opentdb.com/api_config.php).
- Questions and answers are HTML decoded for proper display.
- Answers are shuffled using the Fisher-Yates algorithm for a fair challenge.
- Tracks user selections in real-time.
- Shows results with correct and incorrect highlights.
- Displays a score summary.
- Play again option to load a new set of questions.
- Confetti celebration animation on perfect score.
- Loading animation while fetching questions.

---

## Technologies Used

- Fetch API
- React (functional components & hooks)
- he (HTML entity decoder)
- clsx (conditional class names)
- react-confetti (confetti animation)
- DotLottieReact (loading animation)

---

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repo

   ```
   git clone https://github.com/your-username/quizzical.git
   cd quizzical

2. Install dependencies

    ```
    npm install

3. Run the development server

    ```
    npm start

### Project Structure

- /src/components/Quiz.jsx — main quiz logic, question fetching, user answers, scoring, and game state
- /src/components/Question.jsx — individual question rendering, answer shuffling, and answer input
- /src/App.jsx — start screen and rendering of the quiz component
- /public/loading.lottie — loading animation file

### Usage 

- Click Start Quiz! to begin.
- Select an answer for each question.
- The Check Answers button becomes active only when all questions are answered.
- Click Check Answers to see your score and which answers were correct or wrong.
- Click Play Again to load new questions and try again.

### License

MIT License © 2025 Karim Youssef

### Acknowledgments

- Open Trivia Database for the trivia API
- he for HTML entity decoding
- clsx for conditional class names
- react-confetti for confetti animation
- DotLottieReact for loading animation

Feel free to open issues or submit pull requests!



