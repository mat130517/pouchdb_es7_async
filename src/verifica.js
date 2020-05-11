let empiezaLetra = (cadena) => /^[a-zA-Z]/.test(cadena) 
let noestaVacio = (cadena) => cadena.trim() !=0


let validar = (name, email, image) => {
  let resultado ="";
  if (
  noestaVacio(name) && empiezaLetra(name)   &&
  noestaVacio(email) && empiezaLetra(email) &&
  noestaVacio(image) && empiezaLetra(image)
  ) resultado = "ok"
  else resultado = "invalid"

  return resultado
}



export {validar}