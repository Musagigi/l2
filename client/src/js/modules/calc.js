export function calc(selectSize, selectMaterial, selectOptions, inputPromocode, resultBlock) {
	const size = document.querySelector(selectSize)
	const material = document.querySelector(selectMaterial)
	const option = document.querySelector(selectOptions)
	const promocode = document.querySelector(inputPromocode)
	const result = document.querySelector(resultBlock)

	let promocodePercent = 30
	let sum = 0

	function getSumValues() {
		if (!size.value || !material.value) {
			result.textContent = 'Выберите размер картины и материал картины'
		}
		else {
			sum = Math.round(parseInt(size.value * material.value))
			inputSumInResult(sum)
		}

		if (size.value && material.value && option.value) {
			sum += parseInt(option.value)
			inputSumInResult(sum)
		}
		if (promocode.value === 'IWANTPOPART') {
			sum = Math.round(((100 - promocodePercent) / 100) * sum)
			inputSumInResult(sum)
		}
	}

	function inputSumInResult(sum) {
		result.textContent = `${sum} р.`
	}

	size.addEventListener('change', getSumValues)
	material.addEventListener('change', getSumValues)
	option.addEventListener('change', getSumValues)
	promocode.addEventListener('input', getSumValues)

}