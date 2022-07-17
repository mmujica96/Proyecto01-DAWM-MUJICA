// Graph
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
        lineTension: 0,
        backgroundColor: "transparent",
        borderColor: "#007bff",
        borderWidth: 4,
        pointBackgroundColor: "#007bff",
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  },
});

const URL= "ttp://api.citybik.es/v2/networks/";


var arregloPaises = []
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
                            <td>${nombre}</td>
                            <td>${compania}</td>
                            <td>${locacion.city}</td>
                        </tr>
                        `
            document.getElementById('elemento').innerHTML+= plantilla;
            if (arregloPaises.includes(locacion.country)!=true){
                arregloPaises.push(locacion.country)
            }
        }
        for(const item of arregloPaises){
            let plantilla =`
                <option value="${item}">${item}</option>
            `
            // se agrega la etiqueta <option> dentro de la etiqueta <select>
            document.querySelector('select').innerHTML+= plantilla;
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