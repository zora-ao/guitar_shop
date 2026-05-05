import React, { useEffect, useState } from 'react';
import { Edit2, Save, Trash2, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Product } from '../../types/product';
import { deleteProduct, getAdminProducts, updateProduct } from '../../api/admin';

const ProductList: React.FC = () => {
    const queryClient = useQueryClient();

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [previewsUrls, setPreviewUrls] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<(File | null)[]>(new Array(4).fill(null));

    const {data: products = [], isLoading, error} = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getAdminProducts
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
            toast.success("Product deleted.");
        },
        onError: (error: Error) => toast.error(error.message)
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData }) => updateProduct(id, data),
        onSuccess: () => {
            previewsUrls.forEach(url => { if (url.startsWith('blob:')) URL.revokeObjectURL(url); });
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success("Product updated!");
            setEditingProduct(null);
        },
        onError: (err: any) => toast.error(err.message)
    });

    const handleDelete = (id:number) => {
        if (window.confirm("Delete this product?")) deleteMutation.mutate(id);
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
        const existingImages = previewsUrls.filter(url => url.startsWith('http'));
        formData.append('existing_images', JSON.stringify(existingImages));
        newFiles.forEach(file => { if (file) formData.append('images', file); });
        updateMutation.mutate({ id: editingProduct.id, data: formData });
    };

    useEffect(() => {
        if (editingProduct){
            const initialPreviews = [...editingProduct.images];
            while (initialPreviews.length < 4) initialPreviews.push("");
            setPreviewUrls(initialPreviews);
            setNewFiles(new Array(4).fill(null))
        }
    }, [editingProduct]);

    if (isLoading) return <div className="p-8 text-stone-500">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading products.</div>;

    return (
        <div className="p-4 md:p-8 w-full max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-stone-800 mb-6 uppercase tracking-tight">Inventory</h2>

            <div className="border border-stone-200 rounded-lg overflow-hidden bg-white shadow-sm">
                {/* TABLE HEADER - Hidden on mobile */}
                <div className="hidden md:grid grid-cols-[80px_1fr_120px_100px_100px_120px] bg-stone-50 border-b border-stone-200 py-3 px-4 text-[10px] uppercase tracking-widest font-black text-stone-400">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Stock</span>
                    <span className="text-center">Actions</span>
                </div>

                <div className="flex flex-col divide-y divide-stone-100">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            // Mobile: Flex column | Desktop: Grid
                            className="flex flex-col md:grid md:grid-cols-[80px_1fr_120px_100px_100px_120px] items-start md:items-center p-4 md:py-3 md:px-4 hover:bg-stone-50 transition-colors gap-4 md:gap-0"
                        >
                            {/* Row 1: Image & Name (Mobile Layout) */}
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <img src={product.images?.[0] || '/placeholder'} alt="" className="w-12 h-12 md:w-10 md:h-10 object-cover rounded border border-stone-200 shadow-sm" />
                                <div className="md:hidden">
                                    <p className="text-sm font-bold text-stone-800">{product.name}</p>
                                    <p className="text-[10px] uppercase text-stone-400 font-bold">{product.category}</p>
                                </div>
                            </div>

                            {/* Desktop only Name */}
                            <span className="hidden md:block text-sm font-medium text-stone-700">{product.name}</span>
                            
                            {/* Desktop only Category */}
                            <span className="hidden md:block text-sm text-stone-500">{product.category}</span>
                            
                            {/* Price & Stock info grouped for Mobile */}
                            <div className="flex justify-between w-full md:contents">
                                <span className="text-sm font-bold text-stone-900 md:text-stone-700">
                                    <span className="md:hidden text-stone-400 font-normal mr-1">Price:</span>
                                    ${product.price}
                                </span>
                                
                                <span className={`text-sm font-bold ${product.stock < 5 ? 'text-red-500' : 'text-stone-600'}`}>
                                    <span className="md:hidden text-stone-400 font-normal mr-1">Stock:</span>
                                    {product.stock} {product.stock < 5 && '(Low)'}
                                </span>
                            </div>

                            {/* Actions Group */}
                            <div className="flex justify-end gap-3 w-full md:w-auto md:justify-center border-t md:border-0 pt-3 md:pt-0">
                                <button onClick={() => setEditingProduct(product)} className="flex items-center gap-2 md:block text-stone-500 hover:text-black transition-colors">
                                    <Edit2 size={18} />
                                    <span className="md:hidden text-xs font-bold uppercase">Edit</span>
                                </button>
                                <button onClick={() => handleDelete(product.id)} className="flex items-center gap-2 md:block text-stone-400 hover:text-red-600 transition-colors">
                                    <Trash2 size={20} />
                                    <span className="md:hidden text-xs font-bold uppercase">Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* EDIT MODAL - Optimized for Mobile Scrolling */}
            {editingProduct && (
                <div className="fixed p-4 rounded inset-0 bg-stone-900/60 backdrop-blur-sm flex items-end md:items-center justify-center z-[100] p-0 md:p-4">
                    <div className="bg-white rounded-t-3xl md:rounded-xl shadow-2xl w-full max-w-lg h-[90vh] md:h-auto max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center bg-stone-50 shrink-0">
                            <h3 className="font-bold text-stone-800 uppercase tracking-tight">Edit Product</h3>
                            <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-stone-200 rounded-full transition-colors"><X size={20}/></button>
                        </div>
                        
                        <form onSubmit={handleSaveEdit} className="p-6 space-y-6 overflow-y-auto pb-32 md:pb-6">
                            {/* Gallery Section */}
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-stone-400 tracking-widest">Gallery (Max 4)</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[0, 1, 2, 3].map((index) => (
                                        <div key={index} className="aspect-square relative border-2 border-dashed border-stone-200 rounded-xl overflow-hidden bg-stone-50 group">
                                            {previewsUrls[index] ? (
                                                <>
                                                    <img src={previewsUrls[index]} alt="" className="w-full h-full object-cover" />
                                                    <button type="button" onClick={() => {
                                                        const up = [...previewsUrls]; up[index] = ""; setPreviewUrls(up);
                                                        const nf = [...newFiles]; nf[index] = null; setNewFiles(nf);
                                                    }} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <X className="text-white" size={20} />
                                                    </button>
                                                </>
                                            ) : (
                                                <label className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-stone-100 transition-colors">
                                                    <span className="text-[10px] text-stone-400 font-bold">ADD</span>
                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const up = [...previewsUrls]; up[index] = URL.createObjectURL(file); setPreviewUrls(up);
                                                            const nf = [...newFiles]; nf[index] = file; setNewFiles(nf);
                                                        }
                                                    }} />
                                                </label>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Product Name</label>
                                    <input type="text" className="w-full border-stone-200 border p-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}/>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Category</label>
                                        <select className="w-full border-stone-200 border p-3 rounded-xl outline-none bg-white" value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}>
                                            <option value="Strings">Strings</option>
                                            <option value="Wind">Wind</option>
                                            <option value="Percussion">Percussion</option>
                                            <option value="Keyboards">Keyboards</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center pt-4">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" checked={editingProduct.isBestSeller} onChange={(e) => setEditingProduct({...editingProduct, isBestSeller: e.target.checked})} className="w-5 h-5 accent-black rounded border-stone-300"/>
                                            <span className="text-[10px] font-black uppercase text-stone-400 group-hover:text-black transition-colors">Best Seller</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Price ($)</label>
                                        <input type="number" className="w-full border-stone-200 border p-3 rounded-xl outline-none" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}/>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Stock</label>
                                        <input type="number" className="w-full border-stone-200 border p-3 rounded-xl outline-none" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="fixed bottom-2 left-5 right-5 md:left-0 md:right-0 p-4 md:relative md:border-0 md:p-0 shrink-0">
                                <button type="submit" disabled={updateMutation.isPending} className="w-full bg-black text-white py-4 md:py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 disabled:bg-stone-400 transition-all shadow-lg">
                                    <Save size={18} /> {updateMutation.isPending ? 'Updating...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;