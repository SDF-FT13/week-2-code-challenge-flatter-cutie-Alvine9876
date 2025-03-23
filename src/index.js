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

    