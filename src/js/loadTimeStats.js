(function() {
    window.addEventListener('load', function() {
        const [navigation] = performance.getEntriesByType('navigation');
        const loadTime = (navigation.domContentLoadedEventEnd - navigation.startTime) / 1000;
        const loadTimeElement = document.createElement('div');
        loadTimeElement.style.textAlign = 'center';
        loadTimeElement.style.marginTop = '10px';
        loadTimeElement.style.marginBottom = '20px';
        loadTimeElement.textContent = `Page load time is: ${loadTime.toFixed(3)} seconds`;

        // const footer = document.querySelector('footer');
        // footer.appendChild(loadTimeElement);

        const dateElement = document.getElementById('current-date');
        dateElement.insertAdjacentElement('afterend', loadTimeElement);
    });
})();