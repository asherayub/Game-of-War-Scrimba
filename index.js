/* API FROM WHERE REQUEST IS MADE
    https://deckofcardsapi.com/
*/
const remainingCards = document.getElementById("remaining__cards");
const newDeck = document.getElementById("new-deck");
const drawCards = document.getElementById("draw-cards");
const notification = document.getElementById("winner__notification");
let deckId;
let myScore = 0;
let comScore = 0;

newDeck.addEventListener("click", handleClick);
drawCards.addEventListener("click", drawCard);

async function handleClick() {
  const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/");
  const data = await res.json();
  deckId = data.deck_id;
  remainingCards.textContent = data.remaining;
  // RESET SCORE EACH TIME NEW DECK IS REQUESTED
  myScore = 0;
  comScore = 0;
  document.querySelector(".card1 #me").textContent = `Me: ${myScore}`;
  document.querySelector(".card2 #computer").textContent = `COM: ${comScore}`;
}

async function drawCard() {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  );
  const data = await res.json();
  remainingCards.textContent = data.remaining;
  if (deckId == undefined) {
    alert("Please get New Deck First");
    return;
  }
  if (data.remaining > 0) {
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
    winner(data.cards[0], data.cards[1]);
  } else {
    document.querySelector("#cards").innerHTML = `
          <h1 style="font-size: 2.5rem; padding: 1rem; text-align: center; background-color: yellow;">${
            myScore > comScore ? "You Win the Game" : "COM Win the Game"
          } <br/> Draw New Deck from Button Above ⬆</h1>
        `;
  }
}
const winner = (card1, card2) => {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1Value = valueOptions.indexOf(card1.value);
  const card2Value = valueOptions.indexOf(card2.value);
  if (card1Value == card2Value) showNotification("It's a TIE 🙂");
  else if (card1Value > card2Value) {
    document.querySelector(".card1 #me").textContent = `Me: ${++myScore}`;
    showNotification("You WIN 🤩");
  } else if (card1Value < card2Value) {
    document.querySelector(
      ".card2 #computer"
    ).textContent = `COM: ${++comScore}`;
    showNotification("COM WINS 😐");
  }
};

function showNotification(res) {
  notification.style.display = "block";
  notification.textContent = res;
  notification.style.top = "15%";
  setTimeout(() => {
    notification.style.top = "-100%";
  }, 1200);
}
