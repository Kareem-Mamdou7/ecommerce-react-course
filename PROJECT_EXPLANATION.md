# Morrow & Moss — Student Walkthrough

This guide describes the code in this project, not a separate example app. You can keep the code open while reading and search for the filenames and functions mentioned below.

## Part 1 — Project overview

Morrow & Moss is a small online shop for bags, accessories, and home goods. It has a home page, a searchable and filterable shop, individual product pages, an about page, a contact form, a cart, and a not-found page. There is no server: product data is in a JavaScript file, the cart is stored in this browser, and form submissions show a local confirmation.

The browser starts at `index.html`. That file contains the empty `<div id="root"></div>` where React will put the application. In `src/main.jsx`, `ReactDOM.createRoot(...).render(...)` tells React to render the app inside that element. `BrowserRouter` enables URL-based pages, `CartProvider` makes cart data available throughout the app, and `App` displays the shared header, the current page, and the shared footer.

Each route selects one page component in `src/App.jsx`. Pages share data through imports (for example, both Shop and ProductDetails import `products.js`) and share cart state through `CartContext`. Components that need the cart read it with `useContext`, rather than having every page pass cart props through all its children.

## Part 2 — Folder and file explanation

### Files at the project root

| File | Responsibility and connections |
| --- | --- |
| `index.html` | The single HTML page Vite serves. It defines the page title, metadata, responsive viewport, and `root` element that `main.jsx` fills. |
| `package.json` | Lists React, React Router, Lucide icons, Vite, and test tools, plus the `dev`, `build`, `preview`, and `test` commands. |
| `package-lock.json` | Records the exact installed dependency versions so another install can reproduce this setup. |
| `vite.config.js` | Enables the React plugin and configures Vitest to run tests in jsdom with a browser-like URL. |
| `vercel.json` | Rewrites page requests to `index.html`, so refreshing a React Router URL can still load the app after deployment. |
| `.gitignore` | Keeps installed packages, build output, Vercel metadata, and local environment files out of Git. |
| `README.md` | Setup, features, routes, design reference, and deployment instructions. |
| `PROJECT_EXPLANATION.md` | This student-focused walkthrough. |
| `template_demo.png` | The project owner's supplied screenshot of the visual reference; it is not a screenshot of the finished app. |

### Application entry and routing

| File | Responsibility and connections |
| --- | --- |
| `src/main.jsx` | Starts React, imports the global CSS, and wraps `App` in `BrowserRouter` and `CartProvider`. |
| `src/App.jsx` | Declares all URL routes. It keeps `Navbar` and `Footer` visible while the route in the middle changes. |
| `src/styles.css` | Global design tokens, component styles, layouts, interaction states, and mobile/tablet media queries. |
| `src/utils/formatPrice.js` | Formats numeric prices as USD consistently in product cards, product details, and the cart. |

### Data and shared cart state

| File | Responsibility and connections |
| --- | --- |
| `src/data/products.js` | The local array of 15 product objects. The shop, home page, product details, and cart restoration use this source of product information. |
| `src/context/CartContext.jsx` | Creates the shared cart context, restores and saves the cart, and defines add, update, remove, and clear functions. |

### Reusable components

| File | Responsibility and connections |
| --- | --- |
| `src/components/Navbar.jsx` | Brand, search, route links, mobile menu, and the cart count. Uses `useNavigate` and reads the cart context. |
| `src/components/Footer.jsx` | Shared footer links and the social link. |
| `src/components/HeroSection.jsx` | Home page's image-led introduction and calls to action. |
| `src/components/ProductCard.jsx` | Displays one product and lets the visitor open its details or add it to the cart. Receives `product` as a prop. |
| `src/components/ProductGrid.jsx` | Uses `map()` to display product cards and provides the no-results message. Receives a `products` prop. |
| `src/components/SectionHeading.jsx` | Reusable eyebrow/title/description layout for page sections. Its optional `action` prop can show a link beside the title. |

### Page components and supporting files

