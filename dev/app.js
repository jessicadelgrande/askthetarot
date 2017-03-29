import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import FlipCard from 'react-flipcard';

const config = {
  apiKey: "AIzaSyAFTZPpg6ZN0PZiZv36NZWNkZ866zSZgAI",
  authDomain: "askthetarot-1ba68.firebaseapp.com",
  databaseURL: "https://askthetarot-1ba68.firebaseio.com",
  storageBucket: "askthetarot-1ba68.appspot.com",
  messagingSenderId: "806129401699"
};

firebase.initializeApp(config);

function randomNumber() {
	const generatedNumber = Math.floor(Math.random() * 22);
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
			showCardDescription: false,
			showReturnedQuestion: false,
			showAskTarotButton: true,
			showAskAnotherQuestionButton: false,
			showFloralImage: true,
		}
		this.handleChange = this.handleChange.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.getTarotData = this.getTarotData.bind(this);
		this.resetInputs = this.resetInputs.bind(this);
	};

	getTarotData() {
		const dbRef = firebase.database().ref();
			// this gives me the entire database in strange Firebase code
		dbRef.on('value', (data) => {
			const usefulData = data.val();
			this.setState({
				displayData: usefulData[randomNumber()]
			});
			// this gives me the value in English of the unreadable Firebase database objects
		});
		this.setState({
			showCardImage: true,
			showTextArea: false,
			showCardName: true,
			showReturnedQuestion: true,
			showCardDescription: true,
			showAskTarotButton: false,
			showAskAnotherQuestionButton: true,
			showFloralImage: false,
		});
	}

	componentDidMount() {
// stuff that fires when the app loads
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
					<div className="textareaParent">
						<p>
							When you're unable to find solutions on your own, the tarot can help you look at things from a new perspective.
						</p>
						<label htmlFor="inputQuestion">What would you like to ask the tarot?</label>
						<textarea name="question" id="" ref="clearMe" value={this.state.inputEmpty} onChange={this.handleChange}>
						</textarea>			
					</div>
				)
			} else {
				return null
			}
		}
		const shouldShowCardName = () => {
			if (this.state.showCardName === true) {
				return (
					<div>
						<div className="questionReturn">
							<p className="textReturn__paragraph">
								You asked:
							</p>
							<p className="textReturn__paragraph">
								<span className="questionSpan">{this.state.inputEmpty}</span>
							</p>
						</div>
						<div>
							<p className="textReturn__paragraph">Your card is:</p><h3><span className="displaySpan animated fadeIn">{this.state.displayData.cardName}</span></h3>
						</div>
						<div className="textReturn__paragraph">
							<a href="#description"><img src="assets/chevron-down.svg" alt=""/></a>
						</div>
					</div>

				)
			} else {
				return null
			}
		}
		const shouldShowCardDescription = () => {
			if (this.state.showCardDescription === true) {
				return (
					<div className="descriptionContainer__lower">
						<p id="description">
							Here's what the tarot would like you to know:
						</p>
						<p className="questionParagraph">
							<span className="questionSpan">{this.state.displayData.description}</span>
						</p>
					</div>
				)
			} else {
				return null
			}
		}
		const shouldShowCardImage = () => {
			if (this.state.showCardImage === true) {
				return (
						<div className="cardWrapperTarot animated fadeIn">
							<img className="animated fadeIn" src={`assets/${this.state.displayData.cardImage}`} alt="randomly selected tarot card"/>
						</div>
				)
			} else {
				return (
					<div className="cardWrapperFloral animated fadeIn">
						<img src="../../assets/OGDRWX0_fit.jpg" alt="floral pattern"/>
					</div>
				)
			}
		}

		const shouldShowAskTarotButton = () => {
			if (this.state.showAskTarotButton === true) {
				return (
				<button onClick={this.getTarotData} className="submit" disabled={!this.state.inputEmpty}>Ask the tarot</button>
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

				<div className="wrapper__upper">
					<div className="inputContainer">
						<div className="textContainer">
							<h1>ASK THE TAROT</h1>
							<form onSubmit={this.addQuestion}>
								{shouldShowTextArea()}
								<div className="returnedQuestion">
									{this.state.question.map((userInput,i) => {
										return <p key={`userInput-${i}`}>{ userInput }</p>
										})}
								</div>
								<div className="cardText">
									{shouldShowCardName()}
								</div>
								{shouldShowAskTarotButton()}
							</form>
						</div>
					</div> 
					<div className="cardImageContainer">
						<div className="cardWrapper">
							{shouldShowCardImage()}
						</div>
					</div>
				</div>

				<div className="wrapper__lower">
					{shouldShowCardDescription()}
					{shouldShowAskAnotherQuestionButton()}
				</div>

				<footer>
					<p>
						&copy; 2017 Jessica Del Grande
					</p>
					<div className="attribution">
						<p>
							Card descriptions used with permission from <a href="http://innerhue.com/">Lauren Aletta</a>.<br />
							Card artwork from the Rider-Waite-Smith tarot deck.
						</p>
					</div>
				</footer>

			</main>


		);
	}

} // class App extends React.Component



ReactDOM.render(<App />, document.getElementById('app'));