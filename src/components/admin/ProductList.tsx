import React, { useEffect, useState } from 'react';
import { Edit2, Save, Trash2, X, XCircle } from 'lucide-react'; // Using Lucide for the delete icon
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Product } from '../../types/product';
import { deleteProduct, getAdminProducts, updateProduct } from '../../api/admin';

const ProductList: React.FC = () => {
    const queryClient = useQueryClient();

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [previewsUrls, setPreviewUrls] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<(File | null)[]>(new Array(4).fill(null));

    const {data: products = [], isLoading, error} =  useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getAdminProducts
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
            toast.success("Product deleted from the list.");
        },

        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData }) => updateProduct(id, data),
        onSuccess: () => {
            previewsUrls.forEach(url => {
                if (url.startsWith('blob:')) URL.revokeObjectURL(url);
            });

            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success("Product updated successfully!");
            setEditingProduct(null);
        },
        onError: (err: any) => toast.error(err.message)
    });

    const handleDelete = (id:number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteMutation.mutate(id);
        }
    };

    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;

        const formData = new FormData();
        formData.append('name', editingProduct.name);
        formData.append('price', String(editingProduct.price));
        formData.append('stock', String(editingProduct.stock));
        formData.append('category', editingProduct.category);
        formData.append('description', editingProduct.description || "");
        formData.append('is_best_seller', String(editingProduct.isBestSeller));
        
        // Filter existing vs new images
        const existingImages = previewsUrls.filter(url => url.startsWith('http'));
        formData.append('existing_images', JSON.stringify(existingImages));

        newFiles.forEach(file => {
            if (file) formData.append('images', file);
        });

        updateMutation.mutate({ id: editingProduct.id, data: formData });
    };

    useEffect(() => {
        if (editingProduct){
            const initialPreviews = [...editingProduct.images];

            while (initialPreviews.length < 4) initialPreviews.push("");
            setPreviewUrls(initialPreviews);
            setNewFiles(new Array(4).fill(null))
        }

    }, [editingProduct])

    if (isLoading) return <div className="p-8 text-stone-500">Loading products...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading products.</div>;

    return (
        <div className="p-8 w-full max-w-6xl relative">
            <h2 className="text-xl font-medium text-stone-600 mb-6">Inventory Management</h2>

            <div className="border border-stone-200 rounded-sm overflow-hidden bg-white shadow-sm">
                {/* Table Header - Added 'Stock' Column */}
                <div className="grid grid-cols-[80px_1fr_120px_100px_100px_120px] bg-stone-50 border-b border-stone-200 py-3 px-4 text-xs uppercase tracking-wider font-bold text-stone-500">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Stock</span>
                    <span className="text-center">Actions</span>
                </div>

                {products.length === 0 && (
                    <div className="p-20 text-center text-stone-400 text-sm uppercase tracking-widest">
                        No products found in inventory.
                    </div>
                )}

                <div className="flex flex-col">
                    {products.map((product) => (
                        <div key={product.id} className="grid grid-cols-[80px_1fr_120px_100px_100px_120px] items-center py-3 px-4 border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors">
                            <img src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder-image'} alt="" className="w-10 h-10 object-cover rounded border border-stone-200" />
                            <span className="text-sm font-medium text-stone-700">{product.name}</span>
                            <span className="text-sm text-stone-500">{product.category}</span>
                            <span className="text-sm text-stone-700">${product.price}</span>
                            
                            {/* Stock Display with color logic */}
                            <span className={`text-sm font-bold ${product.stock < 5 ? 'text-red-500' : 'text-stone-600'}`}>
                                {product.stock}
                            </span>

                            <div className="flex justify-center gap-2">
                                <button 
                                    onClick={() => setEditingProduct(product)}
                                    className="text-stone-400 hover:text-blue-600 p-1 transition-colors">
                                    <Edit2 size={18} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(product.id)}
                                    disabled={deleteMutation.isPending}
                                    className="text-stone-400 hover:text-red-500 p-1 transition-colors">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* EDIT MODAL */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="bg-stone-50 p-4 border-b flex justify-between items-center">
                            <h3 className="font-serif text-lg">Edit {editingProduct.name}</h3>
                            <button onClick={() => setEditingProduct(null)}><XCircle /></button>
                        </div>
                        
                        <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
                            {/* Replace the old "Image Upload Section" with this */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase text-stone-500">Product Gallery (Max 4)</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[0, 1, 2, 3].map((index) => (
                                        <div key={index} className="aspect-square relative border border-stone-200 rounded overflow-hidden bg-stone-50 group">
                                            {previewsUrls[index] ? (
                                                <>
                                                    <img src={previewsUrls[index]} alt="" className="w-full h-full object-cover" />
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            const up = [...previewsUrls]; up[index] = ""; setPreviewUrls(up);
                                                            const nf = [...newFiles]; nf[index] = null; setNewFiles(nf);
                                                    }}
                                                    className="absolute top-0.5 right-0.5 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={10} />
                                                </button>
                                            </>
                                            ) : (
                                                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-stone-100 transition-colors">
                                                    <span className="text-[10px] text-stone-400 font-bold">ADD</span>
                                                    <input 
                                                        type="file" 
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const up = [...previewsUrls]; up[index] = URL.createObjectURL(file); setPreviewUrls(up);
                                                                const nf = [...newFiles]; nf[index] = file; setNewFiles(nf);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Product Name</label>
                                    <input type="text" className="w-full border p-2 rounded" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}/>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Category</label>
                                    <select 
                                        className="w-full border p-2 rounded text-sm"
                                        value={editingProduct.category}
                                        onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                                    >
                                        <option value="Strings">Strings</option>
                                        <option value="Wind">Wind</option>
                                        <option value="Percussion">Percussion</option>
                                        <option value="Keyboards">Keyboards</option>
                                    </select>
                                </div>

                                <div className="flex items-end pb-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={editingProduct.isBestSeller} 
                                            onChange={(e) => setEditingProduct({...editingProduct, isBestSeller: e.target.checked})}
                                            className="w-4 h-4 accent-stone-800"
                                        />
                                        <span className="text-xs font-bold uppercase text-stone-500">Best Seller</span>
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Price ($)</label>
                                    <input type="number" className="w-full border p-2 rounded" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Stock</label>
                                    <input type="number" className="w-full border p-2 rounded" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}/>
                                </div>
                            </div>
                            
                            <button type="submit" disabled={updateMutation.isPending} className="w-full bg-stone-800 text-white py-3 rounded flex items-center justify-center gap-2 hover:bg-black">
                                <Save size={16} /> {updateMutation.isPending ? 'Updating...' : 'Save Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;