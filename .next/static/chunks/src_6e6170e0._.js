(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "calculateDiscount": ()=>calculateDiscount,
    "cn": ()=>cn,
    "debounce": ()=>debounce,
    "filterProducts": ()=>filterProducts,
    "filterProductsByCategory": ()=>filterProductsByCategory,
    "formatPrice": ()=>formatPrice,
    "formatRating": ()=>formatRating,
    "getCategoryDisplayName": ()=>getCategoryDisplayName,
    "getPriceDisplay": ()=>getPriceDisplay,
    "getRelatedProducts": ()=>getRelatedProducts,
    "isProductOnSale": ()=>isProductOnSale,
    "isValidCategoryId": ()=>isValidCategoryId,
    "isValidProductId": ()=>isValidProductId,
    "searchProducts": ()=>searchProducts,
    "shuffleArray": ()=>shuffleArray,
    "slugify": ()=>slugify,
    "sortProducts": ()=>sortProducts,
    "truncateText": ()=>truncateText
});
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}
function formatRating(rating) {
    return rating.toFixed(1);
}
function filterProductsByCategory(products, categoryId) {
    if (categoryId === 'all') {
        return products;
    }
    return products.filter((product)=>product.categoryId === categoryId);
}
function searchProducts(products, searchTerm) {
    if (!searchTerm.trim()) {
        return products;
    }
    const term = searchTerm.toLowerCase().trim();
    return products.filter((product)=>product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term));
}
function filterProducts(products, filters) {
    let filtered = [
        ...products
    ];
    // Filter by category
    if (filters.category && filters.category !== 'all') {
        filtered = filterProductsByCategory(filtered, filters.category);
    }
    // Filter by search term
    if (filters.searchTerm) {
        filtered = searchProducts(filtered, filters.searchTerm);
    }
    // Filter by stock status
    if (filters.inStock !== undefined) {
        filtered = filtered.filter((product)=>product.inStock === filters.inStock);
    }
    // Filter by price range
    if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        filtered = filtered.filter((product)=>product.price >= min && product.price <= max);
    }
    return filtered;
}
function sortProducts(products, sortConfig) {
    return [
        ...products
    ].sort((a, b)=>{
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];
        if (sortConfig.field === 'rating') {
            const aRating = typeof aValue === 'object' && aValue !== null && 'average' in aValue ? aValue.average : 0;
            const bRating = typeof bValue === 'object' && bValue !== null && 'average' in bValue ? bValue.average : 0;
            return sortConfig.direction === 'asc' ? aRating - bRating : bRating - aRating;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
    });
}
function getRelatedProducts(products, currentProduct) {
    let limit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 4;
    const relatedProducts = products.filter((product)=>product.categoryId === currentProduct.categoryId && product.id !== currentProduct.id).slice(0, limit);
    // Shuffle for variety
    return shuffleArray(relatedProducts);
}
function shuffleArray(array) {
    const shuffled = [
        ...array
    ];
    for(let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i]
        ];
    }
    return shuffled;
}
function debounce(func, delay) {
    let timeoutId;
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(()=>func(...args), delay);
    };
}
function slugify(text) {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}
function isValidProductId(id) {
    return /^[a-zA-Z0-9]+$/.test(id);
}
function isValidCategoryId(id) {
    return [
        'smartphones',
        'laptops',
        'headphones',
        'all'
    ].includes(id);
}
function getCategoryDisplayName(categoryId) {
    const categoryNames = {
        'all': 'All Products',
        'smartphones': 'Smartphones',
        'laptops': 'Laptops',
        'headphones': 'Headphones'
    };
    return categoryNames[categoryId] || 'Unknown Category';
}
function calculateDiscount(originalPrice, salePrice) {
    return Math.round((originalPrice - salePrice) / originalPrice * 100);
}
function isProductOnSale(product) {
    return product.originalPrice !== undefined && product.originalPrice > product.price;
}
function getPriceDisplay(product) {
    const current = formatPrice(product.price);
    if (isProductOnSale(product)) {
        return {
            current,
            original: formatPrice(product.originalPrice),
            discount: calculateDiscount(product.originalPrice, product.price)
        };
    }
    return {
        current
    };
}
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}
function cn() {
    for(var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++){
        classes[_key] = arguments[_key];
    }
    return classes.filter(Boolean).join(' ');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/LazyProductGrid.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>LazyProductGrid
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function LazyProductGrid(param) {
    let { products, initialCount = 6, loadIncrement = 6, className = '' } = param;
    _s();
    const [visibleCount, setVisibleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCount);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newlyLoadedItems, setNewlyLoadedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const loadMoreProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LazyProductGrid.useCallback[loadMoreProducts]": ()=>{
            if (visibleCount >= products.length) return;
            setIsLoading(true);
            // Simulate loading delay
            setTimeout({
                "LazyProductGrid.useCallback[loadMoreProducts]": ()=>{
                    const currentCount = visibleCount;
                    const newCount = Math.min(currentCount + loadIncrement, products.length);
                    // Track newly loaded items for animation
                    const newItems = products.slice(currentCount, newCount).map({
                        "LazyProductGrid.useCallback[loadMoreProducts].newItems": (p)=>p.id
                    }["LazyProductGrid.useCallback[loadMoreProducts].newItems"]);
                    setNewlyLoadedItems(newItems);
                    setVisibleCount(newCount);
                    setIsLoading(false);
                    // Clear animation class after animation completes
                    setTimeout({
                        "LazyProductGrid.useCallback[loadMoreProducts]": ()=>setNewlyLoadedItems([])
                    }["LazyProductGrid.useCallback[loadMoreProducts]"], 500);
                }
            }["LazyProductGrid.useCallback[loadMoreProducts]"], 500);
        }
    }["LazyProductGrid.useCallback[loadMoreProducts]"], [
        visibleCount,
        products.length,
        loadIncrement
    ]);
    // Intersection Observer for lazy loading
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LazyProductGrid.useEffect": ()=>{
            const handleScroll = {
                "LazyProductGrid.useEffect.handleScroll": ()=>{
                    const scrollPosition = window.innerHeight + window.scrollY;
                    const documentHeight = document.documentElement.offsetHeight;
                    // Load more when user is near bottom (within 200px)
                    if (scrollPosition >= documentHeight - 200 && !isLoading && visibleCount < products.length) {
                        loadMoreProducts();
                    }
                }
            }["LazyProductGrid.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll);
            return ({
                "LazyProductGrid.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
            })["LazyProductGrid.useEffect"];
        }
    }["LazyProductGrid.useEffect"], [
        loadMoreProducts,
        isLoading,
        visibleCount,
        products.length
    ]);
    const visibleProducts = products.slice(0, visibleCount);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-grid",
                children: visibleProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: newlyLoadedItems.includes(product.id) ? 'product-fade-in' : '',
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductGridItem, {
                            product: product
                        }, void 0, false, {
                            fileName: "[project]/src/components/LazyProductGrid.tsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this)
                    }, product.id, false, {
                        fileName: "[project]/src/components/LazyProductGrid.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/LazyProductGrid.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "loading-spinner"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LazyProductGrid.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-body-medium secondary-text",
                            children: "Loading more products..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/LazyProductGrid.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LazyProductGrid.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/LazyProductGrid.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this),
            !isLoading && visibleCount < products.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: loadMoreProducts,
                    className: "primary-button px-8 py-3 rounded-lg",
                    children: [
                        "Load More Products (",
                        products.length - visibleCount,
                        " remaining)"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LazyProductGrid.tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/LazyProductGrid.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this),
            visibleCount >= products.length && products.length > initialCount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-body-medium secondary-text",
                    children: [
                        "You've reached the end! Showing all ",
                        products.length,
                        " products."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LazyProductGrid.tsx",
                    lineNumber: 104,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/LazyProductGrid.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LazyProductGrid.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(LazyProductGrid, "qBQ8oW9FEDZOOVtobRK4FJo+Lwo=");
_c = LazyProductGrid;
// Individual Product Item Component (matching the image style)
function ProductGridItem(param) {
    let { product } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "group relative product-grid-item",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/products/".concat(product.id),
            className: "block",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "product-image-container aspect-square relative mb-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: product.image,
                            alt: "".concat(product.name, " product image"),
                            fill: true,
                            className: "object-contain group-hover:scale-105 transition-transform duration-300 p-4",
                            sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LazyProductGrid.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: (e)=>{
                                e.preventDefault();
                            // Add wishlist functionality here
                            },
                            className: "absolute top-2 right-2 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white hover:bg-gray-50 border border-gray-200",
                            "aria-label": "Add to wishlist",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-3 h-3 text-gray-600",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LazyProductGrid.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/LazyProductGrid.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LazyProductGrid.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-x-0 bottom-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.preventDefault();
                                // Add to cart functionality
                                },
                                className: "w-full py-2 px-3 rounded text-xs font-medium transition-colors ".concat(product.inStock ? 'primary-button text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'),
                                disabled: !product.inStock,
                                children: product.inStock ? 'Add To Cart' : 'Out of Stock'
                            }, void 0, false, {
                                fileName: "[project]/src/components/LazyProductGrid.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LazyProductGrid.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        !product.inStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-2 left-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800",
                                children: "Out of Stock"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LazyProductGrid.tsx",
                                lineNumber: 163,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LazyProductGrid.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LazyProductGrid.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "product-info-compact space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-body-medium font-medium text-black line-clamp-2 group-hover:text-red-600 transition-colors",
                            children: product.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/LazyProductGrid.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "product-price text-body-medium",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(product.price)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LazyProductGrid.tsx",
                                    lineNumber: 178,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                ...Array(5)
                                            ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs ".concat(i < Math.floor(product.rating.average) ? 'star-rating-active' : 'star-rating-inactive'),
                                                    children: "★"
                                                }, i, false, {
                                                    fileName: "[project]/src/components/LazyProductGrid.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LazyProductGrid.tsx",
                                            lineNumber: 184,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs secondary-text",
                                            children: [
                                                "(",
                                                product.rating.count,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LazyProductGrid.tsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LazyProductGrid.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LazyProductGrid.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LazyProductGrid.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/LazyProductGrid.tsx",
            lineNumber: 117,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/LazyProductGrid.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_c1 = ProductGridItem;
var _c, _c1;
__turbopack_context__.k.register(_c, "LazyProductGrid");
__turbopack_context__.k.register(_c1, "ProductGridItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_6e6170e0._.js.map