| File | Responsibility and connections |
| --- | --- |
| `src/pages/Home.jsx` | Assembles the hero, featured products, categories, story, testimonials, and newsletter form. |
| `src/pages/Shop.jsx` | Reads URL parameters, controls the search/category/sort inputs, and filters and sorts product data. |
| `src/pages/ProductDetails.jsx` | Reads `:id` with `useParams`, finds the matching product, controls quantity, and shows related products. |
| `src/pages/About.jsx` | Brand story, mission, vision, values, example achievements, team, and shop call to action. |
| `src/pages/Contact.jsx` | Controlled form, required-field/email validation, error messages, and simulated success message. |
| `src/pages/Cart.jsx` | Cart items, quantity buttons, remove/clear actions, subtotal, shipping, and total. |
| `src/pages/NotFound.jsx` | Reusable not-found message. `App.jsx` uses it for unknown URLs; ProductDetails uses it for an unknown product ID. |
| `public/images/` | Local JPEG files for the hero, products, and team. Vite serves these as `/images/filename.jpg`. |
| `public/fonts/` | Self-hosted WOFF2 files used by CSS, plus the fonts' Open Font License files. |
| `src/App.test.jsx` | Interaction tests for search, filters, routes, contact validation, cart changes, and restoration. |
| `src/testSetup.js` | Loads convenient DOM matchers and clears localStorage before each test. |

## Part 3 — React components, reuse, and props

A component is a JavaScript function that returns JSX. JSX looks like HTML, but it lets a component describe the UI using JavaScript values. For example, `Navbar` returns the header and its controls; `Cart` returns the current cart page.

The app is split into components so each part has a clear job. `ProductCard` describes one product card. `ProductGrid` can reuse it for any list. This means the home page and shop page share the same card design without duplicating all of its markup.

Props are values a parent gives a child. In `src/components/ProductGrid.jsx`, the component receives its product list:

```jsx
function ProductGrid({ products: productList }) {
```

The name before the colon is the prop name (`products`); `productList` is the local name used in the function. The grid passes one product to each card:

```jsx
{productList.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
```

`ProductCard` receives it with `function ProductCard({ product })`. It uses that prop for the image, name, rating, and price. `key={product.id}` gives React a stable identifier when a list changes; it is not another prop used by `ProductCard`.

## Part 4 — React Router

React Router changes the visible page when the URL changes without reloading the whole HTML document. `src/main.jsx` puts the application inside `<BrowserRouter>`. Then `src/App.jsx` matches the current URL:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

The `:id` segment is a route parameter. A product link in `ProductCard` looks like `/product/${product.id}`. In `ProductDetails.jsx`, the actual code is:

```jsx
const { id } = useParams();
const product = products.find((item) => item.id === id);
```

For `/product/field-watch`, `id` is the string `"field-watch"`. `find()` returns that product object. If there is no match, the page returns `NotFound` with a product-specific message.

`Link` changes route without a full reload; it is used for ordinary navigation. `NavLink` is like `Link`, and also adds an active class when its route matches, which the navigation CSS uses. `useNavigate` is useful when code needs to navigate after an action: the navbar search calls `navigate("/shop?search=...")` after the search form is submitted.

The last route, `path="*"`, catches any URL not matched above and renders the 404 page. `vercel.json` gives the production host the same app entry point when a visitor refreshes an internal route.

## Part 5 — Hooks used in the project

Hooks are functions that let a function component use React features such as state, effects, and context. They are called at the top level of a component or custom provider, not inside a loop or condition.

### `useState`

`useState` keeps a value between renders. It returns the current value and a setter. Calling the setter asks React to render again with the new value.

In `Navbar.jsx`:

```jsx
const [menuOpen, setMenuOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
```

Line by line:

1. `menuOpen` starts as `false`, so the mobile menu starts closed.
2. `setMenuOpen` changes that value when the menu button is pressed.
3. `searchTerm` starts as an empty string.
4. `setSearchTerm` stores what the visitor types in the search input.

In `ProductDetails.jsx`, `useState(1)` makes the chosen quantity start at one. The plus button uses `setQuantity((current) => Math.min(product.stock, current + 1))`; this reads the latest value and prevents choosing more than the stock. The minus button uses `Math.max(1, current - 1)` so quantity cannot become zero.

`Contact.jsx` has three pieces of state: `form` holds the four input values, `errors` holds messages by field name, and `submitted` controls the success message. `handleChange` uses a state updater and object spread:

```jsx
setForm((currentForm) => ({ ...currentForm, [name]: value }));
```

The spread copies the other fields; `[name]: value` replaces only the field that changed.

### `useEffect`

`useEffect` runs work after React renders. Its second argument lists the values that should cause it to run again.

In `CartContext.jsx`:

```jsx
useEffect(() => {
  try {
    const savedCart = cart.map(({ id, quantity }) => ({ id, quantity }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCart));
  } catch (error) {
    console.error("The cart could not be saved to localStorage.", error);
  }
}, [cart]);
```

Line by line:

