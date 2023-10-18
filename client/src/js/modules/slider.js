class SliderImage {

	index = 0

	constructor(images, removeAddSelector) {
		this.images = images
		this.removeAddSelector = removeAddSelector
	}

	slide(number) {

		let imageCurrent = this.getImageCurrent(number)

		this.sliderToggle(imageCurrent, this.images[this.index], this.removeAddSelector)
	}

	getImageCurrent(number) {

		let imageCurrent = this.images[this.index]
		this.index += number;

		if (this.index < 0) {
			this.index = this.images.length - 1
		}
		if (this.index >= this.images.length) {
			this.index = 0
		}

		return imageCurrent
	}

	sliderToggle(imgCurrent, imgNext, removeAddSelector) {

		imgCurrent.classList.remove(removeAddSelector)
		imgNext.classList.add(removeAddSelector)
	}
}


class SliderImageAnimated extends SliderImage {

	#isStop = false

	#imgMoveToLeft = [
		{ transform: 'translateX(0) scale(1)' },
		{ transform: 'translateX(-100%) scale(0.8)' }
	]
	#imgMoveToRight = [
		{ transform: 'translateX(0) scale(1)' },
		{ transform: 'translateX(100%) scale(0.8)' },
	]

	constructor(images, removeAddSelector) {
		super(images, removeAddSelector)
	}

	slide(number) {

		if (this.#isStop) {
			return
		}

		let imageCurrent = super.getImageCurrent(number)
		let isNext = number > 0

		this.#sliderToggleAnimate(imageCurrent, this.images[this.index], this.removeAddSelector, isNext)
	}

	#sliderToggleAnimate(imgCurrent, imgNext, removeAddSelector, isNext) {

		this.#isStop = true
		super.sliderToggle(imgCurrent, imgNext, removeAddSelector)

		imgCurrent.animate(isNext ? this.#imgMoveToLeft : this.#imgMoveToRight, { duration: 500 })

		let anim = imgNext.animate(isNext ? this.#imgMoveToRight : this.#imgMoveToLeft, { duration: 500, direction: 'reverse' })

		anim.addEventListener('finish', () => {
			this.#isStop = false
		})
	}
}


class SliderImageAutoScroll {

	#auto = null
	// в слайдер принимаем экземпляр класса конструктора SliderImage 
	// понятие - внедрение зависимости
	constructor(slider) {
		this.slider = slider
	}

	autoScroll(number, delay) {

		this.#auto = setInterval(() => {
			this.slider.slide(number)
		}, delay);
	}

	stopAutoScroll() {
		clearInterval(this.#auto)
	}
}


function createSlider(imagesSelector, removeAddSelecotr, Class, bntPrevSelector, bntNextSelector) {

	let images = document.querySelectorAll(imagesSelector)
	let instanceClass = new Class(images, removeAddSelecotr)

	if (bntPrevSelector && bntNextSelector) {
		let btnPrev = document.querySelector(bntPrevSelector)
		let btnNext = document.querySelector(bntNextSelector)

		btnPrev.addEventListener('click', function () {
			instanceClass.slide(-1)
		})
		btnNext.addEventListener('click', function () {
			instanceClass.slide(1)
		})
	}

	return instanceClass;
}

//СЛАЙДЕР №1
let simpleSlider = createSlider('.main-slider-item', 'showed', SliderImageAnimated)

let simpleAutoScrollSlider = new SliderImageAutoScroll(simpleSlider)
simpleAutoScrollSlider.autoScroll(-1, 3500)


//СЛАЙДЕР №2
let animatedSlider = createSlider('.feedback-slider-item', 'showed', SliderImageAnimated, '.main-prev-btn', '.main-next-btn')

let animateAutoScrollSlider = new SliderImageAutoScroll(animatedSlider)
animateAutoScrollSlider.autoScroll(1, 3500)

let aimSlider = document.querySelector('.feedback-slider')

aimSlider.addEventListener('mouseenter', function (event) {
	animateAutoScrollSlider.stopAutoScroll()
})
aimSlider.addEventListener('mouseleave', function (event) {
	animateAutoScrollSlider.autoScroll(1, 3500)
})