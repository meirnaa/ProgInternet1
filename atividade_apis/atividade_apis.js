function getById(id){
    return document.getElementById(id);
}

let botao_dog = getById('load-dog');
botao_dog.addEventListener("click", loadDog);

let botao_cat = getById('load-cat');
botao_cat.addEventListener("click", loadCat);

let botao_cat_facts = getById('load-cat-facts');
botao_cat_facts.addEventListener("click", loadCatFacts);

let botao_obras = getById('load-obras');
botao_obras.addEventListener("click", loadObras);


async function loadDog() {
    const input = document.getElementById("dogBreedInput");
    const breed = input.value.trim().toLowerCase();
    const result = document.getElementById("dogResult");

    if (!breed) {
      result.innerHTML = "⚠️ Por favor, digite uma raça.";
      return;
    }

    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          result.innerHTML = `<img src="${data.message}" style="max-width:300px;" alt="Dog image" />`;
        } else {
          result.innerHTML = `❌ Raça não encontrada: "${breed}"`;
        }
      })
      .catch(() => {
        result.innerHTML = "❌ Erro ao buscar imagem.";
      });
}

async function loadCat() {
    const input = document.getElementById("catBreedInput");
    const result = document.getElementById("catResult");
    
    const breedName = input.value.trim().toLowerCase();
    result.innerHTML = "🔎 Buscando raça...";

    if (!breedName) {
        result.innerHTML = "⚠️ Digite uma raça.";
        return;
    }

    try {
        // 1. Buscar lista de raças
        const resBreeds = await fetch("https://api.thecatapi.com/v1/breeds", {
        headers: { "x-api-key": API_KEY_CAT }
        });
        const breeds = await resBreeds.json();

        // 2. Encontrar a raça correspondente
        const breed = breeds.find(b =>
        b.name.toLowerCase().includes(breedName)
        );

        if (!breed) {
        result.innerHTML = `❌ Raça "${breedName}" não encontrada.`;
        return;
        }

        // 3. Buscar imagem da raça
        const resImage = await fetch(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`,
        { headers: { "x-api-key": apiKey } }
        );
        const imageData = await resImage.json();

        const imageUrl = imageData[0]?.url || "";
        const description = breed.description || "Sem descrição disponível.";

        // 4. Mostrar imagem e descrição
        result.innerHTML = `
        <img src="${imageUrl}" alt="Gato ${breed.name}" style="max-width:300px;" />
        <h3>${breed.name}</h3>
        <p>${description}</p>
        `;
    } catch (err) {
        console.error(err);
        result.innerHTML = "❌ Erro ao buscar dados da raça.";
    }
}

async function loadCatFacts() {
    const resultado = document.getElementById("catFactResultado");

    fetch("https://catfact.ninja/fact")
      .then(res => res.json())
      .then(data => {
        resultado.innerText = `🐾 ${data.fact}`;
      })
      .catch(() => {
        resultado.innerText = "❌ Erro ao buscar fato.";
      });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

async function loadObras() {
    const cultura = capitalize(document.getElementById("input-culture").value.trim());
    const resultado = document.getElementById("resultadoObras");

    if (!cultura) {
      resultado.innerHTML = "⚠️ Por favor, digite uma cultura (ex: French).";
      return;
    }

    resultado.innerHTML = "🔍 Buscando obras por cultura...";

    try {
      const url = `https://api.harvardartmuseums.org/object?apikey=${API_KEY_HARVARD}&size=10&culture=${encodeURIComponent(cultura)}&hasimage=1`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.records || data.records.length === 0) {
        resultado.innerHTML = `❌ Nenhuma obra encontrada para a cultura "${cultura}".`;
        return;
      }

      resultado.innerHTML = `<h3>🖼️ Obras da cultura: ${cultura}</h3>` + 
        data.records.map(obra => `
          <div style="margin-bottom: 20px; border-bottom: 1px solid #ccc;">
            <h4>${obra.title || "Sem título"}</h4>
            <p><strong>Data:</strong> ${obra.dated || "Desconhecida"}</p>
            <p><strong>Artista:</strong> ${obra.people?.[0]?.name || "Artista desconhecido"}</p>
            ${obra.primaryimageurl ? `<img src="${obra.primaryimageurl}" alt="Obra" style="max-width:200px;" />` : ""}
          </div>
        `).join("");
    } catch (err) {
      console.error(err);
      resultado.innerHTML = "❌ Erro ao buscar obras.";
    }
}