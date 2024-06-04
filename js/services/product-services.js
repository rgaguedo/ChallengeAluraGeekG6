const base_uri_service  = "http://localhost:8080";

const getAllProductsRequest = () => {
    return fetch(`${base_uri_service}/products`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const createProductRequest = (name, price, image) => {
    return fetch(`${base_uri_service}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            price,
            image,
        })
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const deleteProductRequest = (id) => {
    return fetch(`${base_uri_service}/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const servicesProducts = {
    getAllProductsRequest: getAllProductsRequest,
    createProductRequest: createProductRequest,
    deleteProductRequest: deleteProductRequest,
};