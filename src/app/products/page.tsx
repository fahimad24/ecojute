import Link from "next/link";
import Image from "next/image";
import { Search, Filter, ArrowRight, ShoppingCart, PackageX } from "lucide-react";
import { fetchCategories, fetchProducts } from "@/lib/api";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = resolvedSearchParams.category || "all";
  const searchQuery = resolvedSearchParams.search || "";

  const fetchedCategories = await fetchCategories();
  const categories = [{ id: "all", name: "All Products" }, ...fetchedCategories];
  const products = await fetchProducts(selectedCategory, searchQuery);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Our Collection
          </h1>
          <p className="text-gray-500">
            Discover our handcrafted eco-friendly products.
          </p>
        </div>

        {/* Search */}
        <form action="/products" method="GET" className="relative w-full md:w-96">
          {selectedCategory !== 'all' && <input type="hidden" name="category" value={selectedCategory} />}
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search products..."
            className="w-full bg-white border border-gray-200 rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary transition-colors">
            <Search size={20} />
          </button>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-lg font-bold text-foreground">
              <Filter size={20} /> Categories
            </div>
            <div className="space-y-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={
                    cat.id === "all"
                      ? "/products"
                      : `/products?category=${cat.id}`
                  }
                  className={`block py-2 px-4 rounded-xl transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="mt-8 mb-4">
              <h3 className="font-bold text-foreground mb-4">Sort By</h3>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.length > 0 ? products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
              >
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <Image
                    src={product.images && product.images.length > 0 ? product.images[0] : `https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=600&auto=format&fit=crop`}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-primary hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100">
                    <ShoppingCart size={18} />
                  </button>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-gray-500 mb-1 uppercase tracking-wider font-semibold text-xs">
                    {categories.find(c => c.id === product.categoryId)?.name || 'Product'}
                  </p>
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ৳{product.price}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="bg-jute-light/30 hover:bg-primary hover:text-white text-primary px-4 py-2 rounded-full font-semibold transition-colors flex items-center gap-2 text-sm"
                    >
                      Details <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <PackageX size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
                <p className="text-gray-500">We couldn't find any products in this category.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-400 cursor-not-allowed">
              1
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white font-bold shadow-md">
              2
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 text-foreground transition-colors">
              3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