1. The effect runs after the provider renders.
2. It creates a smaller array containing each cart item's product `id` and `quantity`.
3. `JSON.stringify` turns that array into text because localStorage stores strings.
4. `setItem` saves the text under the cart key.
5. If the browser refuses the storage write, the error is reported to the console.
6. `[cart]` means the effect runs on the first render and again whenever `cart` changes.

There is a second effect in `Shop.jsx`. It reads `search` and `category` from the URL whenever `searchParams` changes, then puts those values into the input state. This is why a category link from the home page can open the shop with that category already selected.

### `useContext`

`useContext` reads a shared value without passing it through every component in between. `CartContext.jsx` creates the context and `CartProvider` wraps the app in `main.jsx`. For example, `ProductCard.jsx` does:

```jsx
const { addToCart } = useContext(CartContext);
```

That line gets the cart action from the nearest `CartProvider`. `Navbar` gets `cartCount`, `ProductDetails` gets `addToCart`, and `Cart` gets the items and quantity/remove/clear actions. The provider passes these values in its `value={{ ... }}` object.

### `useParams`

`useParams` reads the named variable in a route path. Since `App.jsx` declares `/product/:id`, `ProductDetails.jsx` can use `const { id } = useParams()` to get the actual ID from the current URL. The `find()` call then looks up the data for that exact ID.

### Other React Router hooks

- `useNavigate` in `Navbar.jsx` returns a `navigate` function. `handleSearch` prevents the form's normal page reload and sends the visitor to `/shop?search=...`.
- `useSearchParams` in `Shop.jsx` reads query parameters and supplies `setSearchParams` to update them when the category changes or filters are cleared. The query string makes these shop states linkable and refresh-safe.

## Part 6 — JavaScript array methods

### `map()`

`map()` runs a function once for each array item and returns a new array of results. `ProductGrid.jsx` uses it to turn products into React elements:

```jsx
productList.map((product) => (
  <ProductCard key={product.id} product={product} />
))
```

If there are 15 products, the result is an array of 15 card elements. `map()` does not remove any of them.

### `filter()`

`filter()` returns a new array containing only items whose condition is true. In `Shop.jsx`, each product must match both the typed name and selected category:

```jsx
const matchingProducts = products.filter((product) => {
  const matchesName = product.name.toLowerCase().includes(search);
  const matchesCategory =
    selectedCategory === "All" || product.category === selectedCategory;

  return matchesName && matchesCategory;
});
```

If the search is `"candle"`, the name match keeps products whose names include that text. If the category is `"Bags"`, the category match removes items from other categories.

### `find()`

`find()` returns the first matching item, or `undefined` if none matches. `ProductDetails.jsx` uses it to find a product by ID. `CartContext.jsx` uses it to see whether an added product is already in the cart.

### `reduce()`

`reduce()` visits the items and combines them into one result. In `Cart.jsx`, the subtotal is:

```jsx
const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
```

The final `0` is the starting total. For each item, its price times quantity is added. A similar `reduce()` in `CartContext.jsx` adds quantities to create the number displayed in the navbar.

### `sort()`

`sort()` rearranges an array. Shop copies the filtered results first:

```jsx
const visibleProducts = [...matchingProducts].sort((first, second) => {
  if (sortOrder === "low-to-high") return first.price - second.price;
  if (sortOrder === "high-to-low") return second.price - first.price;
  return Number(second.featured) - Number(first.featured);
});
```

The `[...]` copy matters because `sort()` changes the array it is called on. The comparison returns a negative number, zero, or a positive number to determine which product should appear first. The default puts featured products ahead of the others.

## Part 7 — Shopping cart, step by step

1. `ProductCard.jsx` calls `addToCart(product)` when its Add to bag button is clicked. `ProductDetails.jsx` calls `addToCart(product, quantity)` so the chosen quantity is used.
2. `CartProvider` owns the `cart` state. If the product is already there, `addToCart` maps over the current items and increases that item's quantity. Otherwise, it adds a new item. Both paths respect the product's stock.
3. The navbar count is calculated with `cart.reduce((total, item) => total + item.quantity, 0)`. It counts units, not just distinct product types.
4. In `Cart.jsx`, plus and minus buttons call `updateQuantity`. The provider keeps the value between one and the product's stock.
5. The Remove button calls `removeFromCart`, which filters that product out. Clear bag calls `clearCart`, which replaces the array with `[]`.
6. `Cart.jsx` calculates subtotal by adding `price * quantity` for every item. Shipping is `$0` when the cart is empty or subtotal is at least `$99`; otherwise it is `$8`. Total is subtotal plus shipping.
7. When cart state changes, the provider's `useEffect` saves only `{ id, quantity }` pairs to localStorage. The product list remains the single source of names, prices, and images.
8. On a later page load, `useState(readSavedCart)` calls `readSavedCart` to read and parse the stored text. The function checks that it is an array, finds each ID in the current product list, and accepts only positive integer quantities. It caps a saved quantity at the product's current stock. Bad JSON or storage errors are caught and warned about, so they do not crash the page.

