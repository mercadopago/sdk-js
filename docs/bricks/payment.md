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

> This flow is disabled by default, to enable, please contact the offical *Mercado Pago* support via developer's website: www.mercadopago.com/developers

**For authenticated users leveraging saved payment methods**

The Fast Payments Flow provides a streamlined experience for users who are already logged into their Mercado Pago account, utilizing their saved payment methods and account information.

**Key Features:**

- Streamlined checkout with saved payment methods
- Automatic access to user's account money
- Reduced form fields and faster completion
- Enhanced security with authentication token
- Limited but focused customization options
- No dynamic updates (managed through account context)
- Data structure compatible with Orders API

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

// Fast Payments Flow - fastPaymentToken provided
mp.bricks().create('payment', 'container', {
  initialization: {
    fastPaymentToken: '<USER_FAST_PAYMENT_TOKEN>',
    // ... other fast payments flow settings
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
| **Authentication**  | Not required                 | Required (fastPaymentToken) | Not required                 |
| **Payment Methods** | Full configuration available | Uses saved payment methods  | Full configuration available |
| **Form Complexity** | Complete payment information | Streamlined with saved data | Enhanced with review steps   |
| **Customization**   | Extensive options            | Limited, focused options    | Extensive + review options   |
| **Amount Updates**  | ✅ Dynamic with `update()`   | ❌ Managed by account       | ✅ Dynamic with `update()`   |
| **User Experience** | Comprehensive form           | Quick, familiar checkout    | Detailed review & confirm    |
| **Data Format**     | Standard payment data        | Orders API compatible       | Standard payment data        |
| **Availability**    | Global                       | Global                      | Mexico & Argentina only      |
| **Review Steps**    | ❌ Not available             | ❌ Not available            | ✅ Available                 |

---

## Getting Started

1. **Choose your flow** based on your user authentication state and requirements:

   - **Guest Flow**: For standard unauthenticated checkouts
   - **Fast Payments Flow**: For authenticated users with saved payment methods
   - **Review Flow**: For enhanced checkout experience in Mexico and Argentina

2. **Follow the detailed documentation** for your selected flow:

   - [Guest Flow Documentation →](./payment-guest.md)
   - [Fast Payments Flow Documentation →](./payment-fast-payments.md)
   - [Review Flow Documentation →](./payment-review.md)

3. **Implement the brick** using the provided examples and configurations

All flows share the same core `BricksBuilder.create()` method but with different configuration options optimized for their respective use cases.
