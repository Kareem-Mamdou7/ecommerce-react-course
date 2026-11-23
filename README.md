# Morrow & Moss

Morrow & Moss is a fictional lifestyle and accessories shop built as a React course project. It brings together everyday bags, accessories, and home goods in a warm, considered storefront. The app is a frontend-only demo: product information lives in JavaScript, the cart is saved in the browser, and contact/newsletter submissions are simulated.

## Features

- Responsive home, shop, product, about, contact, cart, and not-found pages.
- Product search, category filters, and price sorting.
- Product detail pages with URL-based IDs, ratings, stock, and related products.
- Add-to-cart, quantity controls, remove/clear actions, subtotal, and shipping totals.
- Cart contents restored from `localStorage` after a refresh.
- Controlled contact form with required-field and email validation.
- A simulated newsletter signup and contact confirmation.
- Local product and team photography, so product images do not depend on a remote image service at run time.
- Focused React Testing Library tests for shopping, routing, cart persistence, and contact validation.

## Technologies

- React and JavaScript (JSX)
- Vite
- React Router DOM
- React Context API
- Lucide React icons
- Plain CSS with responsive media queries
- Vitest, jsdom, and React Testing Library for tests

## Project structure

```text
.
├── public/
│   ├── fonts/                 # Self-hosted WOFF2 fonts and their OFL licenses
│   └── images/                # Local product, hero, and team photos
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   └── SectionHeading.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── products.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Cart.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProductDetails.jsx
│   │   └── Shop.jsx
│   ├── utils/
│   │   └── formatPrice.js
│   ├── App.jsx
│   ├── App.test.jsx
│   ├── main.jsx
│   ├── styles.css
│   └── testSetup.js
├── index.html
├── package-lock.json
├── package.json
├── vercel.json
└── vite.config.js
```

The supplied `template_demo.png` is kept at the project root as a visual reference. Product and team image files are in `public/images/`.

## Installation and development

Install Node.js, then run:

```bash
npm install
npm run dev
```

Vite prints a local address (usually `http://localhost:5173`). Open it in a browser. To create and preview a production build:

```bash
npm run build
npm run preview
```

Run the interaction tests with:

```bash
npm test
```

## Routes

| URL | Page |
| --- | --- |
| `/` | Home |
| `/shop` | All products, search, filters, and sorting |
| `/product/:id` | Product details (for example, `/product/everyday-tote`) |
| `/about` | Brand story, values, team, and achievements |
| `/contact` | Contact form and store information |
| `/cart` | Shopping bag and order summary |
| Any other path | Custom 404 page |

## Design reference

**User-approved alternative to ThemeForest:** *Free Spice Shop Responsive Shopify Theme*  
**TemplateMonster listing:** [https://www.templatemonster.com/shopify-themes/free-spice-shop-responsive-shopify-theme-190218.html](https://www.templatemonster.com/shopify-themes/free-spice-shop-responsive-shopify-theme-190218.html)  
**Live demo:** [https://tm-shopify010-spice.myshopify.com/](https://tm-shopify010-spice.myshopify.com/)  
**Author/seller:** Not confirmed; the listing was not accessible from this environment.

The ThemeForest category and template listing returned HTTP 403, so no ThemeForest template is claimed here. The project owner explicitly supplied this TemplateMonster template, its live demo, and the screenshot below as a substitute. The reference has a narrow announcement strip, dark compact navigation, warm neutral backgrounds, muted green accents, an image-led hero, and straightforward product cards. Morrow & Moss adapts those cues with a calmer editorial type scale, larger spacing, and responsive layouts. The implementation uses original React components and CSS; it does not use the template's paid source code or assets.

![User-supplied Free Spice Shop template preview](template_demo.png)

Product photography was downloaded from Unsplash and stored locally under `public/images/`. DM Sans and Playfair Display are self-hosted from Google Fonts; their Open Font License texts are included in `public/fonts/`.

## React hooks in this project

- `useState` keeps interactive values such as the mobile menu, shop filters, product quantity, cart, and form fields.
- `useEffect` synchronizes URL query values with the shop filters and saves cart changes to `localStorage`.
- `useContext` reads shared cart data and actions in the navbar, product cards, product details, and cart page.
- `useParams` reads the product ID from `/product/:id`.
- `useNavigate` sends a submitted navbar search to the shop page.
- `useSearchParams` reads and updates the shop's search/category URL parameters.

For a file-by-file explanation, actual code examples, instructor questions, and practice exercises, read [`PROJECT_EXPLANATION.md`](PROJECT_EXPLANATION.md).

## How the cart and localStorage work

`CartProvider` in `src/context/CartContext.jsx` owns the cart array and exposes `addToCart`, `updateQuantity`, `removeFromCart`, and `clearCart`. `useEffect` writes only each product's ID and quantity to `localStorage`. On startup, the app reads that saved data, matches IDs against the current product list, and restores valid quantities. Invalid or corrupted data is ignored with a console warning instead of crashing the app. The cart page calculates the subtotal with `reduce`; shipping is complimentary at $99 or more and is $8 otherwise.

## Deploy to Vercel

1. Push the project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Keep the Vite defaults: build command `npm run build`, output directory `dist`.
4. Deploy. `vercel.json` rewrites page URLs to `index.html`, so refreshing a route such as `/product/everyday-tote` loads the React app.

The shop is frontend-only. No API keys or environment variables are needed. The brand contact details, reviews, team, and achievement numbers are fictional demo content; replace them before presenting the store as a real business.

## Screenshots

Add your own screenshots after running the project:

- Home: `screenshots/home.png`
- Shop and filters: `screenshots/shop.png`
- Product details: `screenshots/product-details.png`
- Cart: `screenshots/cart.png`
- Mobile layout: `screenshots/mobile-home.png`

The template preview above is the supplied design reference, not a screenshot of this application.
