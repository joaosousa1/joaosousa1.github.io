// copyright João Sousa 2022 //
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
    iob.classList.add("fade")
    observer.observe(iob)
})
