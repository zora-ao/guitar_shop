import { useEffect, useState } from "react";

interface Product{
    id: number;
    name: string;
    price: number;
    image_url: string;
    description: string;
    brand: string;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products/")
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error(err))
    }, [])

    return (
        <div className="flex justify-evenly pt-10">
            {products.map(product => (
                <div className="border border-red-500 rounded w-100 text-center px-10 py-6 flex flex-col items-center justify-center" key={product.id}>
                    <img className="w-20 border shadow rounded border-gray-300 p-2" src={product.image_url} alt={product.name} />
                    <h1 className="font-bold">{product.name}</h1>
                    <h2>${product.price}</h2>
                    <p>{product.description}</p>
                    <p>{product.brand}</p>
                </div>
            ))}
        </div>
    )
}

export default Products
