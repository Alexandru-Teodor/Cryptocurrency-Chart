function show(option) {
    document.querySelector('.textBox').value = option;
}

let dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('active');
})
