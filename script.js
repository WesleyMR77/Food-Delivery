import { data } from './data.js'


function listarOpcoes(id, name, descript, price, image) {
  return `
    <li data-id="${id}">
      <a  href="#">
        <div class="list-img">
          <img src="${image}" alt="">
        </div>   
        <span class="list-name">${name}</span> <br>
        <span class="list-description">${descript}</span> <br>
        <span class="list-price">R$ ${price}</span> <br>
      
      </a>
    </li> 
    `
}
/////muda categoria e lista ela
function verificaCategoria(categorySelected = 'all' ) {
  const cardapio = document.querySelector('.opcoes-pedido')

  const listaInformacoes = data.reduce(function (accumulator, { id, name, descript, price, image, category }) {
    if (categorySelected === 'all') {
      accumulator += listarOpcoes(id, name, descript, price, image)
      //console.log(accumulator)
    }
    
    if (categorySelected === category) {
      accumulator += listarOpcoes(id, name, descript, price, image)
     // console.log(accumulator)
    }
    return accumulator
  }, '')

  cardapio.innerHTML = listaInformacoes; 
}

////pega as categorias
function addCategoria(){
const categories = document.querySelectorAll('.todas-categorias')

categories.forEach(category => {
  category.onclick = (event) => {
    let i = 0
    while (i < categories.length) {
      categories[i++].classList.remove('active')
    }
    category.classList.add('active')
    //console.log(category);
    const categorySelected = event.currentTarget.dataset.category
    verificaCategoria(categorySelected)
    getCarrinho()
  }
})
}

//cria lista de itens para a armazenar
function listaCarrinho(id, name, price, image) {

  return `
    <li class="" data-idorder="${id}">
      <div class="order-img">
        <img src="${image}" alt="">
      </div>
      <div class="order-text">
        <span class="order-name">${name}</span> <br>
        <span class="order-price">R$${price}</span> <br> 
      </div>
    </li>
  `
}

function adicionaProdutosCarrinho(order) {
  
  const orderDOM = document.querySelector('.todos-pedidos')
  const listProduct = order.reduce((accumulator, {id, name, price, image}) => accumulator += listaCarrinho(id, name, price, image), '')
  orderDOM.innerHTML = listProduct
  //console.log(listProduct)
}


function getCarrinho() {
  const productsDOM = document.querySelectorAll('[data-id]')

  let order = JSON.parse(localStorage.getItem('order')) || []

  adicionaProdutosCarrinho(order)
  productsDOM.forEach(productIem => {
    productIem.addEventListener('click', function (event) {
      const ID = event.currentTarget.dataset.id
  
      const productClicked = data.find(({ id }) => Number(ID) === id)
      
      order.push(productClicked)
      localStorage.setItem('order', JSON.stringify(order))
      adicionaProdutosCarrinho(order)

    })
  })
}

verificaCategoria()
addCategoria()
getCarrinho()


