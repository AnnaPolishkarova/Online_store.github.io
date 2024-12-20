document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.createElement('div');
    dateElement.id = 'current-date';
    dateElement.style.textAlign = 'center';
    dateElement.style.marginTop = '10px';
    dateElement.style.marginBottom = '20px';
    document.body.appendChild(dateElement);

    function updateDateTime() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        dateElement.innerHTML = `Today: ${day}.${month}.${year}<br>Time: ${hours}:${minutes}`;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
});