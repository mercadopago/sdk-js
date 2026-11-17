# Payment Brick Documentation

The Payment Brick is a comprehensive payment solution that adapts to different user authentication states, providing optimized experiences for both guest and authenticated users.

---

## Available Flows

The Payment Brick supports three distinct flows, each designed for specific user scenarios:

### 🔓 [Guest Flow](./payment-guest.md)

**For unauthenticated users who need to provide complete payment information**

The Guest Flow is designed for users who are not logged into a Mercado Pago account. This flow offers maximum flexibility and extensive customization options.

**Key Features:**

- Full payment method configuration (credit/debit cards, tickets, bank transfers, ATM, etc.)
- Complete payer information collection
- Extensive customization options for payment methods and UI
- Support for saved cards via Customer ID
- Dynamic amount updates with the `update()` method
- Payment method availability varies by country

**Best for:** E-commerce checkouts, one-time payments, new user registrations

---

### 🔐 [Fast Payments Flow](./payment-fast-payments.md)

> This feature is currently available only to selected partners. To integrate it, contact your Mercado Pago account executive.

**For eligible buyers paying with the methods already available in their Mercado Pago account**

Fast Payments is turned on in the regular Payment Brick with `initialization.quickCheckout: ['fastPayment']`. Mercado Pago renders the buyer's saved cards and account money, according to eligibility, and authenticates the buyer.

**Key Features:**

- Saved cards and account money, filtered by the types you declare in `customization.paymentMethods` (`creditCard`, `debitCard`, `prepaidCard`, `bankTransfer`)
- Fast Payments-only or mixed with the guest flow methods
- The buyer confirms the payment with OTP on desktop web, or with Passkey or OTP on mobile web and, on Android, also in the Mercado Pago or Mercado Libre app
- `formData` includes `fast_payment: true` when the selected method comes from Fast Payments
- No amount updates with `update()` for eligible buyers
- Payment processed by creating an order with the Orders API

**Best for:** Returning customers, subscription payments, marketplace integrations with user accounts

---

### 📋 [Review Flow](./payment-review.md) 🇲🇽 🇦🇷

**For enhanced checkout experience with review and confirmation steps**

_Temporarily exclusive for MLM (México) and MLA (Argentina)_

The Review Flow extends the Guest Flow with additional review and confirmation steps, providing customers with a detailed overview of their purchase before completing the payment.

**Key Features:**

- All Guest Flow capabilities
- Review and confirmation steps
- Detailed order summary with items, shipping, and billing
- Step-by-step navigation with `nextStep()` method
- Edit capabilities for shipping and billing data
- Enhanced customer confidence through order review
- Support for discounts display

**Best for:** High-value transactions, complex orders with multiple items, enhanced customer experience requirements

---

## Flow Selection

The brick automatically determines which flow to use based on the initialization properties:

```js
// Guest Flow - basic configuration
mp.bricks().create('payment', 'container', {
  initialization: {
    amount: 10000,
    // ... other guest flow settings
  },
  // ...
});

// Fast Payments Flow - quickCheckout provided
mp.bricks().create('payment', 'container', {
  initialization: {
    amount: 10000,
    quickCheckout: ['fastPayment'],
    // ... other initialization data
  },
  customization: {
    paymentMethods: {
      creditCard: 'all',
      bankTransfer: ['account_money'],
    },
  },
  // ...
});

// Review Flow - enableReviewStep and review data provided
mp.bricks().create('payment', 'container', {
  initialization: {
    amount: 10000,
    items: {
      /* items data */
    },
    shipping: {
      /* shipping data */
    },
    // ... other initialization data
  },
  customization: {
    enableReviewStep: true,
    // ... other customization options
  },
  // ...
});
```

---

## Quick Comparison

| Feature             | Guest Flow                   | Fast Payments Flow          | Review Flow 🇲🇽 🇦🇷            |
| ------------------- | ---------------------------- | --------------------------- | ---------------------------- |
| **Authentication**  | Not required                 | In the Brick (OTP, Passkey or app) | Not required          |
| **Payment Methods** | Full configuration available | Saved methods, filtered by declared types | Full configuration available |
| **Form Complexity** | Complete payment information | Streamlined with saved data | Enhanced with review steps   |
| **Customization**   | Extensive options            | Guest Flow options + `quickCheckout` | Extensive + review options   |
| **Amount Updates**  | ✅ Dynamic with `update()`   | ❌ Not for eligible buyers  | ✅ Dynamic with `update()`   |
| **User Experience** | Comprehensive form           | Quick, familiar checkout    | Detailed review & confirm    |
| **Data Format**     | Standard payment data        | `PaymentFormData` with `fast_payment: true` | Standard payment data        |
| **Availability**    | Global                       | Selected partners           | Mexico & Argentina only      |
| **Review Steps**    | ❌ Not available             | ❌ Not available            | ✅ Available                 |

---

## Getting Started

1. **Choose your flow** based on your user authentication state and requirements:

   - **Guest Flow**: For standard unauthenticated checkouts
   - **Fast Payments Flow**: For eligible buyers paying with the methods available in their Mercado Pago account
   - **Review Flow**: For enhanced checkout experience in Mexico and Argentina

2. **Follow the detailed documentation** for your selected flow:

   - [Guest Flow Documentation →](./payment-guest.md)
   - [Fast Payments Flow Documentation →](./payment-fast-payments.md)
   - [Review Flow Documentation →](./payment-review.md)

3. **Implement the brick** using the provided examples and configurations

All flows share the same core `BricksBuilder.create()` method but with different configuration options optimized for their respective use cases.
