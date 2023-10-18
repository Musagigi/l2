function modals() {

	// если хоть одна кнопка будет нажата
	// модлка в конце сайта не сработает
	let isButtonPressed = false

	function bindModal(btnOpenSelector, modalSelector, btnCloseSelector, destroy = false) {

		const btnOpen = document.querySelectorAll(btnOpenSelector)
		const modal = document.querySelector(modalSelector)
		const btnClose = document.querySelector(btnCloseSelector)
		const popupWindows = document.querySelectorAll('[data-modal]')

		btnOpen.forEach(elem => {
			// подписываемся на все кнопки
			elem.addEventListener('click', (e) => {

				if (e.target) {
					e.preventDefault()
					isButtonPressed = true
				}

				if (destroy) {
					elem.remove()
				}

				// сначлаа удаляем везде дисплей
				closePopupWindows(popupWindows)

				// отображаем переданный селектор
				modal.style.display = 'block'
				document.body.style.overflow = 'hidden'
			})
		})

		// закрытие попап окна при клике на кнопку
		btnClose.addEventListener('click', () => {

			closePopupWindows(popupWindows)
			modalDisplayNone(modal)
		})

		// закрытие попап окна при клике на область
		modal.addEventListener('click', (e) => {
			if (e.target === modal) {

				closePopupWindows(popupWindows)
				modalDisplayNone(modal)
			}
		})
	}

	function closePopupWindows(popupWindows) {
		popupWindows.forEach(elem => {
			elem.style.display = 'none'
			elem.classList.add('animated', 'fadeIn')
		})
	}

	function modalDisplayNone(modal) {
		modal.style.display = 'none'
		document.body.style.overflow = ''
	}

	function showModalByTime(selector, time) {
		// Через n-ое время покажет попап, если не открыты другие попап окна
		setTimeout(() => {
			let display = null

			document.querySelectorAll('[data-modal]').forEach(elem => {
				if (getComputedStyle(elem).display !== 'none') {
					display = 'block'
				}
			})

			if (!display) {
				document.querySelector(selector).style.display = 'block';
				document.body.style.overflow = 'hidden';
			}
		}, time)
	}


	function scrollBottom(selector) {
		// Доскролив до конца страница, если не была нажата хоть одна кнопка, покажет попап
		window.addEventListener('scroll', function () {

			if (!isButtonPressed && window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
				document.querySelector(selector).click()
			}
		})
	}


	bindModal('.button-design', '.popup-design', '.popup-design .popup-close')
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true)
	bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close')
	showModalByTime('.popup-consultation', 60000)
	scrollBottom('.fixed-gift')
}

export default modals;