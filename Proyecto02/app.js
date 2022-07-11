const URL= "ttp://api.citybik.es/v2/networks/";



async function cargarDatos() {
    const redes = await this.GetCityBikes(); 
    for(let  red of redes) {
        let compania = red.company;
        let locacion = red.location;
        let nombre = red.name;
        let id = red.id;
        let plantilla = 
        `
                        <tr>
                            <td>${id}</td>
                            <td>${nombre}</td>
                            <td>${compania}</td>
                            <td>${locacion.country} - ${locacion.city}</td>
                        </tr>

                        `
            document.getElementById('elemento').innerHTML+= plantilla;
        }      
    };


async function GetCityBikes(){
return fetch("http://api.citybik.es/v2/networks/")
.then(response => response.json())
.then(data => {
const array = data.networks;
return array;
})
.catch(error => {
    console.log(error);
    return [];
}); 
}


window.addEventListener('DOMContentLoaded', (event) => {
//se llama el callback(una funcion como parametro de otra funcion)
cargarDatos(); 
});