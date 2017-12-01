import React from 'react';
import Card from './Card';

// This is going to do nothing but show cards
function PokerHand(props){
	var hand = [];
	props.cards.map((card,index)=>{
		hand.push(<Card key={index} card={card} />)
	})
	return(
		<div className="col-sm-12">
			{hand}
		</div>
	)
}

export default PokerHand;