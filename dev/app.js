import React from 'react';
import ReactDOM from 'react-dom';
import ToggleDisplay from 'react-toggle-display';

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
			displayData: [],
			clearInput: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.getTarotData = this.getTarotData.bind(this);
		this.clearTextArea = this.clearTextArea.bind(this);
	};

	getTarotData() {
		const dbRef = firebase.database().ref();
			console.log("yay data", dbRef);
			// this gives me the entire database in strange Firebase code
		dbRef.on('value', (data) => {
			const usefulData = data.val();
			console.log("useful data", usefulData);
			this.setState({
				displayData: usefulData[randomNumber()]
			});
			console.log("here is the data", this.state.displayData);
			// this gives me the value in English of the unreadable Firebase database objects
		});
	}

	componentDidMount() {

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

	clearTextArea(e) {
		// clears textarea
		e.preventDefault();
		this.refs.clearMe.value = "";
	}

	// handleClick(e) {
	// 	e.preventDefault();
	// 	this.setState({ show: !this.state.show });
	// }

	render() {
		return (
			<main>
				<div className="inputContainer">

					<div className="textContainer">
						<h1>ASK THE TAROT</h1>
						<form onSubmit={this.addQuestion}>
							<label htmlFor="inputQuestion">What would you like to ask the tarot?</label>
							<textarea name="question" id="" ref="clearMe" value={this.state.inputEmpty} onChange={this.handleChange}>
							</textarea>
							<div className="returnedQuestion">
								{this.state.question.map((userInput,i) => {
									return <p key={`userInput-${i}`}>{ userInput }</p>
									})}
							</div>
							<div className="cardText">
								<h3>
									{this.state.displayData.cardName}
								</h3>
								<p>
									{this.state.displayData.description}
								</p>
							</div>
							<button onClick={this.getTarotData} className="submit">Ask the tarot</button>
							<button onClick={this.clearTextArea} className="">Ask another question</button>
						</form>

					</div>
				</div> 


				<div className="cardImageContainer">
					<div className="cardImage">
						<img src={`../../assets/${this.state.displayData.cardImage}`} alt=""/>
					</div>
				</div>

			</main>
		)
	}

} // class App extends React.Component

ReactDOM.render(<App />, document.getElementById('app'));