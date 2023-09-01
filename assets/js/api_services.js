class Persona {
    constructor(name, height, weight) {
      this.charName = name;
      this.height = height;
      this.weight = weight;
    }
  }
  
  async function* generator(desde, hasta) {
    let i = desde;
    while (i <= hasta) {
      let url = "https://swapi.dev/api/people/" + i;
      let response = await fetch(url);
      let data = await response.json();
      let { name, height, mass } = data;
      let nuevoPersonaje = new Persona(name, height, mass);
      yield nuevoPersonaje;
      i++;
    }
  }
  
  const principalesGenerator = generator(1, 5);
  const secundariosGenerator = generator(6, 10);
  const restoGenerator = generator(11, 16);
  
  async function typeGenerator(id) {
    switch (id) {
      case "principales":
        const principales = await principalesGenerator.next();
        return principales;
      case "secundarios":
        const secundarios = await secundariosGenerator.next();
        return secundarios;
      case "resto":
        const resto = await restoGenerator.next();
        return resto;
    }
  }
  
  async function populateCard(id) {
    const {value,done} = await typeGenerator(id)
    let div = document.getElementById(id);
    console.log(div);
    if (!done) {
      let html = div.innerHTML;
      html += `
      <div class="card shadow-lg p-3 mb-5 bg-body rounded">
        <span class="circle" data-range="1-5"></span>
        <div class="d-flex">
          <span class="${id}-circle"></span>
          <h2>${value.charName}</h2>
          <p>Estatura: ${value.height} cm. Peso: ${value.weight} kg</h2>
        </div>
      </div>
      `;
      div.innerHTML = html;
    }
  }
  
  let principales = document.getElementById("principales");
  let secundarios = document.getElementById("secundarios");
  let resto = document.getElementById("resto");
  principales.addEventListener("click", (e) => {
    populateCard(principales.id);
  });
  
  secundarios.addEventListener("click", (e) => {
    populateCard(secundarios.id);
  });
  
  resto.addEventListener("click", (e) => {
    populateCard(resto.id);
  });