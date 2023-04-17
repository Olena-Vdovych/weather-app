const changeBackground = () => {
    const body = document.querySelector('body');
    const now = new Date();
    const hour = now.getHours();

    let text = '';

    if (hour > 5 && hour < 11) {
        body.style.backgroundImage = 'url(images/morning.jpg)';
        text = 'Good morning!';
    } else if (hour >= 11 && hour < 17) {
        body.style.backgroundImage = 'url(images/day.jpg)';
        text = 'Good day!';
    } else if (hour >= 17 && hour < 23 ) {
        body.style.backgroundImage = 'url(images/sunset.jpg)';
        text = 'Good evening!';
    } else {
        body.style.backgroundImage = 'url(images/night.jpg)';
        text = 'Good night!';
    }

    const textElement = document.createElement('div');
    textElement.textContent = text;
    textElement.classList.add('greeting');
    body.appendChild(textElement);
};
changeBackground();