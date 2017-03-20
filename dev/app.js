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
			clearResults: [],
			showTextArea: true,
			showCardName: false, 
			showCardImage: false,
			showReturnedQuestion: false,
			showAskTarotButton: true,
			showAskAnotherQuestionButton: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.getTarotData = this.getTarotData.bind(this);
		this.resetInputs = this.resetInputs.bind(this);
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
		this.setState({
			showCardImage: true,
			showTextArea: false,
			showCardName: true,
			showReturnedQuestion: true,
			showAskTarotButton: false,
			showAskAnotherQuestionButton: true
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

	resetInputs(e) {
		// clears all tarot data by reloading the page
		e.preventDefault();		
		window.location = '';
	}

	render() {
		const shouldShowTextArea = () => {
			if (this.state.showTextArea === true) {
				return (
					<div>
						<label htmlFor="inputQuestion">What would you like to ask the tarot?</label>
						<textarea name="question" id="" ref="clearMe" value={this.state.inputEmpty} onChange={this.handleChange}>
						</textarea>			
					</div>
				)
			} else {
				return null
			}
		}
		const shouldShowReturnedQuestion = () => {
			if (this.state.showReturnedQuestion === true) {
				return (
					<div className="returnedQuestion">
						{this.state.question.map((userInput,i) => {
							return <p key={`userInput-${i}`}>{ userInput }</p>
							})}
					</div>
				)
			} else {
				return null
			}
		}

		const shouldShowCardName = () => {
			if (this.state.showCardName === true) {
				return (
					<h3>
						{this.state.displayData.cardName}
					</h3>
				)
			} else {
				return null
			}
		}
		const shouldShowCardImage = () => {
			if (this.state.showCardImage === true) {
				return (
					<div className="cardImage">
						<img src={`../../assets/${this.state.displayData.cardImage}`} alt=""/>
					</div>
				)
			} else {
				return null
			}
		}
		const shouldShowAskTarotButton = () => {
			if (this.state.showAskTarotButton === true) {
				return (
				<button onClick={this.getTarotData} className="submit">Ask the tarot</button>
				)
			} else {
				return null
			}
		}
		const shouldShowAskAnotherQuestionButton = () => {
			if (this.state.showAskAnotherQuestionButton === true) {
				return (
				<button onClick={this.resetInputs}>Ask another question</button>
				)
			} else {
				return null
			}
		}
		return (
			<main>
				<div className="inputContainer">

					<div className="textContainer">
						<h1>ASK THE TAROT</h1>
						<form onSubmit={this.addQuestion}>
							{shouldShowTextArea()}
							{shouldShowReturnedQuestion()}
							<div className="cardText">
								{shouldShowCardName()}
								<p>
									{this.state.displayData.description}
								</p>
							</div>
							{shouldShowAskTarotButton()}
							{shouldShowAskAnotherQuestionButton()}
						</form>
					</div>
				</div> 

				<div className="cardImageContainer">
					{shouldShowCardImage()}
				</div>
			</main>
		);
	}

} // class App extends React.Component

ReactDOM.render(<App />, document.getElementById('app'));