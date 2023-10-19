export function showMoreCards(btnS, cardsS) {

	let btn = document.querySelector(btnS)
	let cards = document.querySelectorAll(cardsS)

	btn.addEventListener('click', function () {
		cards.forEach(card => {
			card.className = 'col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1'
			card.classList.add('animated', 'fadeInUp')
		});

		btn.remove()
	})
}
