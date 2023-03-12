const movieCardContainer = document.querySelector(".movieCard-Container");
const genreContainer = document.querySelector(".genre-container");

//api bukld
const API_KEY = "api_key=7c5c9621868ea67c0f1ac5f1719ab556";
const BASE_URL = "https://api.themoviedb.org/3/";
const query = "movie/now_playing?";
const languageQuery = "&language=en-US";
const pageQuery = "&page=1";
const API_URL = BASE_URL + query + API_KEY + languageQuery + pageQuery;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const genreQuery = BASE_URL+"genre/movie/list?"+API_KEY+"&language=en-US";
// console.log(genreQuery);
let result;


getMovies(API_URL);
getGenres(genreQuery);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        // console.log(data);
        addMovie(data.results);
    });
}

function getGenres(url){
    fetch(url).then(res=> res.json()).then(data=>{
        // console.log(data);
        addGenre(data.genres);
    });
}


function addMovie(data){
        data.forEach(movie => {
        let movieElement = document.createElement("div");
        movieElement.classList.add("movies");
        movieElement.innerHTML = `<img src=${IMAGE_URL+movie.poster_path} alt="dangal movie"/>
        <h3 class="title">${movie.title}</h3>
        <div class="lang-rating-container">
            <div class="lang">${movie.original_language.toUpperCase()}</div>
            <div class="rating">${movie.vote_average}</div>
        </div>`;
        movieCardContainer.appendChild(movieElement);
        });
        

}
// adding all the Genres;
function addGenre(genreData){
    let genreHeading = document.createElement("div");
    let genreHeadingText = document.createTextNode("Genre");
    genreHeading.appendChild(genreHeadingText);
    genreHeading.classList.add("genre-heading");
    genreContainer.appendChild(genreHeading);
    let genreAll = document.createElement("div");
    let genreAllText = document.createTextNode("All");
    genreAll.classList.add("genres");
    genreAll.appendChild(genreAllText);
    genreContainer.appendChild(genreAll);
    genreData.forEach(genre=>{
        let genreElement = document.createElement("div");
        genreElement.classList.add("genres");
        genreElement.id = genre.id;
        genreElement.innerHTML = genre.name;
        genreContainer.appendChild(genreElement);
    });
}
// function deleteMovie(){
//     while(movieCardContainer.firstChild){
//         movieCardContainer.removeChild(movieCardContainer.firstChild);
//     }
//     console.log("all child deleted");
// }
// deleteMovie();