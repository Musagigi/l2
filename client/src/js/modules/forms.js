// import checkNumInputs from "./checkNumInputs";
export function forms(resultCalc) {

	const forms = document.querySelectorAll('form')
	const inputs = document.querySelectorAll('input')
	const upload = document.querySelectorAll('[name="upload"]')

	// checkNumInputs(input[name = "user_phone"])

	const message = {
		loading: 'Загрузка...',
		success: "Спасибо! Скоро мы с вами свяжемся",
		failure: 'Что-то пошло не так...',
		spinner: 'src/assets/img/spinner.gif',
		ok: 'src/assets/img/ok.png',
		fail: 'src/assets/img/fail.png'
	}

	forms.forEach(form => {
		form.addEventListener('submit', handleSubmit)
	})

	function handleSubmit(event) {
		event.preventDefault()

		let textMessage = createTextMessage()
		let statusImg = createStatusImg()
		let statusMessage = createStatusMessage()

		this.parentNode.append(statusMessage)
		this.style.display = 'none'

		statusMessage.append(statusImg)
		statusMessage.append(textMessage)

		const formData = new FormData(this)

		// console.log(resultCalc);
		// if (!isNaN(parseInt(resultCalc))) {
		// 	formData.append('сумма заказа', resultCalc)
		// }

		sendData('http://127.0.0.1:3000', formData)
			.then(response => {
				console.log(response);
				statusImg.setAttribute('src', message.ok)
				textMessage.textContent = message.success
			})
			.catch(() => {
				statusImg.setAttribute('src', message.fail)
				textMessage.textContent = message.failure
			})
			.finally(() => {
				clearInputs()
				setTimeout(() => {
					statusMessage.remove()
					this.classList.add('animated', 'fadeInUp')
					this.style.display = 'block'
				}, 1000)
			})
	}

	async function sendData(url, data) {
		let response = await fetch(url, {
			method: 'POST',
			body: data,
		})

		return await response.text()
	}

	upload.forEach(input => {
		input.addEventListener('input', function () {
			let noFileSelected = input.previousElementSibling
			let fileName = input.files[0].name.split('.')

			if (input.files[0].name.length > 15) {
				noFileSelected.textContent = `${fileName[0].slice(0, 5)}….${fileName[1]}`
			} else {
				noFileSelected.textContent = input.files[0].name
			}
		})
	})

	function createStatusMessage() {
		let statusMessage = document.createElement('div')
		statusMessage.classList.add('status')
		return statusMessage
	}

	function createStatusImg() {
		let statusImg = document.createElement('img')
		statusImg.setAttribute('src', message.spinner)
		return statusImg
	}

	function createTextMessage() {
		let textMessage = document.createElement('div')
		textMessage.textContent = message.loading
		return textMessage
	}

	function clearInputs() {
		inputs.forEach(input => {
			input.value = ''
		})
		upload.forEach(input => {
			input.previousElementSibling.textContent = 'Файл не выбран'
		})
	}
}
