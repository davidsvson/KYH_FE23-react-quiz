import { useEffect, useState } from "react";


interface Question {
    type : string;
    difficulty : string;
    category : string;
    question : string;
    correct_answer : string;
    incorrect_answers : string[]; 
}

interface APIresult {
    response_code : number;
    results : Question[]
}

type GameProps = {
    showResult: () => void;
    answeredCorrectly : () => void;
}

const Game = (props: GameProps ) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0); 
    const [selectedAnswer, setSelectedAnswer ] = useState<number | null>(null);
    const [questions, setQuestions] = useState<Question[] | null>(null);

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://opentdb.com/api.php?amount=10');
                const jsonData = (await response.json()) as APIresult ;
                setQuestions(jsonData.results);
                console.log(jsonData.results);
            } catch (error) {
                console.log("error fetching");
            };
        }

        fetchData();

    }, []);

    if (!questions) {
        return <div>Loading...</div>
    }

    const question : Question = questions[currentQuestion];

    //const answers = [...question.incorrect_answers, question.correct_answer];
    // shuffle:
    const answers = question.incorrect_answers;
    const randomIndex = Math.floor( Math.random() * answers.length + 1);
    answers.splice(randomIndex, 0, question.correct_answer);
    
    const options = answers.map((answer, index) => (
        <p key={index}>
            <label>
                <input type="radio" name="answers" onClick={() => setSelectedAnswer(index)} />
                {answer}
            </label>
        </p>
    ));


    const handleDecided = () => {
        if (!selectedAnswer)
            return;

        // kolla om rätt
        if(answers[selectedAnswer] === question.correct_answer) {
            props.answeredCorrectly();
        }

        // byt fråga
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // gå vidare till result
            props.showResult();
        }
    }

    return (
        <section>
            <h3>{question.question}</h3>
            {options}
            <button onClick={handleDecided}>Svara</button>
        </section>
    )
}

export default Game;