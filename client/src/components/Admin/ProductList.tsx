import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async() => {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
    };

    const deleteProduct = async(id: number) => {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
        toast.success("Product Deleted!");
    }

    useEffect(() => {
        fetchProducts();
    }, [])
    
    return (
    <div>
        <h2 className="text-xl mb-4">Products</h2>

        {products.map((p) => (
            <div key={p.id} className="border p-2 mb-2 flex gap-4 items-center">
            <img src={p.image_url} className="w-16 h-16 object-cover" />
            <div>
                <p>{p.name}</p>
                <p>₱{p.price}</p>
            </div>

            <button onClick={() => deleteProduct(p.id)}>
                Delete
            </button>
            </div>
        ))}
    </div>
    );
}

export default ProductList
