import axios from "axios"
import React, { useState } from "react"
import { toast } from "react-toastify";

const AddProducts = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (file: File) => {
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image){
            toast.error("Please select an image!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("brand", brand);
        formData.append("description", description);
        formData.append("image", image);

        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:5000/api/products",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            console.log(res.data);
            toast.success("Product uploaded!");

            setName("");
            setPrice("");
            setBrand("");
            setDescription("");
            setImage(null);
            setPreview(null);

        } catch (error) {
            console.error(error);
            toast.error("Failed to upload");
        } finally {
            setLoading(false);
        }
    }

    return (
    <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Upload Product</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2"
            />

            <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2"
            />

            <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border p-2"
            />

            <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2"
            />

            <input
            type="file"
            accept="image/*"
            onChange={(e) =>
                e.target.files && handleImageChange(e.target.files[0])
            }
            />

            {/* Image Preview */}
            {preview && (
            <img
                src={preview}
                alt="preview"
                className="w-40 h-40 object-cover border"
            />
            )}

            <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2"
            >
            {loading ? "Uploading..." : "Upload Product"}
            </button>
        </form>
        </div>
    );
}

export default AddProducts
