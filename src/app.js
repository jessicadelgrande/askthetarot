import React from 'react';
import ReactDOM from 'react-dom';
// import randomNumber from './RandomCard';

const config = {
  apiKey: "AIzaSyAFTZPpg6ZN0PZiZv36NZWNkZ866zSZgAI",
  authDomain: "askthetarot-1ba68.firebaseapp.com",
  databaseURL: "https://askthetarot-1ba68.firebaseio.com",
  storageBucket: "askthetarot-1ba68.appspot.com",
  messagingSenderId: "806129401699"
};

firebase.initializeApp(config);

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			question: [],
			inputEmpty: ""
			// cardName: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.randomNumber = this.randomNumber.bind(this);
	};

	componentDidMount() {
		const dbRef = firebase.database().ref();
			console.log("yay data", dbRef);
		dbRef.on('value', (data) => {
			const usefulData = data.val();
			console.log(usefulData);
		});
	}

	handleChange(e) {
		this.setState({
			inputEmpty: e.target.value
		});
	}
	addQuestion(e) {
		e.preventDefault();
		const inputEmptyState = Array.from(this.state.question);
		inputEmptyState.push(this.state.inputEmpty);
		this.setState({
			question: inputEmptyState
		});
	}
	randomNumber(e) {
		let randomNumber = Math.floor(Math.random() * 3);
		console.log(randomNumber);
		let chooseCard = firebase.database().ref(randomNumber);
		console.log(chooseCard);
		chooseCard.on('value', (data) => {
			let cardData = data.val();
			console.log(cardData);
		});
	}

	render() {
		return (
			<main>
				<div className="inputContainer">
					<h1>ASK THE TAROT</h1>
					<form onSubmit={this.addQuestion}>
						<label htmlFor="inputQuestion">What would you like to ask the tarot?</label>
						<textarea name="question" id="" cols="30" rows="10" value={this.state.inputEmpty} onChange={this.handleChange}>
						</textarea>
						<button onClick={this.randomNumber} className="submit">Ask the tarot</button>
					</form>
				</div>

				<div className="returnedQuestion">
					{this.state.question.map((userInput,i) => {
						return <p key={`userInput-${i}`}>{ userInput }</p>
						})}
				</div>

				<div className="cardImage__container">
					<div className="cardImage">
						
					</div>
				</div>

				<div className="cardText__container">
					<h2>{this.cardData.props.cardName}</h2>
				</div>

				
			{/*

			// Card Container
			<div>
				{
					this.state.card
					? <img src={this.state.card.cardImage} alt="" />
					: <img src={backOfCard} alt=""/>
				}
			</div>

			*/}

			</main>
		)
	}


	//	1. user enters a question in textbox
	//	2. user clicks submit
	//	3. user question is returned

	userClick () {
		// -- "MVP" we want a card from the Database
		// 1. We need a random number generated in order to get a tarot card back from firebase
		// 2. We then need to pass that random number to a call to firebase, so it returns a card
		// 3. Store the returned value from firebase in state
		// 4. Render in a span or p the name of the card

		// -- Render the image asset (and maybe explore animations??????)
		// 1. Render the image in our right div
		// 2. Toggle whether we have back of card or front of card based on if we have a card in state

		// -- We want to save user input and returned card to their profile
		/* "Payload" -- the data sent to Firebase
			{
				text: this.state.text, ''
				card: this.state.card,
				timestamp: new Date()
			}

		*/ 
	}
}



ReactDOM.render(<App />, document.getElementById('app'));