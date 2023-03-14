const movieCardContainer = document.querySelector(".movieCard-Container");
const genreContainer = document.querySelector(".genre-container");
let input = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");
//api build
const API_KEY = "api_key=7c5c9621868ea67c0f1ac5f1719ab556";
const BASE_URL = "https://api.themoviedb.org/3/";
const query = "movie/now_playing?";
const languageQuery = "&language=en-US";
const pageQuery = "&page=1";
const API_URL = BASE_URL + query + API_KEY + languageQuery + pageQuery;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const genreQuery = BASE_URL+"genre/movie/list?"+API_KEY+"&language=en-US";
const searchQuery = "search/movie?";
const searchURL = BASE_URL + searchQuery + API_KEY+ "&query=";

// getMovieRuntime("315162");
function getMovieRuntime(movieId){
    let url = BASE_URL + "movie/" + movieId +"?"+ API_KEY;
    fetch(url).then(res=> res.json()).then(data=>{
      return data.runtime;
    });
}

getMovies(API_URL);
getGenres(genreQuery);

//fetch url to get movies
function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        // console.log(data);
        addMovie(data.results);
    });
}

let allGenres = [];
//get movies genres from the api
function getGenres(url){
    fetch(url).then(res=> res.json()).then(data=>{
        addGenre(data.genres);
    });
}

// getGenreName(28);
function getGenreName(id){
  let url = genreQuery;
  fetch(url).then(res=> res.json()).then(data=>{
    for(let genreData of data.genres){
      if(genreData.id===id){
        console.log("in getGenreName function " + genreData.id);
        console.log("in getGenreName function " + genreData.name);
        return genreData.name;
      }
    }
});
}
//delete all movie elements before loading the new ones
//so that no mixing of movies occurs
function deleteMovies(){
    while(movieCardContainer.firstChild){
        movieCardContainer.removeChild(movieCardContainer.firstChild);
    }
}

//this class is made to fill all the details of a movie when a movie element
//is clicked
class FillSelectedMovieDetails {
  constructor(title, rating, language,  genre, duration, overview, imgSrc, price) {
    this.title = title;
    this.rating = rating;
    this.language = language;
    this.genre = genre;
    this.duration = duration;
    this.overview = overview;
    this.imgSrc = imgSrc;
    this.price = function () {
      return Math.floor(Math.random() * 50) + 250;
    };
  }
}

//main function to add all the movie elements in
//the movie container
function addMovie(data){
        deleteMovies();
        data.forEach(movie => {
            let {title,poster_path,original_language,vote_average,overview} = movie;
            let movieElement = document.createElement("div");
            movieElement.classList.add("movies");
            movieElement.innerHTML = `<img src=${IMAGE_URL+poster_path} alt="movie"/>
            <h3 class="title">${title}</h3>
            <div class="lang-rating-container">
                <div class="lang">${original_language.toUpperCase()}</div>
                <div class="rating">${vote_average}</div>
            </div>`;
            movieCardContainer.appendChild(movieElement);
            movieElement.addEventListener("click",(e)=>{
              let movieRuntime = getMovieRuntime(movie.id.toString());
              let genreId = movie.genre_ids[0];
              console.log(genreId);
              // let movieGenreName = getGenreName(genreId);
              // getGenreName(genreId);
              console.log("movie selected with " + getGenreName(genreId));
              // const selectedMovie = new FillSelectedMovieDetails(title,vote_average,original_language,movieGenreName,movieRuntime,overview,IMAGE_URL+poster_path);
              // console.log(selectedMovie.duration);
            });
        });
}

//this section is made to add all the genres from the api
//and filter the movies based on the selected genre/s
let selectedGenre = [];

// main function for adding all the Genres;
function addGenre(genreData){
    let genreHeading = document.createElement("div");
    let genreHeadingText = document.createTextNode("Genre");
    genreHeading.appendChild(genreHeadingText);
    genreHeading.classList.add("genre-heading");
    genreContainer.appendChild(genreHeading);
    genreData.forEach(genre=>{
        let genreElement = document.createElement("div");
        genreElement.classList.add("genres");
        genreElement.id = genre.id;
        genreElement.innerHTML = genre.name;
        
        genreElement.addEventListener("click",(e)=>{
        let currentId = Number(e.currentTarget.id);
          if(selectedGenre.indexOf(currentId)>-1){
              genreElement.classList.remove("active");
              selectedGenre.splice(selectedGenre.indexOf(currentId),1);
          }
          else{
              genreElement.classList.add("active");
              selectedGenre.push(currentId);
          }
          if(selectedGenre.length>0){
            getMovies(API_URL+"&with_genres="+encodeURI(selectedGenre.join(",")));
          }
          else{
            getMovies(API_URL);
          }
        })
        genreContainer.appendChild(genreElement);
    });
}

//this section for making functionality for searching
//the movie based on the input given on the search input
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let searchTerm = input.value;
    console.log(searchTerm);
    if(searchTerm){ 
        getMovies(searchURL+searchTerm);
    }
    else{
        getMovies(API_URL);
    }
}) 