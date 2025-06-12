# Bugs Identified and Resolutions

## Bug 1: Typo in Data Import in app.component.ts
- **Description**: The import statement uses `desseretData` instead of `dessertData`.
- **Impact**: Causes a runtime error as `desseretData` is undefined.
- **Resolution**: Correct the typo to `import dessertData from '../../public/data.json'`.

## Bug 2: Incorrect Placement of Interfaces in app.component.ts
- **Description**: The `Dessert` and `DessertImages` interfaces are defined between the `@Component` decorator and the `AppComponent` class, which is unconventional.
- **Impact**: Reduces modularity, hinders reusability, and may confuse developers or tooling. Violates the requirement for a component-based architecture.
- **Resolution**: Move the interfaces to a separate file, `src/app/models/dessert.interface.ts`, and export them. Import them in `app.component.ts` and other components as needed.

## Bug 3: Erroneous Semicolon After @Component Decorator
- **Description**: The `@Component` decorator in `app.component.ts` is followed by a semicolon (`;`), which is incorrect syntax in TypeScript for decorators.
- **Impact**: Causes a compilation error, preventing the application from building.
- **Resolution**: Remove the semicolon after the `@Component` decorator to ensure proper syntax.

## Bug 4: Incorrect Quantity Check Logic in add-to-cart.component.html
- **Description**: The `decreaseProductItem` method checks `if (this.quantity < 1)` to set `isAddedToCart = false`, which is incorrect.
- **Impact**: Allows quantities to go below 0.
- **Resolution**: Change the condition to `if (this.quantity <= 1)` before decrementing, setting `isAddedToCart = false` to remove the item.

## Bug 5: Quantity Can Go Negative in add-to-cart.component.ts
- **Description**: The `decreaseProductItem` method decrements `quantity` without ensuring it stays at 1 or above.
- **Impact**: Violates the requirement to prevent quantities below 1.
- **Resolution**: Add a check in `decreaseProductItem` to prevent `quantity` from going below 1.
