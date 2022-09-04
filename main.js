/* Swal.fire({
    title: "¿Sos mayor a 18 años?",
    icon: "question",
    showConfirmButton: true,
    confirmButtonText:"Si",
    confirmButtonColor: "#0AC804",
    showCancelButton: true,
    cancelButtonText: "No",
    footer: " ¡Tienes que ser mayor de edad para poder acceder! ",
    
  
  });
 */
/*  const Toast = Swal.fire({
    position: "top-end",
    toast: true,
    timer: 3000,
    timerProgressBar: true,
  }) */

  /* function enviarMail(){
    if(Nombre === " "){
        const Toast = Swal.fire({
            title:"¡Su consulta fue enviada correctamente!",
            icon:"error"
        })
    }
    else{
    const Toast = Swal.fire({
        title:"¡Su consulta fue enviada correctamente!",
        showConfirmButton: false,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
      }, 
      });

    }

  } */
const formulario = document.getElementById("formulario")
const inputs = document.querySelectorAll("#formulario input")

  const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos ={
    nombre:false,
    correo:false,
    telefono:false
}


const validarFormulario =(e) =>{
switch(e.target.name){ //En cada case escribo todo el codigo y no como funcion porque me daba error.
    case "nombre":
        validarCampo(expresiones.nombre, e.target, 'nombre');
break;
    case "correo":
        validarCampo(expresiones.correo, e.target, 'correo');
break;
    case "telefono":
        validarCampo(expresiones.telefono, e.target, 'telefono');
break;
    
}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input)=>{
input.addEventListener("keyup",validarFormulario )
input.addEventListener("blur",validarFormulario )
});


formulario.addEventListener("submit",(e) =>{
e.preventDefault();

const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
})

