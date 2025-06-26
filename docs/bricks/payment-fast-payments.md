# Payment Brick - Fast Payments Flow Documentation

The Payment Brick Fast Payments Flow is designed for authenticated users who have existing payment methods saved in their Mercado Pago account. This flow provides a streamlined payment experience by leveraging the user's authentication token.

---

## `BricksBuilder`.create(`brick`, `target`, `settings`)

### Parameters

`brick` | _string_, **REQUIRED**

Selected Brick. Possible values are: `payment`.

<br />

`target` | _string_, **REQUIRED**

Id of the container that the brick will be rendered in. Can be any HTML element.

<br />

`settings` | _object_, **REQUIRED**

The `settings` object has properties to initialize and customize the brick being created.

| Setting key      | Type     | Description                                             |              |
| ---------------- | -------- | ------------------------------------------------------- | ------------ |
| `initialization` | `object` | Defines the initialization data for authenticated users | **REQUIRED** |
| `callbacks`      | `object` | Defines the callback functions for fast payments flow   | **REQUIRED** |
| `customization`  | `object` | Defines custom properties and visual configurations     | **OPTIONAL** |
| `locale`         | `string` | Defines locale.                                         | **OPTIONAL** |

### Returns: `Promise<BRICK CONTROLLER>`

---

## Usage Example

```js
mp.bricks().create('payment', 'paymentBrick_container', {
  initialization: {
    fastPaymentToken: '<USER_FAST_PAYMENT_TOKEN>',
  },
  customization: {
    visual: {
      hidePaymentButton: false,
      style: {
        theme: 'default',
      },
    },
  },
  callbacks: {
    onReady: () => {
      // handle form ready
    },
    onSubmit: (formData) => {
      return new Promise((resolve, reject) => {
        fetch('/process_payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formData }),
        })
          .then((response) => response.json())
          .then((response) => {
            // get payment result
            resolve();
          })
          .catch((error) => {
            // get payment result error
            reject();
          });
      });
    },
    onError: (error) => {
      // handle error
    },
    onBinChange: (bin) => {
      // handle BIN change for card validation
    },
  },
});
```

---

## Settings

### Initialization

For authenticated users, the initialization requires the fastPaymentToken and supports limited additional configuration.

| Initialization key | Type     | Description                                                                                                                          |              |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `fastPaymentToken` | `string` | Authentication token for the logged-in user. This token provides access to the user's saved payment methods and account information. | **REQUIRED** |
| `fingerprint`      | `string` | Device fingerprint for fraud prevention and security validation.                                                                     | **OPTIONAL** |

### Callbacks

The Fast Payments Flow requires all three core callbacks for proper payment processing.

| Callback key  | Description                                                            |              | Params                                                     | Returns         |
| ------------- | ---------------------------------------------------------------------- | ------------ | ---------------------------------------------------------- | --------------- |
| `onReady`     | It is called when the brick finishes loading                           | **REQUIRED** | `void`                                                     | `void`          |
| `onError`     | It is called when there is an error in the Brick                       | **REQUIRED** | `BrickError`                                               | `void`          |
| `onSubmit`    | It is called when the user clicks on the submit button                 | **REQUIRED** | `FastPaymentFormData`, `FastPaymentAdditionalData \| null` | `Promise<void>` |
| `onBinChange` | It is called when the user fills or update card's BIN (first 8 digits) | **OPTIONAL** | `bin`                                                      | `void`          |


### Customization

The Fast Payments Flow supports limited customization options focused on visual appearance and installment configuration.

