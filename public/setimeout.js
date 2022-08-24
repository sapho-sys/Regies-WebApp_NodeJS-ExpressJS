document.addEventListener('DOMContentLoaded', function() {
	let errorMsg = document.querySelector('.error');

	if (errorMsg.innerHTML !== '') {
		setTimeout(function() {
			errorMsg.innerHTML = '';

		}, 5000);
	}
});