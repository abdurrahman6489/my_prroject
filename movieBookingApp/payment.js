window.addEventListener("load",()=>{
    showBookedMovieDetails(localStorage.getItem("price"),localStorage.getItem("original_title"));
    let tickets = document.getElementById("noOfTickets");
    tickets.addEventListener("input",(e)=>{
        console.log("input changed");
        showBookedMovieDetails(localStorage.getItem("price"),localStorage.getItem("original_title"),e.currentTarget.value);
    })
})

function showBookedMovieDetails(price,title,noOfTickets=1){
    const selectedMovieName = document.querySelector(".selectedMovieName");
    const selectedMoviePrice = document.querySelector(".selectedMoviePrice");
    const convenienceFee = document.querySelector(".convenienceFee");
    const totalFee = document.querySelector(".totalFee");
    price = Number(price);
    noOfTickets = Number(noOfTickets);
    let basePrice = noOfTickets*price;
    convenienceFee.innerHTML = `Rs ${(0.0175*basePrice).toFixed(2)}`;
    totalFee.innerHTML = `Rs ${(1.0175*basePrice).toFixed(2)}`;
    selectedMovieName.innerHTML = title;
    selectedMoviePrice.innerHTML = price;
}