const selectState = document.getElementById('estados')
const selectCity = document.getElementById('cidades')
const paragraph = document.getElementById('alataque')

async function getState() {
    const urlState = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

    try {
        const response = await fetch(urlState);
        if (!response.ok) {
            throw new Error('Erro.');
        }
        const data = await response.json();

        Array.from(data).forEach(state => {
            selectState.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        });

    } catch (error) {
        console.log(error.message);
    }
}

async function getCity(state) {
    const urlCity = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+state+"/municipios";

    try {
        const response = await fetch(urlCity);
        if (!response.ok) {
            throw new Error('Erro.');
        }
        const data = await response.json();

        selectCity.innerHTML = '<option value="0"></option>'
        Array.from(data).forEach(city => {
            selectCity.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        });

    } catch (error) {
        console.log(error.message);
    }
}

selectState.addEventListener("change", (state) => {
    const select = state.target;
    getCity(select.value);
  });

selectCity.addEventListener("change", (city) => {
    const select = city.target;
    paragraph.innerHTML = ''
    paragraph.innerHTML = `Cidade selecionada: ${select.value}`;
})

getState();