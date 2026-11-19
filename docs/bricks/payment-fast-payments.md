# Payment Brick - Fast Payments Flow Documentation

> ### ⚠️ Note: This feature is currently available only to selected partners.
>
> To integrate Fast Payments with Mercado Pago, contact your Mercado Pago account executive. Integrations for mobile applications are outside the scope of this flow.

With Fast Payments, eligible buyers pay with the methods already available in their Mercado Pago account (saved cards and account money, according to eligibility), without entering their payment data again.

Fast Payments is turned on in the regular Payment Brick. Mercado Pago renders the available methods, authenticates the buyer, and delivers the payment data through the `onSubmit` callback. Your backend processes the payment by creating an order with the [Orders API](https://www.mercadopago.com/developers/en/reference/orders/online-payments/create/post).

| Platform    | Supported browsers                                                      | How the buyer confirms the payment                                                                  |
| ----------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Desktop web | Chrome, Firefox, Safari, and Microsoft Edge                             | OTP                                                                                                 |
| Mobile web  | Android: Chrome, Firefox, and Microsoft Edge. iOS: Chrome and Safari    | Passkey or OTP and, on Android, also in the Mercado Pago or Mercado Libre app                       |

> Note: Mercado Pago evaluates the eligibility and the authentication mechanism available for each session. Do not implement browser, version, or authentication technology detection in your frontend.

> Note: Your frontend must not receive the full card number, CVV, or account credentials. Do not log `PaymentFormData`, tokens, emails, or payment payloads to the console or telemetry.

---

## `BricksBuilder`.create(`brick`, `target`, `settings`)

Fast Payments uses the same parameters as the [Guest Flow](./payment-guest.md#bricksbuildercreatebrick-target-settings). Only the Payment Brick (`'payment'`) supports it; other Bricks, such as the Wallet Brick, ignore `quickCheckout`.

---

## Usage Example

```js
const mp = new MercadoPago('YOUR_PUBLIC_KEY');
const bricks = mp.bricks();

await bricks.create('payment', 'paymentBrick_container', {
  initialization: {
    amount: 100,
    payer: { email: 'test@testuser.com' },
    quickCheckout: ['fastPayment'],
  },
  customization: {
    paymentMethods: {
      creditCard: 'all',
      debitCard: 'all',
      prepaidCard: 'all',
      bankTransfer: ['account_money'],
    },
  },
  callbacks: {
    onReady: () => {
      // handle form ready
    },
    onSubmit: async (paymentFormData) => {
      const response = await fetch('/process_payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentFormData),
      });

      if (!response.ok) throw new Error('PAYMENT_PROCESSING_FAILED');
      return response.json();
    },
    onError: (error) => {
      // handle error, see "Error handling"
    },
  },
});
```

> Note: `/process_payment` belongs to your integration. Protect it with your session and CSRF controls, validate the request body on the server, and never expose your Access Token in the browser.

---

## Settings

All the [Guest Flow settings](./payment-guest.md#settings) keep working. Fast Payments adds one initialization key and reuses the payment method type keys of `customization.paymentMethods`.

### Initialization

| Initialization key | Type       | Description                                                                                       |              |
| ------------------ | ---------- | ------------------------------------------------------------------------------------------------- | ------------ |
| `quickCheckout`    | `string[]` | Turns Fast Payments on. Must be a list containing `'fastPayment'`. See [Activation](#activation). | **REQUIRED** |

### Activation

- `quickCheckout` must be a list containing `'fastPayment'`, spelled exactly like that. Any other value, such as text, an empty list, an object, `null`, or a different spelling (`'FastPayment'`), keeps the Payment Brick in the guest flow and logs a warning to the console.
- For now, `'fastPayment'` is the only accepted value. Other items in the list are ignored, with a console warning.
- Without any payment method type key in `paymentMethods`, Fast Payments has no methods to display and the Payment Brick logs a warning to the console. See [Choosing the Fast Payments methods](#choosing-the-fast-payments-methods).

### Choosing the Fast Payments methods

With Fast Payments on, only the types you declare in `customization.paymentMethods` are displayed (allow-list).

| Customization key             | Accepted values                                                                                  | Effect on Fast Payments                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `paymentMethods.creditCard`   | `'all'` or card brand identifiers (string or list), such as `'visa'` or `['visa', 'master']`     | Displays saved credit cards. With identifiers, only those of the listed brands.                  |
| `paymentMethods.debitCard`    | `'all'` or card brand identifiers                                                                | Displays saved debit cards.                                                                      |
| `paymentMethods.prepaidCard`  | `'all'` or card brand identifiers                                                                | Displays saved prepaid cards.                                                                    |
| `paymentMethods.bankTransfer` | `'all'` or a list containing `'account_money'`                                                   | Displays account money. In Brazil, a list with only `['pix']` does not display account money.    |

- Identifiers are not case-sensitive.
- `'none'`, `''`, `[]`, and `null` mean that the type is not allowed.
- If you do not declare any of these keys, or none of them enables a Fast Payments method, no Fast Payments method is displayed and the Payment Brick logs a warning to the console. For an eligible buyer, if the Brick has no guest flow method to display either, `onError` receives the `critical` cause `wallet_payment_methods_unavailable`; otherwise the buyer sees only the guest flow methods.
- `excludedPaymentTypes` and `excludedPaymentMethods` do not apply to Fast Payments methods. Use the keys in the table above.

### Fast Payments-only or mixed checkout

The payment method type keys also configure the guest flow methods. For an eligible buyer:

| `paymentMethods`, with `quickCheckout` on | What the eligible buyer sees                                                                              |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `bankTransfer: ['account_money']`         | Only account money (Fast Payments-only checkout).                                                         |
| `creditCard: 'all'`                       | Saved credit cards from Fast Payments and the form for a new card (mixed checkout).                       |
| `bankTransfer: 'all'`                     | Account money from Fast Payments and the guest flow bank transfer methods, such as Pix in Brazil (mixed). |

`account_money` exists only in Fast Payments and is never sent to the guest flow. A buyer who is not eligible sees only the guest flow methods.

### Installments

`paymentMethods.minInstallments` and `paymentMethods.maxInstallments` also apply to Fast Payments cards:

- Only installments within the range are displayed. A card with no installment within the range is not displayed.
- With `minInstallments` greater than or equal to 2, debit and prepaid cards (single payment only) are not displayed.
- If `minInstallments` is greater than `maxInstallments`, the values are swapped and the Payment Brick logs a warning to the console.

### Saved cards from Customers & Cards

If you also send `initialization.payer.customerId` and `cardsIds`, a card the buyer has saved in both places is displayed only once, as Fast Payments. If your payment method declaration hides the Fast Payments card, the Customers & Cards card is still displayed. `defaultPaymentOption.savedCardForm` with the identifier of one of these cards opens the Fast Payments card.

### Limitations with Fast Payments on

These apply only to eligible buyers. For other buyers, the Payment Brick works as in the guest flow.

- `update({ amount })` returns `false` and changes nothing, not even `shipping` or `items` sent in the same call. To use another amount, reload the Payment Brick.
- `processingMode: 'gateway'` and `merchantAccountId` are ignored throughout the Payment Brick, which processes payments as `aggregator`.
- When at least one Fast Payments method is displayed, the payment option that redirects to Mercado Pago (`wallet_purchase`) is not displayed, with or without `initialization.marketplace`, and `defaultPaymentOption.walletForm` does not open any option.
- The Mercado Pago credits onboarding option (`onboarding_credits`) is still displayed. Fast Payments credit options are not available yet.

### Deprecated activations

> Note: `initialization.fastPaymentToken` is deprecated. The Payment Brick logs a console warning when it is present; turn Fast Payments on with `initialization.quickCheckout: ['fastPayment']` instead.
>
> Integrations that turn Fast Payments on with `customization.paymentMethods.fastPayment` or `wallet` keep working, with a console warning, but these keys are no longer documented. If `quickCheckout` is present, even empty or invalid, it decides alone and these keys are ignored.

---

## Callbacks

The callbacks are the same as in the [Guest Flow](./payment-guest.md#callbacks).

### `onSubmit`

`onSubmit` receives a [`PaymentFormData`](./payment-guest.md#paymentformdata) object. Send it to your backend as the request body, unchanged and without an outer key such as `{ formData: paymentFormData }`. Your backend reads the payment fields from `formData`.

When the selected method comes from Fast Payments (a card saved in the account or account money), `formData` includes `fast_payment: true`, available at `paymentFormData.formData.fast_payment`. For other methods, the key is not sent.

#### `FastPaymentFormData`

```ts
{
  token: string;
  transaction_amount: number;
  payment_method_id: string;
  installments?: number; // cards only
  payer: {
    email: string;
  };
  fast_payment: true;
}
```

When creating the order, send `payment_method_id` as `transactions.payments[].payment_method.id`, `token` unchanged as `payment_method.token`, and `installments` for cards only (omit it for account money). `payment_method.type` is the category of the selected method received in `PaymentFormData`, such as `credit_card`, `debit_card`, `prepaid_card`, or `account_money`. See [Create Order](https://www.mercadopago.com/developers/en/reference/orders/online-payments/create/post).

### Error handling

`onError` receives a `BrickError` (`type`, `cause`, `message`). The Fast Payments causes are:

| `cause`                              | `type`         | When it occurs                                                                                    |
| ------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------- |
| `wallet_not_available`               | `critical`     | The buyer is not eligible or the site is not supported.                                           |
| `wallet_authentication_failed`       | `critical`     | Buyer authentication failed or was canceled.                                                      |
| `wallet_payment_methods_failed`      | `critical`     | The buyer's saved methods could not be loaded.                                                    |
| `wallet_payment_methods_unavailable` | `critical`     | None of the buyer's saved methods matches the declared methods or the installment range.          |
| `wallet_authorize_payment_failed`    | `non_critical` | Payment authorization failed. `onSubmit` is not called and the buyer can try again.               |

`critical` causes reach `onError` only when the Payment Brick has no other method to display (Fast Payments-only checkout). In a mixed checkout, the Payment Brick displays only the guest flow methods and does not call `onError`. Each `critical` cause is reported only once; after it, unmount the Payment Brick and display your fallback checkout without automatic retries.

```js
const isFastPaymentUnavailableError = (error) =>
  error.type === 'critical' && error.cause.startsWith('wallet_');

const callbacks = {
  onError: (error) => {
    hideLoader();
    if (!isFastPaymentUnavailableError(error)) return;
    hideFastPayments();
    showCheckoutFallback();
  },
};
```

> Note: `hideLoader`, `hideFastPayments`, and `showCheckoutFallback` are illustrative functions that your integration must implement.

For the other error causes, see the [Guest Flow `ErrorCause`](./payment-guest.md#errorcause).

---

## Integration with Orders API

The Orders API is a backend API that requires your credentials. Your frontend sends `PaymentFormData` to your own server, which makes the authenticated `POST /v1/orders` call. For complete documentation, see [Create Order - Mercado Pago Developers](https://www.mercadopago.com/developers/en/reference/orders/online-payments/create/post).
