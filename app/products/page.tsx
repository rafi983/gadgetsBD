import { UserNav } from "@/components/auth/UserNav";
import Link from "next/link";
import { ChevronDown, Star, Search } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import { Product } from "@/lib/models/Product";
import { SearchForm } from "@/components/ui/search-form";
import { CartBadge } from "@/components/ui/cart-badge";

export default async function ProductsPage({ searchParams }: { searchParams: any }) {
	await dbConnect();

	const params = await searchParams;
	const { q, category, brand, minPrice, maxPrice, rating } = params;

	// Fetch dynamic categories and brands from the database
	const categories = await Product.distinct("category");
	const brands = await Product.distinct("about.brand");

	if (!categories.includes("Accessories")) {
		categories.push("Accessories");
	}

	let query: any = {};
	if (q) {
		query.name = { $regex: q, $options: "i" };
	}
	if (category && category !== "All Categories" && category !== "All") {
		if (category.toLowerCase() === 'accessories' || category.toLowerCase() === 'accessor') {
			query.category = { $in: [/Audio/i, /Camera/i, /Wearable/i, /Accessor/i] };
		} else if (category.toLowerCase().includes('laptop') || category.toLowerCase().includes('computer')) {
			query.category = { $regex: "laptop|computer", $options: "i" };
		} else if (category.toLowerCase().includes('phone') || category.toLowerCase().includes('tablet')) {
			query.category = { $regex: "phone|tablet", $options: "i" };
		} else {
			query.category = { $regex: category, $options: "i" };
		}
	}
	if (brand) {
		query["about.brand"] = { $regex: brand, $options: "i" };
	}
	if (minPrice || maxPrice) {
		query.price = {};
		if (minPrice) query.price.$gte = Number(minPrice);
		if (maxPrice) query.price.$lte = Number(maxPrice);
	}
	if (rating) {
		query.rating = { $gte: Number(rating) };
	}

	const productsData = await Product.find(query).lean();
	const dbProducts = JSON.parse(JSON.stringify(productsData));

	const productsToDisplay = dbProducts.length > 0 ? dbProducts : [];

	const buildQueryString = (updates: Record<string, string | null>) => {
		const newParams = new URLSearchParams();
		if (q) newParams.set('q', q);
		if (category) newParams.set('category', category);
		if (brand) newParams.set('brand', brand);
		if (minPrice) newParams.set('minPrice', minPrice);
		if (maxPrice) newParams.set('maxPrice', maxPrice);
		if (rating) newParams.set('rating', rating);
		
		Object.entries(updates).forEach(([key, value]) => {
			if (value === null) {
				newParams.delete(key);
			} else if (newParams.get(key) === value) {
				newParams.delete(key);
			} else {
				newParams.set(key, value);
			}
		});
		return `?${newParams.toString()}`;
	};

	return (
		<div id="top" className="bg-white text-amazon-text flex min-h-screen flex-col">
			<nav className="bg-amazon text-white">
				<div className="max-w-[1500px] mx-auto flex items-center p-2 gap-4">
					<Link href="/" className="flex items-center rounded-sm p-1 hover:outline hover:outline-1 hover:outline-white">
						<span className="text-2xl font-bold tracking-tighter">gadgets<span className="italic text-amazon-secondary">BD</span></span>
					</Link>

					<SearchForm />

					<div className="flex items-center gap-4">
						<div className="hidden md:flex items-center rounded-sm p-1 cursor-pointer hover:outline hover:outline-1 hover:outline-white"><div className="font-bold text-sm">EN</div></div>
						<UserNav />
						<CartBadge />
					</div>
				</div>
			</nav>

			<main className="flex-1 max-w-[1500px] mx-auto w-full p-4">
				<div className="flex justify-between items-center mb-4 shadow-sm border-b pb-2">
					<div className="text-sm">
						<span>{productsToDisplay.length} results for</span> 
						<span className="font-bold text-amazon-orange">
							&quot;{q || category || "All Products"}&quot;
						</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-sm">Sort by:</span>
						<select className="text-sm bg-gray-100 border border-gray-300 rounded px-2 py-1 shadow-sm focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary">
							<option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Avg. Customer Review</option><option>Newest Arrivals</option>
						</select>
					</div>
				</div>

				<div className="flex gap-6">
					<div className="w-64 hidden lg:block flex-shrink-0 border-r pr-4">
						{["Category", "Brand", "Customer Reviews", "Price"].map((section) => (
							<div key={section} className="mb-6 border-t pt-4 first:border-t-0 first:pt-0">
								<h3 className="font-bold text-base mb-3">{section}</h3>
								<div className="space-y-2 text-sm">
									{section === "Category" && categories.map((x: any) => {
										const isChecked = category?.toLowerCase() === String(x).toLowerCase();
										return (
										<Link key={x} href={`/products${buildQueryString({ category: x })}`} className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
											<input type="checkbox" readOnly checked={isChecked || false} className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary" /><span>{x}</span>
										</Link>
									)})}
									{section === "Brand" && brands.map((x: any) => {
										const isChecked = brand?.toLowerCase() === String(x).toLowerCase();
										return (
										<Link key={x} href={`/products${buildQueryString({ brand: x })}`} className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
											<input type="checkbox" readOnly checked={isChecked || false} className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary" /><span>{x}</span>
										</Link>
									)})}
									{section === "Customer Reviews" && [4, 3].map((n) => {
										const isChecked = Number(rating) === n;
										return (
										<Link key={n} href={`/products${buildQueryString({ rating: n.toString() })}`} className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
											<input type="checkbox" readOnly checked={isChecked} className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary" />
											<div className="flex items-center gap-1">
												<div className="flex text-amazon-secondary text-sm">
													{[1,2,3,4,5].map((s)=><Star key={s} className={s<=n?"w-4 h-4 fill-current":"w-4 h-4"} />)}
												</div>
												<span>&amp; Up</span>
											</div>
										</Link>
									)})}
									{section === "Price" && [
										{ label: "Under ৳10,000", min: null, max: "10000" },
										{ label: "৳10,000 - ৳25,000", min: "10000", max: "25000" },
										{ label: "৳25,000 - ৳50,000", min: "25000", max: "50000" },
										{ label: "৳50,000 - ৳1,00,000", min: "50000", max: "100000" },
										{ label: "Over ৳1,00,000", min: "100000", max: null }
									].map((x) => {
										const isChecked = minPrice === x.min && maxPrice === x.max;
										return (
										<Link key={x.label} href={`/products${buildQueryString({ minPrice: x.min, maxPrice: x.max })}`} className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
											<input type="checkbox" readOnly checked={isChecked} className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary" /><span>{x.label}</span>
										</Link>
									)})}
								</div>
							</div>
						))}

						<div className="mb-6 border-t pt-4 first:border-t-0 first:pt-0">
							<h3 className="font-bold text-base mb-3">Advanced Search</h3>
							<div className="space-y-2 text-sm">
								<div className="flex items-center gap-2">
									<input type="text" placeholder="Search within results..." className="flex-1 px-3 py-2 border rounded-md focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary" />
									<button className="bg-amazon-secondary hover:bg-[#fa8900] px-4 py-2 flex items-center justify-center rounded-md">
										<Search className="text-black w-5 h-5" />
									</button>
								</div>
								<div className="flex items-center gap-2">
									<select className="flex-1 text-sm bg-gray-100 border border-gray-300 rounded px-2 py-1 shadow-sm focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary">
										<option>All Categories</option>
										{categories.map((c: any) => (
											<option key={c} value={c}>{c}</option>
										))}
									</select>
									<button className="bg-amazon-secondary hover:bg-[#fa8900] px-4 py-2 flex items-center justify-center rounded-md">
										<Search className="text-black w-5 h-5" />
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="flex-1">
						<div className="space-y-4">
							{productsToDisplay.length === 0 && (
								<div className="p-8 text-center text-gray-500">No products found for the selected filters.</div>
							)}
							{productsToDisplay.map((product: any) => (
								<Link key={product._id} href={`/details/${product._id}`} className="flex gap-4 p-4 border rounded hover:shadow-md transition">
									<div className="w-48 h-48 flex-shrink-0 bg-gray-50 flex items-center justify-center">
										<img src={product.image} className="h-full object-cover mix-blend-multiply" alt={product.name} />
									</div>
									<div className="flex-1">
										<h3 className="text-lg text-amazon-blue hover:text-amazon-orange font-normal mb-1">{product.name}</h3>
										<div className="mb-2"><span className="text-2xl font-normal">৳ {product.price.toLocaleString()}</span></div>
										<div className="text-sm text-gray-600 mb-1">Vendor: {product.vendor}</div>
										<div className="text-sm text-gray-600 mb-2">Category: {product.category}</div>
										<p className="text-sm text-gray-600 mb-2">FREE delivery <strong>Tomorrow</strong></p>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</main>

			<footer className="bg-amazon-light text-white mt-8">
				<a href="#top" className="bg-[#37475A] py-4 text-center hover:bg-[#485769] transition cursor-pointer block"><span className="text-sm font-medium">Back to top</span></a>
				<div className="max-w-[1000px] mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
					<div><h3 className="font-bold mb-4">Get to Know Us</h3><ul className="space-y-2 text-gray-300"><li><a href="#" className="hover:underline">About Gadgets BD</a></li><li><a href="#" className="hover:underline">Careers</a></li><li><Link href="/shops" className="hover:underline">Our Top Brands</Link></li></ul></div>
					<div><h3 className="font-bold mb-4">Make Money with Us</h3><ul className="space-y-2 text-gray-300"><li><Link href="/register" className="hover:underline">Sell on Gadgets BD</Link></li><li><Link href="/create" className="hover:underline">Supply to Gadgets BD</Link></li><li><Link href="/manage-list" className="hover:underline">Become an Affiliate</Link></li></ul></div>
					<div><h3 className="font-bold mb-4">Payment Products</h3><ul className="space-y-2 text-gray-300"><li><a href="#" className="hover:underline">Gadgets BD Business Card</a></li><li><a href="#" className="hover:underline">Shop with Points</a></li><li><a href="#" className="hover:underline">Reload Your Balance</a></li></ul></div>
					<div><h3 className="font-bold mb-4">Let Us Help You</h3><ul className="space-y-2 text-gray-300"><li><a href="#" className="hover:underline">Your Account</a></li><li><Link href="/bookings" className="hover:underline">Your Orders</Link></li><li><a href="#" className="hover:underline">Shipping Rates &amp; Policies</a></li><li><a href="#" className="hover:underline">Returns &amp; Replacements</a></li><li><Link href="/forget-password" className="hover:underline">Manage Your Content and Devices</Link></li><li><a href="#" className="hover:underline">Help</a></li></ul></div>
				</div>
				<div className="border-t border-gray-600 text-center py-8"><div className="flex justify-center items-center gap-4 mb-4"><span className="text-2xl font-bold tracking-tighter">gadgets<span className="italic text-gray-400">BD</span></span></div><p className="text-xs text-gray-400">&copy; 2025 Gadgets BD - Premium Tech Marketplace. All rights reserved by LWS.</p></div>
			</footer>
		</div>
	);
}
