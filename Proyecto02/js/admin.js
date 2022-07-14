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

const URL= "http://api.citybik.es";

async function cargarDatos() {
    let countNetworks=0;
    let arregloPaises =[];
    let arregloCiudad =[];
    const redes = await this.GetCityBikes(); 
    for(let  red of redes) {
      countNetworks= countNetworks+1;
        let compania = red.company;
        let locacion = red.location;
        let nombre = red.name;
        let id = red.id;
        let href = red.href;
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
        if(arregloPaises.includes(locacion.country) != true){
          arregloPaises.push(locacion.country);
        }
        if(arregloCiudad.includes(locacion.city) != true){
          arregloCiudad.push(locacion.city);
        }
        fetch(URL+href)
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(console.error);
        }
        //console.log(arregloCiudad);
        //console.log(countNetworks);
        document.getElementById("totalpais").innerHTML= arregloPaises.length;
        document.getElementById("totalciudad").innerHTML= arregloCiudad.length;
        document.getElementById("totalnetworks").innerHTML= countNetworks;

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