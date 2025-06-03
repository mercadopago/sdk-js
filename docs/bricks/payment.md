# Payment Brick Documentation

The Payment Brick is a comprehensive payment solution that adapts to different user authentication states, providing optimized experiences for both guest and authenticated users.

---

## Available Flows

The Payment Brick supports two distinct flows, each designed for specific user scenarios:

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

### 🔐 [Supertoken Flow](./payment-supertoken.md)

**For authenticated users leveraging saved payment methods**

The Supertoken Flow provides a streamlined experience for users who are already logged into their Mercado Pago account, utilizing their saved payment methods and account information.

**Key Features:**

- Streamlined checkout with saved payment methods
- Automatic access to user's account money
- Reduced form fields and faster completion
- Enhanced security with authentication token
- Limited but focused customization options
- No dynamic updates (managed through account context)

**Best for:** Returning customers, subscription payments, marketplace integrations with user accounts

---

## Flow Selection

The brick automatically determines which flow to use based on the presence of the `supertoken` property in the initialization settings:

```js
// Guest Flow - no supertoken provided
mp.bricks().create('payment', 'container', {
  initialization: {
    amount: 10000,
    // ... other guest flow settings
  },
  // ...
});

// Supertoken Flow - supertoken provided
mp.bricks().create('payment', 'container', {
  initialization: {
    supertoken: '<USER_SUPERTOKEN>',
    // ... other supertoken flow settings
  },
  // ...
});
```

---

## Quick Comparison

| Feature             | Guest Flow                   | Supertoken Flow             |
| ------------------- | ---------------------------- | --------------------------- |
| **Authentication**  | Not required                 | Required (supertoken)       |
| **Payment Methods** | Full configuration available | Uses saved payment methods  |
| **Form Complexity** | Complete payment information | Streamlined with saved data |
| **Customization**   | Extensive options            | Limited, focused options    |
| **Amount Updates**  | ✅ Dynamic with `update()`   | ❌ Managed by account       |
| **User Experience** | Comprehensive form           | Quick, familiar checkout    |

---

## Getting Started

1. **Choose your flow** based on your user authentication state
2. **Follow the detailed documentation** for your selected flow:
   - [Guest Flow Documentation →](./payment-guest.md)
   - [Supertoken Flow Documentation →](./payment-supertoken.md)
3. **Implement the brick** using the provided examples and configurations

Both flows share the same core `BricksBuilder.create()` method but with different configuration options optimized for their respective use cases.
