// 1.Función para obtener los países desde la API
// 2.Ordenar alfabéticamente por nombre (pasando a mayúsculas para evitar errores)
// 3.Función para renderizar las banderas en el DOM
// 4.Evento para abrir el modal al hacer clic en la tarjeta
// 5.Función para mostrar el detalle del país en un modal
// 6.Evento para cerrar el modal
// 7.Ejecutar la función al cargar la página


const getCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Error al obtener los países");
      }
  
      let countries = await response.json();
  
      countries.sort((a, b) => a.name.common.toUpperCase().localeCompare(b.name.common.toUpperCase()));
  
      renderCountries(countries);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const renderCountries = (countries) => {
    const container = document.getElementById("countries-list");
  
    countries.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.classList.add("country-card");
      countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}" class="flag">
        <p>${country.name.common}</p>
      `;
  
      countryCard.addEventListener("click", () => showCountryDetails(country));
      container.appendChild(countryCard);
    });
  };
  
  const showCountryDetails = (country) => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
  
    modal.innerHTML = `
      <div class="modal-content">
        <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}" class="modal-flag">
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "No disponible"}</p>
        <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Lado de la carretera:</strong> ${country.car.side}</p>
        <button id="close-modal">Cerrar</button>
      </div>
    `;
  
    document.body.appendChild(modal);
    document.getElementById("close-modal").addEventListener("click", () => modal.remove());
  };
  document.addEventListener("DOMContentLoaded", getCountries);

  