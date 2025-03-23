function fetchCharacters() {
    fetch("http://localhost:3000/characters")
      .then((response) => response.json())
      .then((characters) => {
        const characterBar = document.getElementById("character-bar");
  
        characters.forEach((character) => {
          const characterSpan = document.createElement("span");
          characterSpan.textContent = character.name;
          characterSpan.addEventListener("click", () => displayCharacterDetails(character));
  
          characterBar.appendChild(characterSpan);
        });
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
    }

    function displayCharacterDetails(character) {
        console.log(character);
      }
    
      function displayCharacterDetails(characterId) {
      
        fetch(`http://localhost:3000/characters/${characterId}`)
          .then((response) => response.json())
          .then((character) => {
    
            currentCharacter = character;
            document.getElementById("name").textContent = character.name;
            document.getElementById("image").src = character.image;
            document.getElementById("image").alt = character.name;
            document.getElementById("vote-count").textContent = character.votes;
    
    
            const voteForm = document.getElementById("votes-form");
            voteForm.addEventListener("submit", (event) => {
              event.preventDefault();
              const votesInput = document.getElementById("votes");
              const votesToAdd = parseInt(votesInput.value, 10);
      
              if (isNaN(votesToAdd) || votesToAdd <= 0) {
                alert("Please enter a valid number of votes.");
                return;
              }
      
              currentCharacter.votes += votesToAdd;
      
              document.getElementById("vote-count").textContent = currentCharacter.votes;
      
              votesInput.value = "";
            });
    
          })
          .catch((error) => {
            console.error("Error fetching character details:", error);
          });
      }
    
    
    
    
    
      document.addEventListener("DOMContentLoaded", () => {
        fetchCharacters();
      });
