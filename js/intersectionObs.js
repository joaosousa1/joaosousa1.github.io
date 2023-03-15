// © João Sousa 2023 //

function intersectionObserver() {
	const iobs = document.querySelectorAll("[data-anim]");

	const options = {
		root: null,
		threshold: 0.1,
		rootMargin: "0px"
	}

	let observer = new IntersectionObserver((entries) => {
		let delay = 0;
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				delay += 0.3;
				entry.target.style.animation = `${entry.target.dataset.anim} 0.6s ${delay}s forwards cubic-bezier(0.18, 0.89, 0.43, 1.19)`;
			}
			else {
				// comentar se quiser só na entrada
				entry.target.style.animation = 'none';
			}
		})

	}, options);

	iobs.forEach(iob => {
		iob.classList.add("hide")
		observer.observe(iob)
	})
}

function initIntersectionObserver() {
	// Safari
	let isSafariBrowser = () => navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') <= -1

	//IntersectionObserver não está totalmente implementado no safari.
	if (isSafariBrowser()) {
		const iobs = document.querySelectorAll("[data-anim]");
		iobs.forEach(iob => {
			iob.classList.remove("hide");
		})
	} else {
		try {
			intersectionObserver()
		} catch (error) {
			const iobs = document.querySelectorAll("[data-anim]");
			iobs.forEach(iob => {
				iob.classList.remove("hide");
			})

		}
	}
}