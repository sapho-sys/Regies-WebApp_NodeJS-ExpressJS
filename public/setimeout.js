document.addEventListener('DOMContentLoaded', function() {
	let greetMsg = document.querySelector('.error');

	if (greetMsg.innerHTML !== '') {
		setTimeout(function() {
			greetMsg.innerHTML = '';

		}, 5000);
	}
});