# Authenticator

> This functionality is disabled by default, to enable, please contact the offical *Mercado Pago* support via developer's website: www.mercadopago.com/developers

The Authenticator provides a secure FastPayment authentication system using native device capabilities to streamline payment flows with saved payment methods.

## Initializing the Authenticator

To initialize the authenticator you need to call the `.authenticator()` function from the SDK along with some parameters

`.authenticator(amount, payerEmail)`

| Parameter     | Type     | Description                                                        |
| ------------- | -------- | ------------------------------------------------------------------ |
| `amount`      | _string_ | Payment amount to authenticate                                     |
| `payerEmail`  | _string_ | Email address of the payer                                         |

## Authenticator

```javascript
const authenticator = await mp.authenticator("100.00", "user@example.com");
```

> Returns: `Promise<AUTHENTICATOR_INSTANCE>`.

### Parameters

| Option name  | Type      | Attributes                | Description                       |              |
| ------------ | --------- | ------------------------- | --------------------------------- | ------------ |
| `amount`     | _string_  |                           | Payment amount to authenticate    | **REQUIRED** |
| `payerEmail` | _string_  |                           | Email address of the payer        | **REQUIRED** |

## Show Authentication

Once the authenticator is initialized, you can display the authentication interface to get the fast payment token.

```javascript
const fastPaymentToken = await authenticator.show({
  hideUserConfirmation: false,
});
```

> Returns: `Promise<string | null>`. Fast payment token if successful.

### Parameters

| Option name            | Type      | Description                              |              |
| ---------------------- | --------- | ---------------------------------------- | ------------ |
| `settings`             | _object_  | Authentication settings                  | **OPTIONAL** |
| `hideUserConfirmation` | _boolean_ | Whether to skip user confirmation step   | **OPTIONAL** |

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

| Error Code                   | Description                                        |
| ---------------------------- | -------------------------------------------------- |
| `SiteIdNotSupported`         | The site ID is not supported for authentication   |
| `InvalidEmail`               | Invalid email address provided                     |
| `InvalidAmount`              | Invalid amount value provided                      |
| `PublicKeyNotSet`            | Public key not set before initialization          |
| `ApiRequestFailed`           | Error while fetching user flows                   |
| `AuthenticationNotSupported` | Authentication flow not supported for this user   |

#### Show Method Errors
These errors can occur when calling the `show()` method:

| Error Code                   | Description                                        |
| ---------------------------- | -------------------------------------------------- |
| `NotInitialized`             | Authenticator not properly initialized            |
| `AlreadyShowing`             | Authentication UI already displayed               |
| `NoBottomsheetConfirmation`  | User cancelled authentication                     |
| `BottomsheetLoadingFailed`   | Error loading confirmation interface              |
| `PRApiError`                 | Payment request API error                         |
| `UnreachableApplication`     | Cannot reach the required application             |
| `SecurityBlocked`            | Authentication blocked for security reasons       |

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
