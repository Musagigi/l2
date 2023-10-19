import { modals } from "./modules/modals.js";
import { forms } from "./modules/forms.js";
import { showMoreCards } from "./modules/showMoreCards.js";
import { calc } from "./modules/calc.js";

window.addEventListener('DOMContentLoaded', function () {

	modals()
	showMoreCards('.button-styles', '.styles-2')
	// let result = calc('#size', '#material', '#options', '.promocode', '.calc-price')
	// forms(result)
})