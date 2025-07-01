const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]


const postPfp = document.getElementById("post-pfp");
const postName = document.getElementById("post-name");
const postLocation = document.getElementById("post-location");
const postImg = document.getElementById("post-img");
const username = document.getElementById("username");
const commentSection = document.getElementById("comment-section");

const likeBtn = document.getElementById("like-btn");
const likeEl = document.getElementById("like-el");


function renderPost(arr, x) {
    postPfp.src = arr[x].avatar;
    postName.textContent = arr[x].name;
    postLocation.textContent = arr[x].location;
    postImg.src = arr[x].post;
    likeEl.innerHTML = arr[x].likes;
    commentSection.innerHTML = `
    <span class="comment">${arr[x].username}</span>
    ${arr[x].comment}`;
    
}

renderPost(posts, 1);

likeBtn.addEventListener("click", function() {
    const cleanedLike = likeEl.textContent.replace(",", "");
    let likeCount = parseInt(cleanedLike);
    likeEl.textContent = likeCount.toLocaleString();
    likeCount++;
    alert(likeEl.textContent);
});


