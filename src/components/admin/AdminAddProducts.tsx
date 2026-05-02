import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadCloud, X } from 'lucide-react';
import React, { useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { addProduct } from '../../api/admin';

export default function AdminAddProducts() {
  const queryClient = useQueryClient();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('Acoustic');
  const [stock, setStock] = useState<string>('0');
  const [price, setPrice] = useState<string>('');
  const [isBestSeller, setIsBestSeller] = useState<boolean>(false);
  
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const categories = ["Acoustic", "Electric", "Acoustic-Electric"];

  const mutation = useMutation({
    mutationFn: addProduct, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      toast.success("Product added to the list.");
      resetForm();
    },

    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('isBestSeller', String(isBestSeller));
    
    images.forEach((file) => {
      formData.append('images', file);
    });

    mutation.mutate(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (images.length > 4){
      toast.error("All slots are full");
      return;
    }

    setImages((prev) => [...prev, file]);
    setPreviewUrls(prev => [...prev, URL.createObjectURL(file)]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setStock('0');
    setImages([]);
    setIsBestSeller(false);
    setPreviewUrls([]);
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 flex flex-col md:flex-row gap-12 bg-[#FDFCFA]">
      
      {/* 1. Gallery Section - Fixed 4-Slot Grid */}
      <div className="flex flex-col gap-4 items-center md:w-1/3">
        <h3 className="text-xs font-medium self-start uppercase tracking-widest text-stone-500">
          Product Gallery
        </h3>
        
        <div className="grid grid-cols-2 gap-3 w-full">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="aspect-square relative">
              {previewUrls[index] ? (
                /* SLOT FILLED: Show the image and the remove button */
                <div className="w-full h-full rounded-lg overflow-hidden border border-stone-200 group">
                  <img 
                    src={previewUrls[index]} 
                    alt={`Preview ${index}`} 
                    className="w-full h-full object-cover" 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-white text-center py-1 uppercase tracking-tighter">
                      Main Cover
                    </span>
                  )}
                </div>
              ) : (
                /* SLOT EMPTY: Show the upload button */
                <label 
                  htmlFor={`file-upload-${index}`} 
                  className="w-full h-full border-2 border-dashed border-stone-200 bg-stone-50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-white transition-all group"
                >
                  <UploadCloud className="text-stone-300 group-hover:text-black mb-1" size={20} />
                  <span className="text-[9px] uppercase font-bold text-stone-400 group-hover:text-black">
                    Slot {index + 1}
                  </span>
                  <input 
                    id={`file-upload-${index}`} 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                  />
                </label>
              )}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-2 text-center">
          Click a slot to upload <br /> (Max 4 images)
        </p>
      </div>

      {/* 2. Details Section */}
      <div className="flex-1 max-w-2xl space-y-4 pt-1">
        <div>
          <label className="block text-sm font-medium mb-2">Product name</label>
          <input 
            type="text" required value={name} onChange={(e) => setName(e.target.value)}
            className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Product Description</label>
          <textarea 
            required rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black outline-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-stone-300 px-4 py-2 rounded-sm text-sm focus:border-black cursor-pointer outline-none">
                {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price ($)</label>
            <input type="number" required value={price} onChange={e => setPrice(e.target.value)} className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Stock</label>
            <input type="number" required value={stock} onChange={e => setStock(e.target.value)} className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black outline-none" />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer group py-2">
          <input type="checkbox" checked={isBestSeller} onChange={e => setIsBestSeller(e.target.checked)} className="w-4 h-4 accent-black" />
          <span className="text-sm font-medium text-stone-600 group-hover:text-black">Feature as Best Seller</span>
        </label>

        <button 
          type='submit' 
          disabled={mutation.isPending}
          className="bg-black text-white px-10 py-4 mt-4 rounded-sm w-full text-sm font-semibold hover:bg-stone-800 transition disabled:bg-stone-400"
        >
            {mutation.isPending ? "PROCESSING..." : "ADD PRODUCT"}
        </button>
      </div>
    </form>
  );
}