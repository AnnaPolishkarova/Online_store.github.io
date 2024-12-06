document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const commentsList = document.getElementById("comments-list");
    const errorMessage = document.getElementById("error-message");
    const apiUrl = "https://jsonplaceholder.typicode.com/comments";
    // const apiUrl = "https://invalid.url/";
    let isFirstFetch = true;

    const showPreloader = () => {
        preloader.style.display = "block";
    };

    const hidePreloader = () => {
        preloader.style.display = "none";
    };

    const showError = () => {
        errorMessage.style.display = "block";
    };

    const hideError = () => {
        errorMessage.style.display = "none";
    };

    const displayComments = (comments) => {
        commentsList.innerHTML = "";
        comments.forEach((comment) => {
            const commentElement = document.createElement("div");
            commentElement.className = "comment";
            commentElement.innerHTML = `
                <h4>${comment.name} (${comment.email})</h4>
                <p>${comment.body}</p>
            `;
            commentsList.appendChild(commentElement);
        });
    };

    const fetchComments = async () => {
        showPreloader();
        hideError();

        const filterId = isFirstFetch ? "?id_gte=100" : "?id_lte=200";
        const limit = "&_limit=5"; // Ограничить количество комментариев до 5
        isFirstFetch = !isFirstFetch;

        try {
            const response = await fetch(`${apiUrl}${filterId}${limit}`);
            if (!response.ok) throw new Error("Ошибка сети");
            const comments = await response.json();
            hidePreloader();
            displayComments(comments);
        } catch (error) {
            console.error("Ошибка загрузки комментариев:", error);
            hidePreloader();
            showError();
        }
    };

    fetchComments();
});
