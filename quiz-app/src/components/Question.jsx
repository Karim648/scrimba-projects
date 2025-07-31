import he from "he";
import clsx from "clsx";
import { useMemo } from "react";

export function Question({ question, id, showResults, userAnswer }) {

    const { question: rawQuestion, correct_answer, incorrect_answers } = question;
    const decodedQuestion = he.decode(rawQuestion);
    const questionNum = `Question ${(id + 1)}`;

    function shuffle(arr) {
        const copy = [...arr]; 
        for (let i = copy.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
        }
        return copy;
    }
    
    const shuffledAnswers = useMemo(() => { 
        const answers = [...incorrect_answers, correct_answer]; 
        return shuffle(answers);
    }, [question])  

    const mixedQuestions = shuffledAnswers.map((answer, index) => (
        <label 
            key={index}
            className={clsx ({  
                correct: showResults && answer === correct_answer,  
                wrong: showResults && answer === userAnswer && answer !== correct_answer  
            })}
        >
        {he.decode(answer)}
            <input 
                type="radio" 
                name={questionNum} 
                id={questionNum} 
                value={answer}
            />
        </label>
    ))

    return (
        <section className="question-section">
            <h2 className="question">{decodedQuestion}</h2>        
            <fieldset>
                {mixedQuestions}
            </fieldset>                
        </section>
    )
}