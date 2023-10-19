import { modals } from "./modules/modals.js";
import { forms } from "./modules/forms.js";
import { showMoreCards } from "./modules/showMoreCards.js";

window.addEventListener('DOMContentLoaded', function () {

	modals()
	forms()
	showMoreCards('.button-styles', '.styles-2')
})