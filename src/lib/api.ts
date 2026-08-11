const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  size?: string;
  material?: string;
  categoryId: string;
  images: string[];
  features: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

// Token helper
export const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') : null;

// Categories
export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.warn('Failed to fetch categories');
      return [];
    }
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Products
export async function fetchProducts(categoryId?: string, search?: string): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (categoryId && categoryId !== 'all') params.append('category', categoryId);
    if (search) params.append('search', search);

    const url = `${API_URL}/products?${params.toString()}`;
      
    // Remove cache for dynamic search
    const fetchOptions = search ? { cache: 'no-store' as RequestCache } : { next: { revalidate: 60 } };
    
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
      console.warn('Failed to fetch products');
      return [];
    }
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch product');
    }
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function createProduct(productData: any) {
  const token = getToken();
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(productData),
  });
  return res.json();
}

export async function updateProduct(id: string, productData: any) {
  const token = getToken();
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(productData),
  });
  return res.json();
}


// Auth
export async function login(credentials: any) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function register(userData: any) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function getProfile(): Promise<User | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

// Orders
export async function createOrder(orderData: any) {
  const token = getToken();
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(orderData),
  });
  return res.json();
}

export async function getMyOrders(): Promise<Order[]> {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch(`${API_URL}/orders/my-orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}