## Part 8 — Contact form

The form in `Contact.jsx` is a controlled form: each input's `value` comes from React's `form` state, and its `onChange` calls `handleChange` to update that state. `name` attributes (`name`, `email`, `subject`, and `message`) identify which property to update.

When submitted, `handleSubmit` prevents the browser's page reload and calls `validateForm`. That function builds an `errors` object:

- Empty name, subject, and message fields get required-field messages.
- Empty email gets a required-field message.
- A non-empty email must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.

`noValidate` on the form allows the React handler to display these messages instead of letting browser-native validation stop the submit event first. Each message appears below its input; `aria-invalid` and `aria-describedby` connect the field to its error. If there are no errors, `submitted` becomes true, the fields reset, and a success message with `role="status"` appears. This is a frontend demonstration, so no email is actually sent.

## Part 9 — CSS and responsive design

All styles are in `src/styles.css`. At the top, CSS custom properties define the palette, type families, and maximum page width. Shared classes such as `.page-width`, `.button`, and `.eyebrow` keep common pieces consistent.

- **Flexbox** aligns navigation links, button contents, form controls, cart quantities, and many headings.
- **CSS Grid** creates the product cards, hero split, category tiles, testimonials, footer columns, and multi-column page layouts.
- Images use fixed aspect ratios or set container heights plus `object-fit: cover`, so different source dimensions do not distort the layout.
- The `@media (max-width: 1020px)` rules reduce columns and adapt the filters.
- At `max-width: 760px`, the navigation becomes a toggleable menu, the hero stacks vertically, and most grids reduce to one or two columns.
- At `max-width: 480px`, the layout tightens for small phones, the contact form becomes one column, and cart item rows use a narrower image.
- `prefers-reduced-motion` shortens transitions for visitors who request less motion.

The layout uses flexible widths, `minmax`, and wrapping so it can shrink without requiring a fixed desktop width.

## Part 10 — Questions an instructor may ask

1. **What is React?**  
   React is a JavaScript library for building user interfaces from components. This app's pages and reusable elements are React components.

2. **What is a component?**  
   A component is a reusable function that returns JSX. `ProductCard` is one example.

3. **Why divide the app into components?**  
   Separate pieces are easier to read, reuse, and update. The home page and shop share `ProductGrid` and `ProductCard`.

4. **What is JSX?**  
   JSX is syntax that lets JavaScript describe UI elements. Vite compiles the JSX in files such as `src/App.jsx`.

5. **What are props?**  
   Props are values passed from a parent component to a child. `ProductGrid` passes each product to `ProductCard` with `product={product}`.

6. **What is state?**  
   State is a value React remembers between renders. The shop's search input is kept in `searchTerm` state.

7. **What does `useState` do?**  
   It gives a component a state value and a setter. The cart and product quantity use it.

8. **What does `useEffect` do here?**  
   It synchronizes React state with something outside rendering. In the cart provider, it saves cart changes to localStorage.

9. **What is `useContext` used for?**  
   It reads a shared value without passing props through every intermediate component. It lets the navbar display the cart count.

10. **What is React Router?**  
    It maps browser URLs to React components. `src/App.jsx` maps `/shop` to `<Shop />`.

11. **What does `BrowserRouter` do?**  
    It connects React Router to the browser's address bar and history. It wraps `App` in `src/main.jsx`.

12. **What is the difference between `Link` and `NavLink`?**  
    Both navigate without a full page reload. `NavLink` also knows when its URL is active, which is useful for the main navigation.

13. **What does `useParams` return?**  
    It returns values from dynamic route segments. On `/product/field-watch`, `ProductDetails` receives `id === "field-watch"`.

14. **How does the product page find its product?**  
    `ProductDetails.jsx` calls `products.find((item) => item.id === id)`.

15. **How does an unknown product ID behave?**  
    `find()` returns no product, and `ProductDetails` renders the custom `NotFound` component with a helpful message.

16. **How does the 404 route work?**  
    The `path="*"` route in `App.jsx` matches URLs not matched by another route.

