// copyright João Sousa 2022 //
const iobs = document.querySelectorAll("[data-anim]");

const options = {
    root: null,
    threshold: 0,
    rootMargin: "0px"

}

observer = new IntersectionObserver((entries) => { 

    entries.forEach(entry => {
        console.log("ok")
        if (entry.intersectionRatio > 0) {

            entry.target.style.animation = `${entry.target.dataset.anim} 0.6s 0.3s forwards ease-out`;
            
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