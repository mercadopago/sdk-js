# Authenticator

> This functionality is disabled by default, to enable, please contact the offical _Mercado Pago_ support via developer's website: www.mercadopago.com/developers

The Authenticator provides a secure FastPayment authentication system using native device capabilities to streamline payment flows with saved payment methods.

> For a complete integration example, please refer to the [Fast Payments Example](https://github.com/mercadopago/fastpayments_example).

## Initializing the Authenticator

To initialize the authenticator you need to call the `.authenticator()` function from the SDK along with some parameters

`.authenticator(amount, payerEmail)`

| Parameter    | Type     | Description                    |
| ------------ | -------- | ------------------------------ |
| `amount`     | _string_ | Payment amount to authenticate |
| `payerEmail` | _string_ | Email address of the payer     |

## Authenticator

```javascript
const authenticator = await mp.authenticator("100.00", "user@example.com");
```

> Returns: `Promise<AUTHENTICATOR_INSTANCE>`.

### Parameters

| Option name  | Type     | Attributes | Description                    |              |
| ------------ | -------- | ---------- | ------------------------------ | ------------ |
| `amount`     | _string_ |            | Payment amount to authenticate | **REQUIRED** |
| `payerEmail` | _string_ |            | Email address of the payer     | **REQUIRED** |

## Show Authentication

Once the authenticator is initialized, you can display the authentication interface to get the fast payment token.

```javascript
const fastPaymentToken = await authenticator.show();
```

> Returns: `Promise<string | null>`. Fast payment token if successful.

### Parameters

| Option name            | Type     | Description                                                       |              |
| ---------------------- | -------- | ----------------------------------------------------------------- | ------------ |
| `settings`             | _object_ | Authentication settings                                           | **OPTIONAL** |
| `confirmationLocation` | _string_ | Where the confirmation will be displayed. Options: `web` or `app` | **OPTIONAL** |

### Additional methods

#### `authenticator.getApplication()`

Returns information about the application handling the authentication.

```javascript
const application = authenticator.getApplication();
// Returns: 'MP' for Mercado Pago or 'ML' for Mercado Libre
```

> Returns: `string | null`. Application identifier.

### Error Handling

#### Authenticator Initialization Errors

These errors can occur when creating the authenticator instance:

| Error Code                          | Description                                      |
| ----------------------------------- | ------------------------------------------------ |
| `NOT_SUPPORTED_SITE_ID`             | The site ID is not supported for authentication  |
| `INVALID_EMAIL_ADDRESS`             | Invalid email address provided                   |
| `INVALID_AMOUNT_VALUE`              | Invalid amount value provided                    |
| `PUBLIC_KEY_NOT_SET`                | Public key not set before initialization         |
| `API_REQUEST_FAILED`                | Error while fetching user flows                  |
| `PAYMENT_REQUEST_NOT_SUPPORTED`     | Payment request flow not supported for this user |
| `AUTHENTICATION_FLOW_NOT_SUPPORTED` | Authentication flow not supported for this user  |
| `NO_APPLICATIONS_DETECTED`          | No required applications detected on the device  |
| `APPLICATION_CHECK_ERROR`           | Error checking installed applications            |

#### Show Method Errors

These errors can occur when calling the `show()` method:

| Error Code                   | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `NOT_INITIALIZED`            | Authenticator not properly initialized      |
| `ALREADY_SHOWING`            | Authentication UI already displayed         |
| `NO_USER_CONFIRMATION`       | User cancelled authentication               |
| `BOTTOMSHEET_LOADING_FAILED` | Error loading confirmation interface        |
| `BOTTOMSHEET_CLOSE_FAILED`   | Error closing confirmation interface        |
| `PAYMENT_REQUEST_ERROR`      | Payment request API error                   |
| `UNREACHABLE_APPLICATION`    | Cannot reach the required application       |
| `SECURITY_BLOCKED`           | Authentication blocked for security reasons |

### Integration examples

<details>
  <summary>HTML/JS</summary>

```javascript
<script src="https://sdk.mercadopago.com/js/v2"></script>
<script>
const mp = new MercadoPago('YOUR_PUBLIC_KEY');

const initializeAuthentication = async () => {
  try {
    // Initialize authenticator
    const authenticator = await mp.authenticator('100.00', 'user@example.com');

    // Show authentication
    const fastPaymentToken = await authenticator.show();

    if (fastPaymentToken) {
      console.log('Authentication successful:', fastPaymentToken);
      // Use fastPaymentToken for payment processing
    }
  } catch (error) {
    console.error('Authentication error:', error);
  }
};

initializeAuthentication();
</script>
```

</details>
