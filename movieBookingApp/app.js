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


//this function is to build api link for 
//getting Movie details of a particular movie by
//entering its movieId
function getMovieUrl(movieId){
    let url = BASE_URL + "movie/" + movieId +"?"+ API_KEY;
    return url;
}

getMovies(API_URL);
//this function is to fetch url to get all movies based on the query => get-now-playing
function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        addMovie(data.results);
    });
}

getGenres(genreQuery);
//get movies genres from the api
function getGenres(url){
    fetch(url).then(res=> res.json()).then(data=>{
        addGenre(data.genres);
    });
}

//delete all movie elements before loading the new ones
//so that no mixing of movies occurs
function deleteMovies(){
    while(movieCardContainer.firstChild){
        movieCardContainer.removeChild(movieCardContainer.firstChild);
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
            movieElement.id = movie.id;
            movieElement.innerHTML = `<img src=${IMAGE_URL+poster_path} alt="movie"/>
            <h3 class="title">${title}</h3>
            <div class="lang-rating-container">
                <div class="lang">${original_language.toUpperCase()}</div>
                <div class="rating">${vote_average}</div>
            </div>`;
            movieCardContainer.appendChild(movieElement);
            movieElement.addEventListener("click",(e)=>{
              let movieId= e.currentTarget.id;
              let url = getMovieUrl(movieId);
              fetch(url).then(res=> res.json()).then(data=>{
                // return data.runtime;
                console.log(data);
                console.log(IMAGE_URL+data.poster_path);
                const modal = document.querySelector(".modal");
                openModal(modal,data); 
              });

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

//this function is for displaying the modal
//when an individual movie is clicked
//showing the movie Details
function openModal(modal,data){
    if(modal===null) return;
    modal.classList.add("Active");
    overlay.classList.add("Active");
    const {poster_path,original_title,vote_average,original_language,runtime,genres,overview} = data;
    let price = Math.floor(Math.random() * 50) + 250;
    modal.innerHTML = `
      <div class="modal-header">
        <button id="closeBtn" class="closeButton">&times;</button>
      </div>
      <div class="modal-body">
      <div class="img-container">
          <img src="${IMAGE_URL+poster_path}" alt="${original_title}" />
      </div>
      <div class="movie-details-container">
          <div class="movie-title">${original_title}</div>
          <div class="rating-movie">${vote_average.toFixed(1)+"/10"}</div>
          <div class="language-movie">${original_language.toUpperCase()}</div>
          <div class="runtime-genre-container">
              <div class="runtime-movie">${runtime+" minutes"}</div>
              <div class="separate">|</div>
              <div class="genre">${genres[0].name}</div>
          </div>
          <div class="overview">${overview}</div>
          <div class="price">${"Rs "+price}</div>
      </div>
      <div class="footer">
          <button class="book">Book Tickets</button>
      </div>
  </div>
    `;

    //selecting the close button on the modal and adding
    //event listener to it
    const closeModalButton = document.querySelector("#closeBtn");
    closeModalButton.addEventListener("click",()=>{
      modal.classList.remove("Active");
      overlay.classList.remove("Active");
    })

    //selecting the book ticket button and adding
    //event listener to it, by clickiing on it goes
    //to payment page showing total amount to pay
    const bookBtn = document.querySelector(".book");
    bookBtn.addEventListener("click",()=>{
        window.open("./payment.html");
        //storing the current price and the movie title of the movie
        //selected to show in payment page
        localStorage.setItem("price",price);
        localStorage.setItem("original_title",original_title);
    });
}

//this overlay is on the whole page when a modal
//display the modal Details to prevent any other movie
//to be clicked
const overlay = document.querySelector("#overlay");
//adding event listener to overlay element so when
//it is clicked, the modal is hidden
overlay.addEventListener("click",()=>{
  console.log("from overlay");  
  const modals = document.querySelectorAll(".modal.Active");
    modals.forEach(modal=>{
      closeModal(modal);
    })
})

//this function is to hide the modal display
function closeModal(modal){
    if(modal===null) {
      console.log("modal not found");
      return;
    };
    console.log("modal closed");
    modal.classList.remove("Active");
    overlay.classList.remove("Active");
}
