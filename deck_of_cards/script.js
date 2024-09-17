console.log("JS is running")

const prep_deck = document.getElementById("prep_deck")
const new_card = document.getElementById("new_card")
const remaining_cards = document.getElementById("remaining_cards")
const btn_draw = document.getElementById("btn_draw")
const btn_load = document.getElementById("btn_load")
const card_image = document.getElementById('card_image');
let deck_id = "";    // Will come from API call
let drawn = 0;       // Used to count the cards drawn

async function new_deck() {
    /* Loads a new deck of cards from the API */
    let url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

    // Use a AWAIT when retrieving the data
    let res = await axios
        .get(url, {
            headers: {
            'Content-Type': 'application/json'
                }
            } )
        .then(resp => {
            return resp.data;
        })
        .catch(err => {
        prep_deck.innerText = "Error. Please reload this page.";
        console.log(`There was a problem, promise not completed. Error:( ${err}`);
            } );
     return res;
}  // END new_deck()


async function draw_a_card() {
    /* API call to draw a card from the deck */
    let url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`

    // Use Await when calling the API
    let resp = await axios
        .get(url, {
            headers: {
            'Content-Type': 'application/json'
                }
            } )
        .then(resp => {
            return(resp.data);
        })
        .catch(err => {
            prep_deck.innerText = "Error. Please reload this page.";
            console.log(`Oops, there was a problem, promise not completed. Error:( ${err}`);
     } );
     return resp;
}  // END draw_a_card()


/*  -------  Button Click Event Handlers & Functionailty ------- */


// Functionality for when the Load New Deck button is clicked
btn_load.addEventListener("click", function(evt) {
    evt.preventDefault();
    // Call the function
    new_deck()
        .then(data => {
            // Let user know, reset some variables, set deck_id
            console.log("New Deck Ready:", data.deck_id);
            prep_deck.innerHTML = '<p class="text-light"><i class="fas fa-check"></i> New Deck Ready</p>';
            new_card.innerText = "";
            remaining_cards.innerText = "";
            card_image.src = "https://deckofcardsapi.com/static/img/back.png"
            deck_id = data.deck_id;
        })
        .catch(err => {
            prep_deck.innerTEXT = "Deck Failed To Load. Error:";
            console.log("Deck Failed To Load. Error:", err);
        })
    })  // END addEventListener



/* Functionality for when Draw A Card button is clicked */
btn_draw.addEventListener("click", function(evt) {
    evt.preventDefault();

    // Check that there is a deck before calling the API
    if (deck_id == "") {
        console.log("No Deck. Please load a deck.")
        prep_deck.innerText = "Load New Deck To Start";
        return false;
    // Check that all the cards have not already been drawn
    } else if (drawn == 52) {
        prep_deck.innerText = "No more cards in deck.\n Load New Deck To Start";
        return false;
    }
    // Call the function
    draw_a_card()
    .then(data => {
        // Display the card and card counter 
        card_image.src = `${data.cards[0].image}`;
        prep_deck.innerText = "";
        drawn = 52 - parseInt(data.remaining);
        remaining_cards.innerText = `Drawn cards:  ${drawn}\n Remaining:  ${data.remaining}`;
        new_card.innerText = `${data.cards[0].value} of ${data.cards[0].suit}\n` + new_card.innerText;
    })
    .catch(err => {
        prep_deck.innerText = "Error. Please reload this page.";
        console.log("No deck loaded. Error:", err);
    })

})  // END addEventListener
