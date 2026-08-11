'use client';

import { useEffect, useState } from 'react';
import { fetchCategories, Category, getToken } from '@/lib/api';
import { Plus, Trash2, Tag, Edit2, X } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => { loadCategories(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    const token = getToken();
    try {
      const url = editingId ? `${API_URL}/categories/${editingId}` : `${API_URL}/categories`;
      const method = editingId ? 'PATCH' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newName, description: newDesc, image: newImage })
      });
      const data = await response.json();
      
      if (!data.success) {
        alert(data.message || 'Error saving category');
      } else {
        cancelEdit();
        loadCategories();
      }
    } catch (error) {
      alert('Network error occurred');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? Deleting a category may affect products.')) return;
    const token = getToken();
    await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    loadCategories();
  };

  const handleEditClick = (cat: Category) => {
    setEditingId(cat.id);
    setNewName(cat.name);
    setNewDesc(cat.description || '');
    setNewImage(cat.image || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewName('');
    setNewDesc('');
    setNewImage('');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-500 mt-1">Manage product categories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Category Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{editingId ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="E.g. Jute Rugs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Optional description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newImage}
                  onChange={e => setNewImage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="https://unsplash.com/..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={adding}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {editingId ? (
                    <>{adding ? 'Updating...' : 'Update Category'}</>
                  ) : (
                    <><Plus size={18} /> {adding ? 'Adding...' : 'Add Category'}</>
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">All Categories ({categories.length})</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {loading ? (
                <div className="p-6 text-center text-gray-400">Loading...</div>
              ) : categories.length > 0 ? categories.map((cat) => (
                <div key={cat.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    {cat.image ? (
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                        <Tag size={20} />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{cat.name}</p>
                      <p className="text-sm text-gray-500">{cat.description || 'No description'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(cat)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="p-6 text-center text-gray-400">No categories yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
