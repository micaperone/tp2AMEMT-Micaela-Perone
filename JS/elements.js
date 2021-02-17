// rescato los elementos necesarios del DOM 

 const tableEl = document.getElementById("tabla");
 
 //creo estas variables de forma global porque se usan en multiples funciones
 let body = document.createElement("tbody");
 let header = document.createElement("thead");
 
 //botones de modals
 const btnAgregarModal= document.getElementById("agregarModal");
 const modalEdicion = document.getElementById("edicionModal");
 const inputBusqueda = document.getElementById("inputBusqueda"); 
 const botonBusqueda = document.getElementById("button-addon2");
 const btnEditarModal = document.getElementById("agregarModalEditar"); 
 const btnSeguroBorrar= document.getElementById("seguroBorrar");
 
 //inputs de modal agregar y editar
 let producto = document.getElementById("prodModal"); 
 let modelo = document.getElementById("modelModal");
 let tela = document.getElementById("telaModal");
 let color = document.getElementById("colorModal");
 let brillo = document.getElementById("brilloModal");
 let stock = document.getElementById("stockModal");
 
 let productoEditar = document.getElementById("prodModalEdit");
 let modeloEditar = document.getElementById("modelModalEdit");
 let telaEditar = document.getElementById("telaModalEdit");
 let colorEditar = document.getElementById("colorModalEdit");
 let brilloEditar = document.getElementById("brilloModalEdit");
 let stockEditar = document.getElementById("stockModalEdit");

//Tabla inicial con productos
let productos= [
        {
            "Producto": "Billetera",
            "Modelo": "Clásica",
            "Tela": "Lona",
            "Color": "Amarilla",
            "Brillo": "Opaca",
            "Stock": "Si",
            
        },
        {
            "Producto": "Billetera",
            "Modelo": "Máxima",
            "Tela": "Cuerina",
            "Color": "Negra",
            "Brillo": "Opaca",
            "Stock": "Si"
        },
        {
            "Producto": "Billetera",
            "Modelo": "Quark",
            "Tela": "Vinilo",
            "Color": "Verde",
            "Brillo": "Brillante",
            "Stock": "Si"
          },
        {
            "Producto": "Tabaquera",
            "Modelo": "Large",
            "Tela": "Lona",
            "Color": "Roja",
            "Brillo": "Opaca",
            "Stock": "No"
          },
        {
            "Producto": "Riñonera",
            "Modelo": "Inés",
            "Tela": "Pul",
            "Color": "Negra",
            "Brillo": "Brillante",
            "Stock": "No"
        }
    
      ]
    

//obtengo las claves del objeto para el header de la tabla
let claves= Object.keys(productos[0]);




