const URL= "http://api.citybik.es/v2/networks/";
var mapaStation = new Map();
async function cargarDatos() {
    const redes = await this.GetCityBikes(); 
    for(let  red of redes) {
        let id = red.id;
        let plantilla =`
        <option value="${id}">${id}</option>
    `
            // se agrega la etiqueta <option> dentro de la etiqueta <select>
        document.querySelector('select').innerHTML+= plantilla;
    }
    const selectElement = document.querySelector('select');
    selectElement.addEventListener('change', (event)=>{
        const result = event.target.value;
        document.getElementById("nombreRed").innerHTML="Disponibilidad de Estación "+result;
        //console.log(result);
        fetch(URL+result)
        .then(response => response.json())
        .then(data => {
          const claves=[];
          const valores=[];
          document.getElementById('elemento').innerHTML='';
          let id = data.network.id;
          let arraystation= data.network.stations;
          for( const station of arraystation){
              //console.log(station);
              let plantilla = 
                `
                  <tr>
                    <td>${id}</td>
                    <td>${station.id}</td>
                    <td>${data.network.location.city} ,${data.network.location.country}</td>
                    <td>${station.name}</td>
                    <td> ${station.free_bikes}</td>
                  </tr>
                `
              document.getElementById('elemento').innerHTML+= plantilla;
              mapaStation.set(station.name,station.free_bikes);
          }
          mapaStation.forEach (function(value, key) {
              claves.push(key);
              valores.push(value);
          })
          console.log(claves);
          console.log(valores);
          chart(claves,valores);
          })
    });
    
    
}

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

function chart(labels,data) {
  var ctx = document.getElementById("myChartPie").getContext('2d');
  var myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Bicicletas disponibles',
          data: data,
          backgroundColor: [
            'rgba(209, 234, 163, 1)',
            'rgba(163, 221, 203, 1)',
            'rgba(232, 233, 163, 1)',
            'rgba(230, 181, 163, 1)',
            'rgba(229, 112, 163, 1)',
            'rgba(181, 234, 163, 1)', 
            'rgba(250, 234, 163, 1)', 
            'rgba(170, 234, 163, 1)'],
          hoverOffset: 4
        },
      ],
    },
  });
}

window.addEventListener('DOMContentLoaded', (event) => {
//se llama el callback(una funcion como parametro de otra funcion)
cargarDatos(); 
});