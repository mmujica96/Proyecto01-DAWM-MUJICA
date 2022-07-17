window.addEventListener('DOMContentLoaded', (event) => {
  cargarDatos(); 
});

var mapaPaises = new Map();
var mapaCiudad = new Map();
var claves=[];
var valores=[];
const URL= "http://api.citybik.es";

async function cargarDatos() {
    let countNetworks=0;
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
        if(mapaPaises.has(locacion.country)!= true){
          mapaPaises.set(locacion.country,1);
        }else{
          valor=mapaPaises.get(locacion.country);
          mapaPaises.set(locacion.country, valor+1);
        }
        if(mapaCiudad.has(locacion.city)!= true){
          mapaCiudad.set(locacion.city,1);
        }else{
          valor=mapaCiudad.get(locacion.city);
          mapaCiudad.set(locacion.city, valor+1);
        }
        /*fetch(URL+href)
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(console.error);*/
        }
        //console.log(countNetworks);
        document.getElementById("totalpais").innerHTML= mapaPaises.size
        document.getElementById("totalciudad").innerHTML= mapaCiudad.size
        document.getElementById("totalnetworks").innerHTML= countNetworks;
        console.log(mapaCiudad);
        console.log(mapaPaises);
        mapaPaises.forEach (function(value, key) {
          claves.push(key);
          valores.push(value);
        })
        chart(claves,valores)
};

var busqueda = document.getElementById('buscar');
var table = document.getElementById("tabla").tBodies[0];

buscaTabla = function(){
  texto = busqueda.value.toLowerCase();
  var r=0;
  while(row = table.rows[r++])
  {
    if ( row.innerText.toLowerCase().indexOf(texto) !== -1 )
      row.style.display = null;
    else
      row.style.display = 'none';
  }
}

busqueda.addEventListener('keyup', buscaTabla);

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

//Graph 
function chart(labels,data) {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Numero de redes de bicicletas',
        data: data,
        lineTension: 0,
        backgroundColor: "transparent",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
        },
      
    },
  },
});
}