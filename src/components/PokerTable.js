import React, { Component } from 'react';
import Deck from '../utilityClasses/Deck';
import PokerHand from './PokerHand';
import GameButtons from './GameButtons';
import ThePot from './ThePot';


var cards = new Deck();
// console.log(cards.deck);
// cards.createDeck();
// console.log(cards.deck);
// cards.shuffleDeck();
// console.log(cards.deck);

class PokerTable extends Component{
	constructor(props){
		super(props);
		this.state = {
			dealersHand: ['deck','deck'],
			playersHand: ['deck','deck'],
			communityCards: ['deck','deck','deck','deck','deck'],
			wager: 0,
			bankRoll: 1000
		}
		this.prepDeck = this.prepDeck.bind(this);
		this.draw = this.draw.bind(this);
		this.playerBet = this.playerBet.bind(this);
	}

	componentDidMount(){
		// this.prepDeck();
	}

	// This stuff is specific to OUR game of Holdem. 
	// Deck is outsourced and can be used for ANY game that needs a shuffled deck of cards
	prepDeck(){
		cards.createDeck();
		cards.shuffleDeck();
		// the cards.deck is now ready for a new hand!
		// set up the playersHand and the dealersHand
		var card1 = cards.deck.shift();
		var card2 = cards.deck.shift();
		var card3 = cards.deck.shift();
		var card4 = cards.deck.shift();
		// cards.deck now has a length of 48 because we mutated it 4 times with shift!
		var playersHand = [card1, card3];
		var dealersHand = [card2, card4];
		this.setState({
			playersHand: playersHand,
			dealersHand: dealersHand
		})
	}

	// This method will be sent to GameButtons, and is used to update the players bet.
	// We will call draw, after they have bet
	playerBet(amount){
		const newWager = this.state.wager + amount;
		this.setState({
			wager: newWager
		});
		this.draw();
	}


	// This method is called whenever a new community card must be drawn.
	// It is always called after a betting round is finished (except for the last)
	draw(){
		var communityNewHand = this.state.communityCards;
		if(communityNewHand[0] === 'deck'){
			// start over and push 3 cards off teh top of the dekc, onto our array	
			communityNewHand = [cards.deck.shift(),cards.deck.shift(),cards.deck.shift()];
		}else{
			// push
			communityNewHand.push(cards.deck.shift());
		}
		this.setState({
			communityCards: communityNewHand
		})
	}

	render(){
		console.log(this.state.playersHand);
		return(
			<div className="col-sm-12 the-table">
				<ThePot wager={this.state.wager} />
				<PokerHand cards={this.state.dealersHand} />
				<PokerHand cards={this.state.communityCards} />
				<PokerHand cards={this.state.playersHand} />
				<GameButtons dealFunction={this.prepDeck} betFunction={this.playerBet} />
			</div>
		)
	}

}

export default PokerTable;