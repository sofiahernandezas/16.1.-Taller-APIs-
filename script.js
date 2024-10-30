document.addEventListener('DOMContentLoaded', function() {

    // Evento para el botón de búsqueda
    document.getElementById('searchButton').addEventListener('click', () => {
        const characterName = document.getElementById('characterName').value.toLowerCase(); // Convierte el valor a minúsculas
        fetchCharacterData(characterName);
    });

    // Función para hacer fetch a la API de Rick and Morty
    function fetchCharacterData(characterName) {
        const url = `https://rickandmortyapi.com/api/character/?name=${characterName}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Personaje no encontrado');
                }
                return response.json(); // Aquí terminamos la primera promesa
            })
            .then(data => { // Ahora encadenamos la segunda promesa correctamente
                // Verifica si hay resultados
                if (data.results && data.results.length > 0) {
                    displayCharacterData(data.results[0]); // Muestra el primer personaje encontrado
                } else {
                    throw new Error('Personaje no encontrado');
                }
            })
            .catch(error => {
                document.getElementById('characterData').innerHTML = `
                    <div class="form-control">
                        <p>${error.message}</p>
                    </div>
                `;
            });
    }

    // Función para mostrar los datos del personaje en la página
    function displayCharacterData(character) {
        const characterDataDiv = document.getElementById('characterData');
        characterDataDiv.innerHTML = `
            <div class="card bg-white" style="width: 18rem;">
                <img src="${character.image}" class="card-img-top" alt="${character.name}">
                <div class="card-body">
                    <h5 class="card-title">${character.name.charAt(0).toUpperCase() + character.name.slice(1)}</h5>
                    <p class="card-text">
                        <strong>ID:</strong> ${character.id}<br>
                        <strong>Estado:</strong> ${character.status}<br>
                        <strong>Especie:</strong> ${character.species}<br>
                    </p>
                </div>
            </div>
        `;
    }

});