17. **What does `useSearchParams` do?**  
    It reads and changes query-string values such as `?category=Bags` in `Shop.jsx`.

18. **How does product search work?**  
    `Shop.jsx` lowercases the typed name and each product name, then uses `filter()` and `includes()` to keep matching products.

19. **What is the difference between `map()` and `filter()`?**  
    `map()` transforms every item into a corresponding result. `filter()` keeps only items that pass a condition.

20. **Why is the product list in `products.js`?**  
    It gives the shop, home page, product page, and cart restoration one simple source of product data.

21. **What does `find()` do?**  
    It returns the first matching item or `undefined`. ProductDetails uses it to look up a product ID.

22. **What does `reduce()` do in the cart?**  
    It combines cart items into one number, such as the subtotal or total unit count.

23. **Why does the shop copy the array before sorting?**  
    `sort()` mutates the array. `[...matchingProducts]` makes a copy so the original product data is not rearranged.

24. **How does the cart count work?**  
    `CartContext.jsx` adds all item quantities using `reduce()`, and `Navbar.jsx` displays the result.

25. **How are duplicate products handled when added?**  
    `addToCart` checks with `find()`. If the item exists, it updates its quantity; otherwise, it adds a new cart entry.

26. **How does the app keep the cart after a refresh?**  
    `useEffect` serializes IDs and quantities to localStorage. `readSavedCart` reads them when the provider initializes.

27. **Why save only product IDs and quantities?**  
    It avoids treating old saved names or prices as authoritative. The current product object is rebuilt from `products.js`.

28. **What happens if localStorage contains invalid data?**  
    `readSavedCart` validates the JSON and its entries. If parsing or storage access fails, it reports a warning and uses an empty cart.

29. **How is the subtotal calculated?**  
    `Cart.jsx` reduces the cart into the sum of each `price * quantity`.

30. **How does the contact form validate an email?**  
    `validateForm` checks whether it matches the regular expression in `Contact.jsx`, and displays an error if not.

31. **What is a controlled input?**  
    An input whose value comes from React state and whose `onChange` updates that state. The contact fields work this way.

32. **Why is `noValidate` on the contact form?**  
    It lets the app's own submit handler show consistent messages for missing and invalid fields.

33. **What is the purpose of `formatPrice.js`?**  
    It formats prices consistently as USD wherever the app displays a price.

34. **How does the site adapt to a phone?**  
    Media queries in `styles.css` stack layouts, reduce grid columns, and replace the wide navigation with a menu button.

35. **What is Vite doing?**  
    Vite runs the local development server and bundles the app into optimized static files for production.

36. **What do the tests verify?**  
    `src/App.test.jsx` exercises product search, category/sort behavior, product routes, form validation, cart quantity/persistence/removal, and the unknown-route page.

## Part 11 — Practical code-tracing exercises

Try to answer these by searching the files before reading the answer key.

1. Which file owns the product array?
2. Where does a product card get the product information it displays?
3. Which line of route configuration makes `/product/field-watch` a product page?
4. Where does `ProductDetails` read `"field-watch"` from the URL?
5. Which function filters products by name?
6. Where is the selected category written to the URL?
7. Which function adds an item when the card's Add to bag button is clicked?
8. Where does the cart badge count total units?
9. Which function changes the quantity shown on the cart page?
10. Where does the app save cart data after it changes?
11. What happens when the cart's Remove button is clicked?
12. Which function checks the contact email format?

### Exercise answer key

1. `src/data/products.js`, in the `products` array.
2. `ProductGrid.jsx` passes it as the `product` prop to `ProductCard.jsx`.
3. The `<Route path="/product/:id" element={<ProductDetails />} />` route in `src/App.jsx`.
4. In `src/pages/ProductDetails.jsx`, `const { id } = useParams()`.
5. The `products.filter(...)` block in `src/pages/Shop.jsx`.
6. The category `<select>` handler in `Shop.jsx` calls `setSearchParams`.
7. `ProductCard.jsx` calls `addToCart(product)`; the implementation is in `CartContext.jsx`.
8. `CartContext.jsx` uses `cart.reduce(...)` to calculate `cartCount`; `Navbar.jsx` renders it.
9. `Cart.jsx` calls `updateQuantity`, implemented in `CartContext.jsx`.
10. The cart `useEffect` in `src/context/CartContext.jsx`.
11. `Cart.jsx` calls `removeFromCart(item.id)`, and the provider filters that ID out of the cart.
12. `validateForm()` in `src/pages/Contact.jsx`.
