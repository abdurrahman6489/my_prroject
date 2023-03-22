
//when the payment page loads, get the price and title of the movie selected
//from the local Storage call the function showBookedMovieDetails
window.addEventListener("load",()=>{
    showBookedMovieDetails(localStorage.getItem("price"),localStorage.getItem("original_title"));
    let tickets = document.getElementById("noOfTickets");
    tickets.addEventListener("input",(e)=>{
        console.log("input changed");
        showBookedMovieDetails(localStorage.getItem("price"),localStorage.getItem("original_title"),e.currentTarget.value);
        // showBookedMovieDetails(currentPrice,currentMovieTitle,e.currentTarget.value);
    })
})
//this function is to show the title, price, convenience fee charged and the total amount to be
//paid
function showBookedMovieDetails(price,title,noOfTickets=1){
    const selectedMovieName = document.querySelector(".selectedMovieName");
    const selectedMoviePrice = document.querySelector(".selectedMoviePrice");
    const convenienceFee = document.querySelector(".convenienceFee");
    const totalFee = document.querySelector(".totalFee");
    const paytoProceed = document.getElementById("pay");
    price = Number(price);
    noOfTickets = Number(noOfTickets);
    let basePrice = noOfTickets*price;
    convenienceFee.innerHTML = `Rs ${(0.0175*basePrice).toFixed(2)}`;
    totalFee.innerHTML = `Rs ${(1.0175*basePrice).toFixed(2)}`;
    selectedMovieName.innerHTML = title;
    selectedMoviePrice.innerHTML = price;
    paytoProceed.innerHTML = `Proceed to Pay Rs ${(1.0175*basePrice).toFixed(2)}`;
}
