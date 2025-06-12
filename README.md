# Product List with Cart

A responsive e-commerce Angular application for browsing dessert products, managing a shopping cart, and confirming orders. The app features dynamic product cards, an interactive cart, and an order confirmation modal with a polished, mobile-friendly UI. Built with Angular 18, TypeScript, and SCSS, it uses a custom design system with `RedHatText` fonts and a consistent color palette.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Dynamic Product Cards**: Displays desserts from `data.json` with images, categories, names, and prices.
- **Interactive Cart**: Add, remove, and update item quantities with real-time total calculations.
- **Order Confirmation Modal**: Shows cart items, images, and totals, with a "Start New Order" button to reset the cart.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/product-list-cart.git
   cd product-list-cart
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   ```bash
   ng serve
   ```
4. **Access the App**:
   Open `http://localhost:4200` in your browser.

5. **Build for Production**:
   ```bash
   ng build --prod
   ```
   Output is in the `dist/` folder, ready for deployment.

## Project Structure
```
product-list-cart/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── product-card/
│   │   │   │   ├── product-card.component.ts|html|scss
│   │   │   ├── cart/
│   │   │   │   ├── cart.component.ts|html|scss
│   │   │   ├── add-to-cart/
│   │   │   │   ├── add-to-cart.component.ts|html|scss
│   │   │   ├── order-confirmation/
│   │   │   │   ├── order-confirmation.component.ts|html|scss
│   │   ├── services/
│   │   │   ├── cart.service.ts
│   │   │   ├── dessert.service.ts
│   │   ├── models/
│   │   │   ├── dessert.interface.ts
│   │   ├── app.component.ts|html|scss
│   ├── assets/
│   │   ├── data.json
│   │   ├── images/
│   │   ├── fonts/
│   │   │   ├── static/
│   │   │   │   ├── RedHatText-Bold.ttf
│   │   │   │   ├── RedHatText-SemiBold.ttf
│   │   │   │   ├── RedHatText-Regular.ttf
│   ├── styles/
│   │   ├── _fonts.scss
│   │   ├── _mixins.scss
│   │   ├── _reset.scss
│   │   ├── _variables.scss
│   │   ├── styles.scss
├── Bugs.md
├── README.md
├── angular.json
├── package.json
```

- **Components**: Standalone components for modularity (`ProductCardComponent`, `CartComponent`, etc.).
- **Services**: `DessertService` for data fetching, `CartService` for cart state.
- **Assets**: `data.json` for product data, images, and fonts.
- **Styles**: SCSS files for global and component-specific styling.
- **Bugs.md**: Tracks bugs, fixes, and enhancements.

## Technologies
- **Angular**: 18.x
- **TypeScript**: 5.x
- **SCSS**: Custom design system with `RedHatText` fonts
- **Angular HTTPClient**: For fetching `data.json`
- **Dependencies**:
  - `@angular/core`, `@angular/common`, `@angular/common/http`
  - `rxjs`
- **Build Tools**: Angular CLI, Webpack (via `ng build`)

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request with a detailed description.

## License
MIT License. See [LICENSE](LICENSE) for details.
