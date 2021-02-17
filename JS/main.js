'use strict'

//Tabla dinamica vista en clase y adaptada

//Funcion que hace el header dinamicamente con las claves del objeto (declarado en elements.js)
let createHeader = (claves, theadEl) => {
  
  let trEl = document.createElement("tr");
  for (let i = 0; i < claves.length; i++) {
    //se crea un elemento th para cada clave
    let thEl = document.createElement("th");
    thEl.classList.add('casillastyle');
    thEl.innerHTML = claves[i];
    trEl.appendChild(thEl);
  }
  theadEl.appendChild(trEl);
  tableEl.appendChild(theadEl);
  
};
//Funcion para crear rows dinámicas
 let createRow = (elemento) => {
  let trEl = document.createElement("tr");
  for (claves in elemento) {
    let tdEl = document.createElement("td");
    tdEl.classList.add('casillastyle');
    tdEl.innerHTML = elemento[claves];
    trEl.appendChild(tdEl);
  } 
  return trEl; //retorna row con el objeto que le demos de parametro
};

//creo los botones para cada fila por separado. 

/* Esto es porque necesito darle un id a cada fila para que la funcion que triggerea el boton 
sepa sobre que fila actuar. Ese ID lo saco del contador que hace filas por cada producto en el Array
y la funcion de createRow usa un for... in que no tiene contador. Tambien se complica porque el boton
necesita el id y debe ser en la misma funcion por la variable local. Probablemente haya una forma mas sencilla
de resolverlo, pero lo pude hacer asi, dividiendo en dos funciones y luego convocando en otra. */

let crearBotones = (row, id) =>{   //recibe la row donde debe sumarse y el id de esa row como parametro
  
  // creo los botones editar/eliminar y los agregrego a la fila
  let btnBorrar = document.createElement('button');
  let btnEditar = document.createElement('button');
  row.appendChild(btnBorrar);
  row.appendChild(btnEditar);
  //agrego texto del display y clases
  btnBorrar.innerText = "Eliminar";
  btnEditar.innerText = "Editar";
  btnBorrar.classList.add('btn','btn-outline-warning');
  btnEditar.classList.add('btn','btn-outline-secondary');
  // atributos de vinculacion con modal de editar y eliminar
  btnEditar.setAttribute('data-bs-toggle', 'modal');
  btnEditar.setAttribute('data-bs-target', '#edicionModal');
  btnBorrar.setAttribute('data-bs-toggle', 'modal');
  btnBorrar.setAttribute('data-bs-target', '#modalParaBorrar');
  //listeners 
  btnBorrar.addEventListener("click", e =>{
    btnSeguroBorrar.setAttribute('data-target', id);
  });
  
  btnEditar.addEventListener("click", e => {
    btnEditarModal.setAttribute('data-target', id);
  });
};

//funcion para crear el cuerpo a partir de la longitud del arreglo en "productos"
let createBody = (elementos, tbodyEl) => {
 
  for (let i = 0; i < elementos.length; i++) {
    
    let filaNumerada = createRow(elementos[i]);
    filaNumerada.id= i;   //aca consigo el id con el contador del for
    filaNumerada.classList.add('filastyle');
    crearBotones(filaNumerada, filaNumerada.id); //aca se lo asigno a los btns por param.
    tbodyEl.appendChild(filaNumerada);
  }
  tableEl.appendChild(tbodyEl);  //agrego el cuerpo a la tabla
};
  
//declaré estas funciones de create por fuera de iniciar pagina porque despues uso el header y el body
//por separado y me detectaba un error en la declaracion de variables.

function cargarTodo() {
  //creo el header
  createHeader(claves, header) 
  // creo el body
  createBody(productos, body);
  // agregrego los listeners de los btns de los modals. 
  btnEditarModal.addEventListener("click", (e) => editar(parseInt(e.target.dataset.target)))
  btnSeguroBorrar.addEventListener("click", (e) => eliminar(btnSeguroBorrar.dataset.target));
  btnAgregarModal.addEventListener('click', agregar)
  //declaro funciones
  function agregar() {
    let entradaInput = {
      "Producto": producto.value,
      "Modelo": modelo.value,
      "Tela": tela.value,
      "Color": color.value,
      "Brillo": brillo.value,
      "Stock": stock.value,
    }  

    document.getElementById("prodModal").value = "";
    document.getElementById("modelModal").value = "";
    document.getElementById("telaModal").value = "";
    document.getElementById("colorModal").value = "";
    document.getElementById("brilloModal").value = "";
    document.getElementById("stockModal").value = "";

    progressBar();
    productos.push(entradaInput);   //se agrega la entrada al array de productos
    refrescar();
   }

  function editar(aux) {

    productos[aux].Producto = productoEditar.value;
    productos[aux].Modelo = modeloEditar.value;
    productos[aux].Tela = telaEditar.value;
    productos[aux].Color = colorEditar.value;
    productos[aux].Brillo = brilloEditar.value;
    productos[aux].Stock = stockEditar.value;
  
   progressBar();
   refrescar();
   }


  let eliminar =(aux) => {  
    if (productos.length == 1) {
      productos.pop(); 
    } else {
      //el target del btn le indica en que posicion extraer
      productos.splice(aux, 1); 
    }
    progressBar();
    refrescar();
  }

  let refrescar =()=> {
    //vacio el body mientras carga la barra
    body.innerHTML = "";
  }

  function progressBar() { //funcion para la progress bar
    let width = 0;
    let barra = document.getElementById("animatedProgressbar");
    let barCont = document.getElementById("contenedorDeBarra");
    let contador = setInterval(carga, 0);
  
    function carga() {
      barCont.classList.remove("d-none"); //aparece la barra
      if (width >= 100) {
        clearInterval(contador);
        setTimeout(function() {
          barra.style.width = 0 + "%";
          barCont.classList.add("d-none"); //desaparece la barra
          createBody(productos, body); //solo refresca el body, porque cuando refrescaba el header saltaba un error
          }, 1000);                    //Cuando cargaba por segunda vez, en vez de asignar una clave a cada td, le asignaba cada una de 
      } else {                         //las letras de la ultima clave. aparecia s t o c k.  Esto no esta solucionado, pero le di la vuelta
          width++;                     // y evito que aparezca el error refrescando solo el body.
          barra.style.width = width + "%";
        }
    } 
  }
  
  //listener del boton de busqueda
  botonBusqueda.addEventListener('click', filtrar);
      
}
    
window.addEventListener("load", cargarTodo) ;

//me tiraba el error "no se puede inicializar antes de...", pero anda si lo declaro acá abajo... don't know
let filtrar = () =>{
  const filtro = productos.filter (e => e.Producto == inputBusqueda.value);
  console.log(filtro);
  body.innerHTML = "";   //no puedo usar la funcion refrescar porqueno está declarada aca abajo, como es una sola linea decidi repetirlo.
  createBody(filtro, body);
}
