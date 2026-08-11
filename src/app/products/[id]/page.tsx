import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ShoppingCart,
  Truck,
  RefreshCw,
  ShieldCheck,
  PackageX,
} from "lucide-react";
import { notFound } from "next/navigation";
import { fetchProductById, fetchProducts } from "@/lib/api";
import ProductActions from "@/components/ProductActions";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = await fetchProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  // Fetch related products (just fetching all for now, taking first 4)
  const allProducts = await fetchProducts(product.categoryId);
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Products
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="bg-gray-50 p-8 flex items-center justify-center relative group h-125 md:h-auto">
              <div className="relative w-full h-full max-h-150 overflow-hidden rounded-2xl">
                <Image
                  src={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=800&auto=format&fit=crop"}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-125 transition-transform duration-700 ease-in-out cursor-zoom-in"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full uppercase tracking-wider mb-4 w-max">
                In Stock
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="text-4xl font-bold text-primary mb-8">
                ৳{product.price}
              </div>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-gray-50 rounded-2xl">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Material</p>
                  <p className="font-semibold text-foreground">
                    {product.material || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Dimension</p>
                  <p className="font-semibold text-foreground">
                    {product.size || "N/A"}
                  </p>
                </div>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <CheckCircle2
                          className="text-primary shrink-0 mt-0.5"
                          size={20}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <ProductActions product={product} />
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-foreground">Fast Delivery</h4>
              <p className="text-sm text-gray-500">Inside Dhaka 2-3 days</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-foreground">Premium Quality</h4>
              <p className="text-sm text-gray-500">100% Authentic Jute</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 className="font-bold text-foreground">Easy Returns</h4>
              <p className="text-sm text-gray-500">7-day return policy</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.length > 0 ? relatedProducts.map((item) => (
              <Link
                href={`/products/${item.id}`}
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image
                    src={item.images && item.images.length > 0 ? item.images[0] : `https://images.unsplash.com/photo-1601625902195-021b3f71c4c9?q=80&w=400&auto=format&fit=crop`}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-bold text-primary">৳{item.price}</p>
                </div>
              </Link>
            )) : (
              <div className="col-span-full py-8 text-center text-gray-500">
                No related products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
