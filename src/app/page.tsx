import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, ShieldCheck, Recycle } from "lucide-react";
import { fetchProducts, fetchCategories } from "@/lib/api";

export default async function Home() {
  const products = await fetchProducts();
  const categories = await fetchCategories();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-green-900 via-[#1a3622] to-black py-20 md:py-0">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-jute-light blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Hero Content */}
          <div className="flex-1 text-center md:text-left mt-10 md:mt-0">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-white backdrop-blur-md mb-6 border border-white/20 text-sm font-bold uppercase tracking-widest shadow-lg">
              🌿 Premium Eco Collection
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Nature's Finest <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-jute-light to-white">
                Sustainable Style.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl mx-auto md:mx-0 font-light leading-relaxed">
              Discover beautifully handcrafted jute bags, baskets, and
              accessories. Elevate your everyday life while protecting our
              planet with 100% biodegradable materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-white hover:text-primary text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] transform hover:-translate-y-1"
              >
                Shop Collection <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          {/* Hero Image / Cards */}
          <div className="flex-1 relative w-full md:block mt-10 md:mt-0">
            <div className="relative w-full aspect-4/5 max-w-md mx-auto">
              <div className="absolute inset-0 bg-linear-to-tr from-primary/40 to-transparent rounded-4xl transform rotate-3 scale-105 transition-transform duration-500 hover:rotate-6"></div>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-4xl border border-white/20 overflow-hidden shadow-2xl transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1615598585641-654876bbf255?q=80&w=1000&auto=format&fit=crop"
                  alt="Eco-friendly Jute Products"
                  fill
                  className="object-cover opacity-90 hover:scale-110 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Strip */}
      <section className="bg-jute-light py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Why Choose Jute?
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed font-medium">
              Jute is more than just a fiber; it's a commitment to our planet.
              100% biodegradable, incredibly durable, and beautifully
              handcrafted by artisans in Bangladesh. Embrace the eco-friendly
              lifestyle without compromising on elegance and style.
            </p>
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.slice(0, 4).map((category, index) => (
              <Link
                href={`/products?category=${category.id}`}
                key={index}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover-scale block"
              >
                <Image
                  src={
                    category.image ||
                    "https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-jute-light transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Best Sellers
              </h2>
              <div className="w-24 h-1 bg-primary rounded-full"></div>
            </div>
            <Link
              href="/products"
              className="text-primary font-semibold hover:text-primary-dark transition-colors flex items-center gap-1"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={
                      item.images && item.images.length > 0
                        ? item.images[0]
                        : `https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=600&auto=format&fit=crop`
                    }
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                    New
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-gray-500 mb-1">
                    {categories.find((c) => c.id === item.categoryId)?.name ||
                      "Product"}
                  </p>
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="text-xl font-bold text-primary">
                      ৳{item.price}
                    </span>
                    <Link
                      href={`/products/${item.id}`}
                      className="bg-jute-light/30 hover:bg-primary hover:text-white text-primary p-2 rounded-full transition-colors"
                    >
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-jute-light/20 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Handmade in Bangladesh
              </h3>
              <p className="text-gray-600 text-sm">
                Authentic craftsmanship supporting local artisans and their
                families.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-jute-light/20 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                100% Eco-Friendly
              </h3>
              <p className="text-gray-600 text-sm">
                Completely biodegradable materials that leave zero carbon
                footprint.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-jute-light/20 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Recycle size={32} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Durable & Reusable
              </h3>
              <p className="text-gray-600 text-sm">
                Built to last years of heavy usage without tearing or losing
                shape.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
