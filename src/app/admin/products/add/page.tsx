'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategories, createProduct, Category } from '@/lib/api';
import { Upload, Plus, Trash2 } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    size: '',
    material: '',
    categoryId: '',
  });

  const [images, setImages] = useState<string[]>(['']);
  const [features, setFeatures] = useState<string[]>(['']);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => setImages([...images, '']);
  const removeImageField = (index: number) => setImages(images.filter((_, i) => i !== index));

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeatureField = () => setFeatures([...features, '']);
  const removeFeatureField = (index: number) => setFeatures(features.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        images: images.filter(img => img.trim() !== ''),
        features: features.filter(f => f.trim() !== '')
      };

      if (!payload.categoryId) {
        throw new Error('Please select a category');
      }

      const res = await createProduct(payload);
      if (res.success) {
        alert('Product added successfully!');
        router.push('/products');
      } else {
        throw new Error(res.message || 'Failed to create product');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 shadow-xl text-black">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-500 mt-1">Add a new eco-friendly product to your store</p>
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Upload size={28} />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Basic Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-black"
                    placeholder="E.g. Jute Tote Bag"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Price (৳) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-black"
                    placeholder="850"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Category *</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={e => setFormData({...formData, categoryId: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-black"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none text-black"
                    placeholder="Product description..."
                  />
                </div>
              </div>

              {/* Attributes & Arrays */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Attributes</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Material</label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={e => setFormData({...formData, material: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-black"
                      placeholder="E.g. 100% Natural Jute"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Size / Dimensions</label>
                    <input
                      type="text"
                      value={formData.size}
                      onChange={e => setFormData({...formData, size: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-black"
                      placeholder='E.g. 14" x 16"'
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="text-lg font-bold text-gray-900">Image URLs</h3>
                    <button type="button" onClick={addImageField} className="text-primary text-sm font-medium flex items-center hover:underline">
                      <Plus size={16} className="mr-1" /> Add URL
                    </button>
                  </div>
                  {images.map((img, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        value={img}
                        onChange={e => handleImageChange(index, e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm text-black"
                        placeholder="https://unsplash.com/..."
                      />
                      {images.length > 1 && (
                        <button type="button" onClick={() => removeImageField(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="text-lg font-bold text-gray-900">Key Features</h3>
                    <button type="button" onClick={addFeatureField} className="text-primary text-sm font-medium flex items-center hover:underline">
                      <Plus size={16} className="mr-1" /> Add Feature
                    </button>
                  </div>
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={e => handleFeatureChange(index, e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm text-black"
                        placeholder="E.g. Eco-friendly"
                      />
                      {features.length > 1 && (
                        <button type="button" onClick={() => removeFeatureField(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 disabled:opacity-50"
              >
                {loading ? 'Publishing...' : 'Publish Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
