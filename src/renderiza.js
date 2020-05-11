let renderFicha = ficha => {
  return `
  <div class="contact-card">
    <header>
      <div class="ficha">
        <div class="imagen-ficha">
        <img src="${ficha.picture.thumbnail}"  alt='imagen'/>
        </div>
        <div class="user-data">
          <h4>${ficha.name.first}</h4>
          <h5>${ficha.email}</h5>
        </div>
        <button id='bot_delete' name='${ficha._id}' 
          onclick="delete_aqui(this.name)"> x 
        </button>

      </div>
      
    </header>
  </div>
  `
}



export {renderFicha}