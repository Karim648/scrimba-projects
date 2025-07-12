const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const movieSection = document.querySelector("#movie-section");
const watchlistSection = document.querySelector(".watchlist-section");
let watchlist = JSON.parse(localStorage.getItem("movies") || "[]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getMovie(searchInput.value);
    movieSection.innerHTML = ""
    searchForm.reset();
})


async function getMovie(title) {
    try {
        const movieList = await fetch(`http://www.omdbapi.com/?t=${title}&s=${title}&type=movie&apikey=e1491bb9`);
        if (!movieList.ok) throw new Error("Network error");
        const movieListData = await movieList.json();
        if (movieListData.Response !== "True") throw new Error(movieListData.Error);
        
        movieListData.Search.forEach(async movie => {
            const imdbid = await fetch(`http://www.omdbapi.com/?t=${movie.Title}&type=movie&apikey=e1491bb9`);
            const imdbidTitle = await imdbid.json();
          
            movieSection.innerHTML += `
            <div class="movie">
                    <div class="movie-img"><img class="poster" src="${movie.Poster}" alt="${movie.Title} Poster"></div>
                    <div class="movie-info">
                        <h3>${movie.Title}&nbsp;&nbsp;&nbsp;&nbsp;⭐&nbsp;${imdbidTitle.Ratings[0].Value}</h3>
                        <div class="movie-genre">
                            <p>${imdbidTitle.Runtime}</p>
                            <p>${imdbidTitle.Genre}</p>
                            <button class="watchlist-btn">+ Watchlist</button>
                        </div>
                        <p>${imdbidTitle.Plot}</p>
                    </div>
                </div>
            `;
            const watchlistBtn = document.querySelectorAll(".watchlist-btn");
            watchlistBtn.forEach(watchlistBtnClick => {
                watchlistBtnClick.addEventListener("click", () => {
                    const movieEl = watchlistBtnClick.closest(".movie");
                    const title = movieEl.querySelector("h3").textContent;
                    const poster = movieEl.querySelector("img").src;
                    const runtime = movieEl.querySelector(".movie-genre").children[0].textContent;
                    const genre = movieEl.querySelector(".movie-genre").children[1].textContent;
                    const plot = movieEl.querySelector(".movie-info").children[2].textContent;
                    const movieObj = {title, poster, runtime, genre, plot};
                    
                    if (!(watchlist.length !== 0 && (watchlist.some(movie => movie.title === movieObj.title)))) {
                        watchlist.push(movieObj);                  
                    } 
                    localStorage.setItem("movies", JSON.stringify(watchlist));
                })
            })
        })
    } catch {
        movieSection.innerHTML = `<h2>Unable to find what you’re looking for. Please try another search.</h2>`;
    }
}


if (watchlistSection) {
    watchlist.length !== 0 ? watchlistSection.innerHTML = "" : "";
    watchlist.forEach(movie => {
        watchlistSection.innerHTML += `
            <div class="movie">
                    <div class="movie-img"><img src="${movie.poster}" alt="${movie.title} Poster"></div>
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <div class="movie-genre">
                            <p>${movie.runtime}</p>
                            <p>${movie.genre}</p>
                            <button class="remove-btn">- Remove</button>
                        </div>
                        <p>${movie.plot}</p>
                    </div>
                </div>
            `;
    })
    const removeBtn = document.querySelectorAll(".remove-btn");
    removeBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".movie").remove();  // visually removes html
            const removeByTitle = btn.closest(".movie-info").firstElementChild.textContent.split("⭐")[0];            
            watchlist = watchlist.filter(movie => removeByTitle !== movie.title.split("⭐")[0]);
            localStorage.setItem("movies", JSON.stringify(watchlist));
        })
    });

}




// implement a check when you add something to watchlist if it is already there dont add duplicates


// This works but i implemented removeByTitle instead cuz more accurate incase two movies have the same runtime
// const removeByRuntime = Number(btn.closest(".movie-genre").firstElementChild.textContent.replace(" min", ""));
// const updatedList = watchlist.filter(movie => Number(movie.runtime.replace(" min", "")) !== removeByRuntime)
// console.log(removeByRuntime);


// To do:
// turn it into a responsive grid layout 
// refactor js to make it more modular and cleaner









