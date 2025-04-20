/* =======================================================================
   comments?
   CONNTROLS:
   REFRESH (rerandomize the deck)
   DEAL (deals a card)
   number bar (choose how many cards you want to deal)


   The top is the pool / deck of cards currently available ( we can hide it easily if needed).
   Bottom is the dealt area (where the cards are dealt). 
   They are dealt in order. If you want to randomize, you have to refresh.
 
   ======================================================================= */
   document.addEventListener('DOMContentLoaded', () => {
    const deckEl   = document.getElementById('deck');
    const dealtEl  = document.getElementById('dealt-area');
    const dealBtn  = document.getElementById('deal-btn');
    const dealInp  = document.getElementById('deal-count');
    const leftTxt  = document.getElementById('cards-left');
  
    /* build an array of the card elements and shuffle it once */
    const deck = shuffle([...deckEl.children]);
  
    /* reflect shuffled order in the DOM */
    deck.forEach(card => deckEl.appendChild(card));
    updateLeft();
  
    /* deal on button click */
    dealBtn.addEventListener('click', () => {
      const n = Math.max(1, parseInt(dealInp.value) || 1);
      for (let i = 0; i < n && deck.length; i++) {
        dealtEl.appendChild(deck.shift());   // move card element
      }
      updateLeft();
    });
  
    /* Fisher-Yates shuffle (copied from online, geeksforgeeks) */
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
  
    function updateLeft() {
      leftTxt.textContent = `Cards left: ${deck.length}`;
      dealBtn.disabled = deck.length === 0;
    }
  });
  