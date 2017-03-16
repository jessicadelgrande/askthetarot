import React from 'react';
import ReactDOM from 'react-dom';
// import { ajax } from 'jquery';
// import backOfCard from './some-directory/backOfCard.png';

import getRandomNumber from './randomCard';

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
			submit: []
		}
		this.submit = this.submit.bind(this);
	};
	handleClick(e) {
		e.preventDefault();
		console.log('I was clicked');
	}
	submit(e) {
		e.preventDefault();
		if(this.state.submit !== "") {
			// const submit = 
		}
	}
	handleChange(e) {
		this.setState({
			// [e.target.name]: e.target.value;
			// e.target.name = references name that we have called the input below. Use the NAME of the value stored in order to access the proper key. This is easier than writing onChange for all events.
		});
	}

	// addTodo(e) {
	// 	e.preventDefault();
	// 	if(this.state.todo !== "") {
	// 		// check to see if the todo state is empty
	// 		const todoState = Array.from(this.state.todos);
	// 		// make an array from this.state.todos (a copy)
	// 		// never alter original state. copy it and add to it. never mutate original state.
	// 		todoState.push(this.state.todo);
	// 		this.setState({
	// 			todos: todoState,
	// 			todo: ""
	// 		});
	// 	}
	// }

	
	render() {
		return (
			<main>
				<div className="inputContainer">
					<h1>ASK THE TAROT</h1>
					<form onSubmit={this.addQuestion} name="userQuestion">
						<label htmlFor="inputQuestion">What would you like to ask the tarot?</label>
						<textarea name="question" id="" cols="30" rows="10"></textarea>
						<button onClick={this.handleClick} className="submit">Ask the tarot</button>
					</form>

				</div>
				<div className="cardContainer">
					<div className="cardImage">
						tarot card goes here
					</div>
				</div>
				<div className="responseContainer">
					<p>
						The tarot says 
						{/*
						this.state.card.cardDescription
						*/}
					</p>
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
	componentDidMount() {
		const dbRef = firebase.database().ref();
			console.log("yay data", dbRef);
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