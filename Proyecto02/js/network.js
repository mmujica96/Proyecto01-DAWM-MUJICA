const URL= "http://api.citybik.es/v2/networks/";
var mapaStation = new Map();
async function cargarDatos() {
    const redes = await this.GetCityBikes(); 
    for(let  red of redes) {
        let compania = red.company;
        let locacion = red.location;
        let nombre = red.name;
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
        document.getElementById("nombreRed").innerHTML="Red - "+result;
        console.log(result);
        fetch(URL+result)
        .then(response => response.json())
        .then(data => {
            document.getElementById('elemento').innerHTML='';
            let id = data.network.id;
            let nombre = data.network.name;
            let arraystation= data.network.stations;
            let claves=[];
            let valores=[];
            for( const station of arraystation){
                console.log(station);
                let plantilla = 
        `
                        <tr>
                            <td>${id}</td>
                            <td>${nombre}</td>
                            <td>${data.network.location.country} - ${data.network.location.city}</td>
                            <td>${station.name}</td>
                            <td> ${station.free_bikes}</td>
                        </tr>

                        `
        document.getElementById('elemento').innerHTML+= plantilla;
        mapaStation.set(station.name,station.free_bikes)
        }
        mapaStation.forEach (function(value, key) {
            claves.push(key);
            valores.push(value);
        })
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
    var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: labels,
    datasets: [
      {
        data: data,
        lineTension: 0,
        backgroundColor: 'rgb(255, 205, 86)',
        borderColor: "#007bff",
        borderWidth: 4,
        pointBackgroundColor: "#007bff",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart'
      }
    }
  },
});
labels=[];
data=[]
}

window.addEventListener('DOMContentLoaded', (event) => {
//se llama el callback(una funcion como parametro de otra funcion)
cargarDatos(); 
});