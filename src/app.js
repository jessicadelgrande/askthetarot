import React from 'react';
import ReactDOM from 'react-dom';

const config = {
  apiKey: "AIzaSyAFTZPpg6ZN0PZiZv36NZWNkZ866zSZgAI",
  authDomain: "askthetarot-1ba68.firebaseapp.com",
  databaseURL: "https://askthetarot-1ba68.firebaseio.com",
  storageBucket: "askthetarot-1ba68.appspot.com",
  messagingSenderId: "806129401699"
};

firebase.initializeApp(config);

function randomNumber() {
	const generatedNumber = Math.floor(Math.random() * 3);
	return generatedNumber;
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			question: [],
			inputEmpty: "",
			displayData: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		// this.randomNumber = this.randomNumber.bind(this);
	};

	componentDidMount() {
		const dbRef = firebase.database().ref();
			console.log("yay data", dbRef);
			// this gives me the entire database in strange Firebase code
		dbRef.on('value', (data) => {
			const usefulData = data.val();
			console.log(usefulData, "useful data");
			this.setState({
				displayData: usefulData[randomNumber()]
			});
			console.log("here is the data", this.state.displayData);
			// this gives me the value in English of the unreadable Firebase database objects
		});
	}

	handleChange(e) {
		this.setState({
			inputEmpty: e.target.value
			// setState on the input when there is content added
		});
	}
	addQuestion(e) {
		e.preventDefault();
		const inputEmptyState = Array.from(this.state.question);
		inputEmptyState.push(this.state.inputEmpty);
		randomNumber();
		this.setState({
			question: inputEmptyState
			// when the form is submitted, add the user input to the 'question' element
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

				<div className="cardText">
					<h2>
						{this.state.displayData.description}
					</h2>
				</div>

			</main>
		)
	}


}



ReactDOM.render(<App />, document.getElementById('app'));