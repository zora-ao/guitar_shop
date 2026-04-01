import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';

export default function AdminAddProducts() {
  const queryClient = useQueryClient();

  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('Acoustic');
  const [price, setPrice] = useState<string>('');
  const [isBestSeller, setIsBestSeller] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const categories = ["Acoustic", "Electric", "Acoustic-Electric"];

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("http://localhost:5000/api/products/add_products", {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!res.ok){
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add product");
      }

      return res.json();

    }, 
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
    formData.append('price', price);
    formData.append('isBestSeller', String(isBestSeller));
    if (image) formData.append('image', image);

    mutation.mutate(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreviewUrl(null);
    }

  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setImage(null);
    setIsBestSeller(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 flex gap-12 bg-[#FDFCFA]">
      
      {/* 1. Upload Section */}
      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-xl font-medium">Upload Image</h3>
        <label 
            htmlFor="file-upload" 
            className="w-[100px] h-[100px] border-2 border-dashed border-stone-300 bg-[#EFEFEF] rounded-lg flex flex-col items-center justify-center cursor-pointer group hover:border-black transition overflow-hidden"
          >
            {/* Conditional Rendering Logic */}
            {previewUrl ? (
              // Show Preview Mode
              <div className="relative w-full h-full">
                <img 
                  src={previewUrl} 
                  alt="Selected guitar preview" 
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                {/* Optional: Add a subtle overlay on hover to indicate they can re-upload */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                  <span className="text-xs font-bold text-white uppercase">Change</span>
                </div>
              </div>
            ) : (
              // Show Icon Mode (Your original SVG)
              <div className="flex flex-col items-center justify-center gap-3">
                <svg className="text-stone-400 group-hover:text-black" width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 17V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {/* Updated span to dynamically show the filename or default text */}
                <span className="text-sm text-stone-500 font-medium group-hover:text-black">
                  {image ? image.name : 'Upload'}
                </span>
              </div>
            )}

            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              accept="image/*" // Good practice: limit to images only
              onChange={handleImageChange} // Use the new handler function
            />
          </label>
      </div>

      {/* 2. Form Section */}
      <div className="flex-1 max-w-2xl space-y-2 pt-1">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Product name</label>
          <input 
            type="text" placeholder="Type here" 
            value={name} onChange={(e) => setName(e.target.value)}
            className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black" />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Product Description</label>
          <textarea 
          placeholder="Write content here" rows={5} 
          value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black"></textarea>
        </div>

        {/* Category & Price Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product category</label>
            <div className="relative">
              <select 
                value={category} onChange={e => setCategory(e.target.value)}
                className="w-full appearance-none border border-stone-300 px-4 py-2 pr-10 rounded-sm text-sm focus:border-black cursor-pointer">
                {categories.map(cat => <option key={cat}>{cat}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5"/></svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Product price</label>
            <input 
              type="text" 
              placeholder="25" 
              value={price} onChange={e => setPrice(e.target.value)}
              className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black" />
          </div>
        </div>

        {/* Best Seller Checkbox */}
        <label className="flex items-center gap-3 cursor-pointer group mt-4">
          <input 
            type="checkbox" 
            checked={isBestSeller} onChange={e => setIsBestSeller(e.target.checked)}
            className="w-4 h-4 border-stone-300 rounded focus:ring-0 accent-black" />
          <span className="text-sm font-medium text-stone-600 group-hover:text-black transition-colors">Add to best seller</span>
        </label>

        {/* Add Button */}
        <button 
          type='submit'
          className="bg-black text-white px-10 py-4 mt-4 rounded w-full text-sm font-semibold hover:bg-stone-800 transition">
            {mutation.isPending ? "Adding..." : "ADD"}
        </button>
      </div>
    </form>
  );
}