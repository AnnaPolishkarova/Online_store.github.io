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

            const titleElement = document.createElement("h4");
            titleElement.textContent = `${comment.name} (${comment.email})`;

            const bodyElement = document.createElement("p");
            bodyElement.textContent = comment.body;

            commentElement.appendChild(titleElement);
            commentElement.appendChild(bodyElement);

            commentsList.appendChild(commentElement);
        });
    };

    // const fetchComments = async () => {
    //     showPreloader();
    //     hideError();
    //
    //     const filterId = isFirstFetch ? "?id_gte=100" : "?id_lte=200";
    //     const limit = "&_limit=5";
    //     isFirstFetch = !isFirstFetch;
    //
    //     try {
    //         const response = await fetch(`${apiUrl}${filterId}${limit}`);
    //         console.log("111")
    //         if (!response.ok) throw new Error("Ошибка сети");
    //         const comments = await response.json();
    //         hidePreloader();
    //         displayComments(comments);
    //     } catch (error) {
    //         console.error("Ошибка загрузки комментариев:", error);
    //         hidePreloader();
    //         showError();
    //     }
    // };
    const fetchComments = () => {
        showPreloader();
        hideError();

        const filterId = isFirstFetch ? "?id_gte=100" : "?id_lte=200";
        const limit = "&_limit=5";
        isFirstFetch = !isFirstFetch;

        fetch(`${apiUrl}${filterId}${limit}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Ошибка сети");
                }
                return response.json();
            })
            .then((comments) => {
                hidePreloader();
                displayComments(comments);
            })
            .catch((error) => {
                console.error("Ошибка загрузки комментариев:", error);
                hidePreloader();
                showError();
            });
        // console.log('111')
    };

    fetchComments();
    // console.log("222")
});
