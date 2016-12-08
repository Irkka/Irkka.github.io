<mtg>
	<section id="deck-friend">
		<aside id="deck-friend-sidebar">
			<nav id="deck-navigator">
				<button each={ deck, index in decks } onclick={ chooseDeck }>{ deck.name } | { deck.format }</button>
			</nav>
		</aside>
		<div id="deck-view">
			<h1 id="deck-name">{ chosenDeck.name }</h1>
			<p id="deck-description">{ chosenDeck.description }</p>
			<section id="card-list">
				<h2 class="card-type">Land</h2>
				<ul id="deck-lands">
					<li class="deck-card" each={ card, index in chosenDeck.cards.lands } on mouseover={ chooseCard } onmouseout={ clearChosenCard }>{ card.name }</li>
				</ul>
				<h2 class="card-type">Creatures</h2>
				<ul id="deck-creatures">
					<li class="deck-card" each={ card, index in chosenDeck.cards.creatures } on mouseover={ chooseCard } onmouseout={ clearChosenCard }>{ card.name }</li>
				</ul>
				<h2 class="card-type">Enchantments</h2>
				<ul id="deck-enchantments">
					<li class="deck-card" each={ card, index in chosenDeck.cards.enchantments } on mouseover={ chooseCard } onmouseout={ clearChosenCard }>{ card.name }</li>
				</ul>
				<h2 class="card-type">Artifacts</h2>
				<ul id="deck-artifacts">
					<li class="deck-card" each={ card, index in chosenDeck.cards.artifacts } on mouseover={ chooseCard } onmouseout={ clearChosenCard }>{ card.name }</li>
				</ul>
				<h2 class="card-type">Sorceries</h2>
				<ul id="deck-sorceries">
					<li class="deck-card" each={ card, index in chosenDeck.cards.sorceries } on mouseover={ chooseCard } onmouseout={ clearChosenCard }>{ card.name }</li>
				</ul>
				<h2 class="card-type">Instants</h2>
				<ul id="deck-instants">
					<li class="deck-card" each={ card, index in chosenDeck.cards.instants } on mouseover={ chooseCard } onmouseout={ clearChosenCard }>{ card.name }</li>
				</ul>
			</section>
			<section id="card-details">
				<img src={ chosenCard.imageUrl } alt={ chosenCard.name }>
			</section>
		</div>
	</section>

	<script>
		const Mtg = require('mtgsdk')

		this.decks = []
		this.chosenDeck = {}
		this.chosenCard = {}

		opts.mtg.decks.forEach((deck) => {
			let returnedCards = []
			deck.cards = {}

			Promise.all(deck.cardNames.map((cardName) => {
				return Mtg.card.where({ name: cardName })
			}))
			.then((cards) => {
				// Each card can have multiple printings
				returnedCards = cards.map((card) => {
					return card[0]
				})

				deck.cards.lands = returnedCards.filter((card) => { return card.types[0] == 'Land' })
				deck.cards.creatures = returnedCards.filter((card) => { return card.types[0] == 'Creature' })
				deck.cards.enchantments = returnedCards.filter((card) => { return card.types[0] == 'Enchantment' })
				deck.cards.artifacts = returnedCards.filter((card) => { return card.types[0] == 'Artifact' })
				deck.cards.sorceries = returnedCards.filter((card) => { return card.types[0] == 'Sorcery' })
				deck.cards.instants = returnedCards.filter((card) => { return card.types[0] == 'Instant' })
			})
			.then(() => {
				this.decks.push(deck)
				this.chosenDeck = this.decks[0]
				this.update()
			})
		})

		chooseCard(event) {
			let card = event.item.card

			this.chosenCard = card
		}

		clearChosenCard(event) {
			this.chosenCard = {}
		}

		chooseDeck(event) {
			let deck = event.item.deck

			this.chosenDeck = deck
		}
	</script>
</mtg>
