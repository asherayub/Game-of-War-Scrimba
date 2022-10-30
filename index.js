/* API FROM WHERE REQUEST IS MADE
    https://deckofcardsapi.com/
*/

let deckId;
function handleClick() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      document.getElementById("remaining__cards").textContent = data.remaining;
    });
}

document.getElementById("new-deck").addEventListener("click", handleClick);

document.getElementById("draw-cards").addEventListener("click", () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      if (deckId == undefined) alert("Please get New Deck First");
      let myScore = 0;
      let comScore = 0;
      document.getElementById("cards").innerHTML = `
        <div class="card card1">
            <h1 style="text-align: center;" id="me">Me: ${myScore}</h1>
            <img src="${data.cards[0].image}" />
            <p class="card__name">${data.cards[0].value} of ${data.cards[0].suit}</p>
            </div>
            <div class="card card2">
            <h1 style="text-align: center;" id="computer">COM: ${comScore}</h1>
            <img src="${data.cards[1].image}" />
            <p class="card__name">${data.cards[1].value} of ${data.cards[1].suit}</p>
        </div>
      `;
      document.getElementById("remaining__cards").textContent = data.remaining;
    });
});
