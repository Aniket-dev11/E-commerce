# E-Commerce Site

A fully responsive, feature-rich e-commerce frontend built with React (Vite), styled using React Bootstrap, and integrated with the Fake Store API.

### Live Link

🔗 https://e-commerce-three-beta-82.vercel.app/

---

## Project Overview

This project replicates a real-world online storefront, showcasing products, filtering, sorting, pagination, and a mini cart — all built within a single day using modern React tools.

### Tech Stack

- **React + Vite** (with JavaScript)
- **React Bootstrap**
- **Axios** for API calls
- **React Icons**
- **Grid** for layout
- **Fake Store API** (https://fakestoreapi.com/)

---

## Features

## Product Listing

- Retrieves all products from the Fake Store API.
- Displays items in a responsive grid format.
- Each product card includes: Image, Title, Price, Category, and an Add to Cart button.

## Category Filters

- Dynamically fetches available categories from the API.
- Filters the product list based on the selected category.

## Sorting

- Sort products by:
  - Price: Low → High / High → Low
  - Title: A–Z / Z–A
  - Min–Max price range

## Pagination

- Displays 6–8 products per page.
- Supports Next/Previous or page number navigation.
- Maintains sort/filter state across pages.

## Mini Cart

- Persistent cart state using `useContext`.
- Cart icon with quantity badge.
- Modal cart shows product list, quantity, price, and total.

## Responsive Design

- Fully mobile, tablet, and desktop compatible.
- Responsive Navbar with Cart Icon.

---

---

## Getting Started Locally

Follow these steps to run the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/Aniket-dev11/E-commerce.git
cd E-commerce
1- npm install
2- npm run dev





```
