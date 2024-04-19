

type WelcomeProps = {
    nextScreen: () => void;
}

const Welcome = (props : WelcomeProps ) => {



    return (
        <section>
            <h2>Välkommen till denna quiz!</h2>
            <p>Vill du sätt igång?</p>
            <button onClick={props.nextScreen}>Starta</button>
        </section>
    )

}

export default Welcome;