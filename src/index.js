document.addEventListener("DOMContentLoaded", () => {
  const characterBar = document.getElementById("character-bar");
  const characterName = document.getElementById("name");
  const characterImage = document.getElementById("image");
  const voteDisplay = document.getElementById("vote-count");
  const voteInput = document.getElementById("votes");
  const addVotesBtn = document.querySelector('input[value="Add Votes"]');
  const resetVotesBtn = document.getElementById("reset-btn");
  
  let characters = [];
  let currentCharacter = null;
  
  fetch("http://localhost:3000/characters")
  .then(response => response.json())
  .then(data => {
    characters = data;
    displayCharacters(data); 
  })
  .catch(error => console.error("Error fetching characters:", error));

  function displayCharacters(data) {
    characterBar.innerHTML = ""; 
    data.forEach(character => {
      let btn = document.createElement("button");
      btn.textContent = character.name;

   
      let img = document.createElement("img");
      img.src = character.image;
      img.alt = character.name; 
      img.width = 50; 
      img.height = 50; 

      let container = document.createElement("div");
      container.appendChild(img);
      container.appendChild(btn);
      
      container.addEventListener("click", () => updateCharacterInfo(character));

      characterBar.appendChild(container);
    });
    
    if (data.length > 0) {
      updateCharacterInfo(data[0]);
    }
  }

  function updateCharacterInfo(character) {
    currentCharacter = character;
    characterName.textContent = character.name;
    characterImage.src = character.image;
    voteDisplay.textContent = character.votes;
  }
  
  addVotesBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let votesToAdd = parseInt(voteInput.value) || 0;
    if (votesToAdd > 0 && currentCharacter) {
      currentCharacter.votes += votesToAdd;
      voteDisplay.textContent = currentCharacter.votes;
   
      fetch(`http://localhost:3000/characters/${currentCharacter.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votes: currentCharacter.votes })
      }).catch(error => console.error("Error updating votes:", error));
    }
    voteInput.value = "";
  });
  
  resetVotesBtn.addEventListener("click", () => {
    if (currentCharacter) {
      currentCharacter.votes = 0;
      voteDisplay.textContent = 0;
    
      fetch(`http://localhost:3000/characters/${currentCharacter.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votes: 0 })
      }).catch(error => console.error("Error resetting votes:", error));
    }
  });
});
