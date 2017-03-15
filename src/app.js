import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
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
		// this.state = {
		// 	card: []
		// }
	};
	
	render() {
		return (
			<main>
				<div className="inputContainer">
					<h1>ASK THE TAROT</h1>
					<form action="" name="userQuestion">
						<label htmlFor="inputQuestion"></label>
						<textarea name="inputQuestion" id="" cols="30" rows="10"></textarea>
						<input type="submit" value="Ask the tarot" onClick={this.userClick}/>
					</form>
				</div>
				<div className="cardContainer">
					<div className="cardImage">
						tarot card goes here
					</div>
				</div>
				<div className="responseContainer">
					<p>
						The tarot says {this.state.card.cardDescription}
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
		dbRef.onClick()
			console.log("yay data", dbRef.onClick());
	}

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