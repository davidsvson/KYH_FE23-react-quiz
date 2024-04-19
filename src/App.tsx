import { useState } from 'react'
import './App.css'
import Welcome from './components/Welcome'
import Game from './components/Game';
import Result from './components/Result';


enum Screen {
  WELCOME = 'welcome',
  GAME = 'game',
  RESULT = 'result'
}

function App() {

  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);
  const [score, setScore] = useState<number>(0);
 
  let content : React.ReactElement | null = null


  const restartQuiz = () =>  {
    setScore(0);
    setCurrentScreen(Screen.WELCOME);
  }

  switch( currentScreen ) {
    case Screen.WELCOME:
      content = <Welcome nextScreen={ () => setCurrentScreen(Screen.GAME)  } />
      break;
    case Screen.GAME:
      content = <Game showResult={() => setCurrentScreen(Screen.RESULT)} answeredCorrectly={() => setScore(score + 1)}/>
      break;
    case Screen.RESULT:
      content = <Result score={score} restartQuiz={restartQuiz}/> 
      break;
    default:
      content = null;
  }

  return (
    <>
      {content}
    </>
  )
}

export default App
