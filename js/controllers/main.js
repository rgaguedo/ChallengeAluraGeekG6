import { servicesProducts } from "../services/product-services.js";

const productsContainer = document.querySelector("[data-products]");
const formContainer = document.querySelector("[data-form]");

function createProduct (name, price, image, id) {
    const product = document.createElement("div");
    product.classList.add("product-item");

    product.innerHTML = `
        <div class="container-item-img">
            <img class="item-img-product" src="${image}" alt="${name}">
        </div>
        <div class="container-item-info">
            <p>${name}</p>
            <div class="container-item-info-price">
                <p>S/. ${price}</p>
                <button class="btn-delete" data-id id="${id}">
                    <img class="img-delete" src="./assets/img-delete.png" alt="Eliminar">
                </button>
            </div>
        </div>
    `
    productsContainer.appendChild(product);

    const btnDelete = product.querySelector('.btn-delete');
    btnDelete.addEventListener("click", () => {
        const id = btnDelete.id
        servicesProducts.deleteProductRequest(id).then(response => {

            render();
        })
            .catch(err => alert("Hubo un error"));
    });

    return product;
}

const render = async () => {
    try {
        const productosLista = await servicesProducts.getAllProductsRequest();
        productosLista.forEach(producto => {
            productsContainer.appendChild(
                createProduct(
                    producto.name,
                    producto.price,
                    producto.image,
                    producto.id
                )
            )
        })

    } catch (error) {
        console.log(error);
    }
}

formContainer.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.querySelector("[data-name]").value;
    const precio = document.querySelector("[data-price]").value;
    const imagen = document.querySelector("[data-image]").value;

    servicesProducts
        .createProductRequest(nombre, precio, imagen)
        .then((res) => render())
        .catch((err) => console.log(err))

    formContainer.reset();
})

render();