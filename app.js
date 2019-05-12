firebase.initializeApp({
    apiKey: "AIzaSyBRhOxLBsM3pYgbOPSIAYEOU5BA6o3EpzA",
    authDomain: "protectousuarios.firebaseapp.com",
    projectId: "protectousuarios"
  });
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
  
  function guardar(){
    
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;
    
    db.collection("users").add({
        nombre: nombre,
        apellido: apellido,
        fecha: fecha
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value='';
        document.getElementById('apellido').value='';
        document.getElementById('fecha').value='';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }


  //Leer Documentos
    
  var tabla =document.getElementById('tabla');

  db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML+= `
        <tr>
              <th scope="row">${doc.id}</th>
              <td>${doc.data().nombre}</td>
              <td>${doc.data().apellido}</td>
              <td>${doc.data().fecha}</td>
              <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
              <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().fecha}')">Editar</button></td>


            </tr>
        `

    });
});

//Borrar_Datos

function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("El Documento ha sido Eliminado");
    }).catch(function(error) {
        console.error("Error no se pudo eliminar: ", error);
    });

}

//Actualizar_Datos

function editar(id, nombre,apellido,fecha){

    document.getElementById('nombre').value =nombre;
    document.getElementById('apellido').value =apellido;
    document.getElementById('fecha').value =fecha;
    var boton =document.getElementById('boton');
    boton.innerHTML='Editar';
    
    boton.onclick = function(){
        var washingtonRef = db.collection("users").doc(id);
                   
        // Set the "capital" field of the city 'DC'
        var nombre =document.getElementById('nombre').value;
        var apellido =document.getElementById('apellido').value;
        var fecha =document.getElementById('fecha').value;


        return washingtonRef.update({
            nombre: nombre,
            apellido: apellido,
            fecha: fecha
        })
        .then(function() {
            console.log("Edicion exitosa");
            boton.innerHTML='Guardar';
            document.getElementById('nombre').value='';
            document.getElementById('apellido').value='';
            document.getElementById('fecha').value='';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    }


   
    

}


 