| Customization key                | Type      | Description                                                                                     |              |
| -------------------------------- | --------- | ----------------------------------------------------------------------------------------------- | ------------ |
| `visual`                         | `object`  | Control the visual aspects of the brick. Contains `style`, `font`, `hidePaymentButton`          | **OPTIONAL** |
| `visual.font`                    | `string`  | Defines the custom font URL. This only applies to the [PCI fields](../fields.md#fields-module). | **OPTIONAL** |
| `visual.style`                   | `Style`   | Defines custom theme and CSS variables. [See Style section](#style)                             | **OPTIONAL** |
| `visual.hidePaymentButton`       | `boolean` | Hides the payment button and disables the `onSubmit` callback.                                  | **OPTIONAL** |
| `paymentMethods`                 | `object`  | Object that allows installment configuration. Contains `maxInstallments`, `minInstallments`     | **OPTIONAL** |
| `paymentMethods.maxInstallments` | `number`  | Maximum number of installments to be offered to the user                                        | **OPTIONAL** |
| `paymentMethods.minInstallments` | `number`  | Minimal number of installments to be offered to the user                                        | **OPTIONAL** |

---

## Data Types

### `FastPaymentFormData`

```ts
Transaction[]
```

The `FastPaymentFormData` is an array of `Transaction` objects that follows the same structure used by the [Mercado Pago Orders API](https://www.mercadopago.com/developers/en/reference/orders/online-payments/create/post). This data structure is designed to be used directly in the `transactions.payments` field when creating orders through the Orders API.

#### `Transaction`

```ts
{
    'amount': string,
    'payment_method': {
        'id': string,
        'type': string,
        'token': string,
        'installments': number
    }
}
```

### `FastPaymentAdditionalData`

```ts
{
    'bin': string,
    'lastFourDigits': string,
} | null
```

### `BrickError`

```ts
{
  type: 'non_critical' | 'critical';
  message: string;
  cause: ErrorCause;
}
```

### `ErrorCause`

The following table lists all possible error causes that can occur in the Payment Brick:

#### Initialization Errors

| Error Cause                           | Description                                                            |
| ------------------------------------- | ---------------------------------------------------------------------- |
| `invalid_fast_payment_token`          | The provided fast payment token is invalid or expired                  |
| `fast_payment_token_is_undefined`     | The fast payment token is undefined when it should have a value        |
| `already_initialized`                 | The brick has already been initialized and cannot be initialized again |
| `payment_brick_initialization_failed` | Failed to initialize the payment brick                                 |
| `incorrect_initialization`            | The brick was initialized with incorrect or invalid parameters         |
| `container_not_found`                 | The specified container element was not found in the DOM               |
| `missing_container_id`                | The container ID parameter is missing or empty                         |
| `missing_locale_property`             | The required locale property is missing from configuration             |
| `missing_payment_information`         | Essential payment information could not be obtained                    |
| `missing_payment_type`                | The payment type is not specified or is invalid                        |
| `missing_required_callbacks`          | Required callback functions are missing from the configuration         |
| `missing_site_property`               | The required site property is missing from SDK configuration           |
| `missing_texts`                       | Required text translations are missing for the current locale          |
| `settings_empty`                      | The settings object is empty or null                                   |
| `fields_setup_failed`                 | Failed to set up the secure form fields                                |
| `fields_setup_failed_after_3_tries`   | Failed to set up secure form fields after 3 retry attempts             |
| `invalid_sdk_instance`                | The SDK instance is invalid or not properly configured                 |
| `translation_key_not_found`           | A required translation key was not found for the current locale        |
| `validations_parameter_null`          | A validation parameter is null when it should have a value             |

#### Data Retrieval Errors

| Error Cause                          | Description                                                       |
| ------------------------------------ | ----------------------------------------------------------------- |
| `get_account_payment_methods_failed` | Failed to retrieve payment methods from the user's account        |
| `account_payment_methods_empty`      | The user's account has no available payment methods               |
| `account_money_empty`                | The user's account has insufficient funds                         |
| `get_chunk_failed`                   | Failed to load a required code chunk or resource                  |
| `get_config_assets_failed`           | Failed to load configuration assets required for the Brick        |
| `get_identification_types_failed`    | Failed to retrieve available identification types for the country |
| `get_payment_data_failed`            | Failed to retrieve payment data                                   |
| `get_payment_methods_failed`         | Failed to retrieve the list of available payment methods          |

#### User interaction Errors

| Error Cause                                  | Description                                                          |
| -------------------------------------------- | -------------------------------------------------------------------- |
| `incomplete_fields`                          | Required form fields are incomplete or missing                       |
| `no_installments_in_selected_range`          | No installment options available in the specified range              |
| `submit_attempt_while_fetching_payment_info` | Attempted to submit while payment information is still being fetched |

#### Payment Processing Errors

| Error Cause                                | Description                                                |
| ------------------------------------------ | ---------------------------------------------------------- |
| `card_token_creation_failed`               | Failed to create a secure token for the card               |
| `secure_fields_card_token_creation_failed` | Failed to create a secure token using PCI-compliant fields |
| `decode_fast_payment_token_amount_failed`  | Failed to decode the amount from the fast payment token    |

---

## Custom Texts

Accepted properties are:

| Property                               | Type     |
| -------------------------------------- | -------- |
| `formTitle`                            | `string` |
| `cardNumber`                           | `object` |
| `cardNumber.label`                     | `string` |
| `cardNumber.placeholder`               | `string` |
| `expirationDate`                       | `object` |
| `expirationDate.label`                 | `string` |
| `expirationDate.placeholder`           | `string` |
| `securityCode`                         | `object` |
| `securityCode.label`                   | `string` |
| `securityCode.placeholder`             | `string` |
| `cardholderName`                       | `object` |
| `cardholderName.label`                 | `string` |
| `cardholderName.placeholder`           | `string` |
| `cardholderIdentification`             | `object` |
| `cardholderIdentification.placeholder` | `string` |
| `installmentsSectionTitle`             | `string` |
| `selectInstallments`                   | `string` |
| `selectIssuerBank`                     | `string` |
| `emailSectionTitle`                    | `string` |
| `email`                                | `object` |
| `email.label`                          | `string` |
| `email.placeholder`                    | `string` |
| `formSubmit`                           | `string` |

---

## Style

Style is an object with keys for theme and custom CSS variables.

| Style key         | Type     | Description                                                                      |              |
| ----------------- | -------- | -------------------------------------------------------------------------------- | ------------ |
| `theme`           | `string` | Defines theme for Brick. Possible values: `default`, `dark`, `flat`, `bootstrap` | **OPTIONAL** |
| `customVariables` | `object` | Defines custom variables to be applied. [Possible values](#custom-variables)     | **OPTIONAL** |

`style`

```js
{
    theme: 'dark',
    customVariables: {
        textPrimaryColor: 'blue'
    }
}
```

### Custom Variables

Accepted properties are:

| Property                     | Type     |
| ---------------------------- | -------- |
| `textPrimaryColor`           | `string` |
| `textSecondaryColor`         | `string` |
| `inputBackgroundColor`       | `string` |
| `formBackgroundColor`        | `string` |
| `baseColor`                  | `string` |
| `baseColorFirstVariant`      | `string` |
| `baseColorSecondVariant`     | `string` |
| `secondaryColor`             | `string` |
| `errorColor`                 | `string` |
| `successColor`               | `string` |
| `secondarySuccessColor`      | `string` |
| `outlinePrimaryColor`        | `string` |
| `outlineSecondaryColor`      | `string` |
| `buttonTextColor`            | `string` |
| `fontSizeExtraExtraSmall`    | `string` |
| `fontSizeExtraSmall`         | `string` |
| `fontSizeSmall`              | `string` |
| `fontSizeMedium`             | `string` |
| `fontSizeLarge`              | `string` |
| `fontSizeExtraLarge`         | `string` |
| `fontWeightNormal`           | `string` |
| `fontWeightSemiBold`         | `string` |
| `formInputsTextTransform`    | `string` |
| `inputVerticalPadding`       | `string` |
| `inputHorizontalPadding`     | `string` |
| `inputFocusedBoxShadow`      | `string` |
| `inputErrorFocusedBoxShadow` | `string` |
| `inputBorderWidth`           | `string` |
| `inputFocusedBorderWidth`    | `string` |
| `borderRadiusSmall`          | `string` |
| `borderRadiusMedium`         | `string` |
| `borderRadiusLarge`          | `string` |
| `borderRadiusFull`           | `string` |
| `formPadding`                | `string` |

> Note: All sizing properties accept values in: `px`, `rem`, `em`, and `%`

---

## Brick Controller

The Brick Controller contains methods that allow the integrator to interact with the rendered Brick.

|                   |            |
| ----------------- | ---------- |
| unmount           | **METHOD** |
| getFormData       | **METHOD** |
| getAdditionalData | **METHOD** |

### `Brick Controller`.unmount()

The `unmount` method removes the rendered Brick from the page.

#### Params

None.

#### Returns

`void`

### `Brick Controller`.getFormData()

The `getFormData` method returns the data the user filled in the form (only works if the submit button is disabled).

#### Params

None.

#### Returns

`FastPaymentFormData`

### `Brick Controller`.getAdditionalData()

The `getAdditionalData` method returns additional data that may be useful to you (only works if the submit button is disabled).

#### Params

None.

#### Returns

`FastPaymentAdditionalData`

## Integration with Orders API

The Fast Payments Flow is designed to work seamlessly with the Mercado Pago Orders API. The `formData` returned in the `onSubmit` callback can be used directly as the `transactions.payments` array when creating an order.

**Important**: The Orders API is a backend API that requires merchant credentials. Your frontend should send the payment data to your own server, which will then make the authenticated call to the Mercado Pago Orders API.

### Example Integration

```js
onSubmit: async (formData, additionalData) => {
  // Send payment data to your backend server
  try {
    const response = await fetch('/process_payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData, additionalData }),
    });

    const result = await response.json();
    // Handle payment processing result
  } catch (error) {
    // Handle error
  }
};
```

For complete Orders API documentation, see: [Create Order - Mercado Pago Developers](https://www.mercadopago.com/developers/en/reference/orders/online-payments/create/post)
