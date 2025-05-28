# Payment Brick Documentation

The Payment Brick supports two distinct flows based on user authentication status:

## Flow Selection

The brick automatically determines which flow to use based on the presence of the `supertoken` property in the initialization settings:

- **Guest Flow**: Used when `supertoken` is not present in initialization settings
- **Supertoken Flow**: Used when `supertoken` is present in initialization settings (for authenticated users)

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

The `settings` object has properties to initialize and customize the brick being created. The content varies by flow:

| Setting key      | Type     | Description                                                                                                                                                        |              |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `initialization` | `object` | Defines the initialization data. Content varies by flow - see [Guest Flow Settings](#guest-flow-settings) or [Supertoken Flow Settings](#supertoken-flow-settings) | **REQUIRED** |
| `callbacks`      | `object` | Defines the callback functions. Content varies by flow - see [Guest Flow Settings](#guest-flow-settings) or [Supertoken Flow Settings](#supertoken-flow-settings)  | **REQUIRED** |
| `customization`  | `object` | Defines custom properties. Content varies by flow - see [Guest Flow Settings](#guest-flow-settings) or [Supertoken Flow Settings](#supertoken-flow-settings)       | **OPTIONAL** |
| `locale`         | `string` | Defines locale.                                                                                                                                                    | **OPTIONAL** |

### Returns: `Promise<BRICK CONTROLLER>`

---

## Guest Flow

### Usage Example

```js
mp.bricks().create('payment', 'paymentBrick_container', {
  initialization: {
    amount: 10000,
    preferenceId: '<PREFERENCE_ID>',
  },
  customization: {
    paymentMethods: {
      creditCard: 'all',
      debitCard: 'all',
      prepaidCard: 'all',
      ticket: 'all',
      bankTransfer: 'all',
      mercadoPago: 'all',
      atm: 'all',
    },
  },
  callbacks: {
    onReady: () => {
      // handle form ready
    },
    onSubmit: ({ paymentMethod, formData }) => {
      return new Promise((resolve, reject) => {
        fetch('/process_payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
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
  },
});
```

### Guest Flow Settings

#### Initialization

Initialization is an object with the properties the brick will initialize with.

| Initialization key | Type     | Description                                                                                                                                                                                                                   |              |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `amount`           | `number` | Defines the transaction amount.                                                                                                                                                                                               | **REQUIRED** |
| `payer`            | `object` | Defines payer initial data. [Possible values](#payer)                                                                                                                                                                         | **OPTIONAL** |
| `preferenceId`     | `string` | If provided, the brick will bring to screen the Mercado Pago payment option. [The preference id should be created in Backend](https://www.mercadopago.com/developers/en/docs/checkout-pro/checkout-customization/preferences) | **OPTIONAL** |

##### Payer

Payer contains initial payer information.

| Payer key               | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email`                 | `string`   | Defines the payer email. Brick will hide email field if this value is correctly filled                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `firstName`             | `string`   | Payer first name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lastName`              | `string`   | Payer last name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `identification`        | `object`   | Defines payer identification. Contains keys `type` and `number`                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `identification.type`   | `string`   | Identification type. Possible values vary based on siteId                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `identification.number` | `string`   | Identification number. If filled correctly the Brick will prefill the identification number input                                                                                                                                                                                                                                                                                                                                                                                                         |
| `address`               | `object`   | Defines payer address. Contains keys `zipCode`, `federalUnit`,`city`,`neighborhood`,`streetName`,`streetNumber` and `complement`                                                                                                                                                                                                                                                                                                                                                                          |
| `address.zipCode`       | `string`   | Zip code of payer address. If filled correctly the Brick will prefill the zip code input                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `address.federalUnit`   | `string`   | State of payer address. If filled correctly the Brick will prefill the federal unit input                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `address.city`          | `string`   | City of payer address. If filled correctly the Brick will prefill the city input                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `address.neighborhood`  | `string`   | Neighborhood of payer address. If filled correctly the Brick will prefill the neighborhood input                                                                                                                                                                                                                                                                                                                                                                                                          |
| `address.streetName`    | `string`   | Street name of payer address. If filled correctly the Brick will prefill the street name input                                                                                                                                                                                                                                                                                                                                                                                                            |
| `address.streetNumber`  | `number`   | Street number of payer address. If filled correctly the Brick will prefill the street number input                                                                                                                                                                                                                                                                                                                                                                                                        |
| `address.complement`    | `string`   | Complement of payer address. If filled correctly the Brick will prefill the complement input                                                                                                                                                                                                                                                                                                                                                                                                              |
| `customerId`            | `string`   | Customer ID. View how to manage customers. [See More](https://www.mercadopago.com/developers/en/reference/customers/_customers/post)                                                                                                                                                                                                                                                                                                                                                                      |
| `cardsIds`              | `string[]` | Saved Cards Ids. If defined in conjunction with Customer ID, the payer will be able to use their saved cards in checkout. The brick will sort from most recent save card to oldest. If you want the cards not to be sorted, you should add the property `preserveSavedCardsOrder` explained in [this section](#guest-flow-customization). For more information about cards ids in Mercado Pago [click here](https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/post). |

| SiteId            | Identification Type Values      |
| ----------------- | ------------------------------- |
| `MLB (Brazil)`    | `CPF`, `CNPJ`                   |
| `MLA (Argentina)` | `DNI`, `CI`, `LC`, `LE`, `Otro` |
| `MCO (Colombia)`  | `CC`, `CE`, `NIT`, `Otro`       |
| `MLC (Chile)`     | `RUT`, `Otro`                   |
| `MLU (Uruguay)`   | `CI`, `Otro`                    |
| `MPE (Peru)`      | `DNI`, `C.E`, `RUC`, `Otro`     |

#### Guest Flow Callbacks

The callbacks object contains the callbacks functions the brick will call during its life cycle.

| Callback key  | Description                                                            |              | Params                              | Returns         |
| ------------- | ---------------------------------------------------------------------- | ------------ | ----------------------------------- | --------------- |
| `onReady`     | It is called when the brick finishes loading                           | **REQUIRED** | `void`                              | `void`          |
| `onError`     | It is called when there is an error in the Brick                       | **REQUIRED** | `BrickError`                        | `void`          |
| `onSubmit`    | It is called when the user clicks on the submit button                 | **OPTIONAL** | `PaymentFormData`, `AdditionalData` | `Promise<void>` |
| `onBinChange` | It is called when the user fills or update card's BIN (first 8 digits) | **OPTIONAL** | `bin`                               | `void`          |

#### Guest Flow Customization

Customizations object is used to load Brick under different conditions.

| Customization key                       | Type                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |              |
| --------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `visual`                                | `object`             | Control the visual aspects of the brick. Contains `style`, `font`, `texts`, `hidePaymentButton`, `hideFormTitle`, `preserveSavedCardsOrder` and `defaultPaymentOption`                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **OPTIONAL** |
| `visual.font`                           | `string`             | Defines the custom font URL. This only applies to the [PCI fields](../fields.md#fields-module).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **OPTIONAL** |
| `visual.texts`                          | `CustomTexts`        | Defines [custom texts](#custom-texts) for the Brick (available custom texts vary by Brick).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **OPTIONAL** |
| `visual.style`                          | `Style`              | Defines custom theme and CSS variables. [See Style section](#style)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **OPTIONAL** |
| `visual.hidePaymentButton`              | `boolean`            | Hides the payment button and disables the `onSubmit` callback.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **OPTIONAL** |
| `visual.hideFormTitle`                  | `boolean`            | Hides the form title row.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **OPTIONAL** |
| `visual.preserveSavedCardsOrder`        | `boolean`            | When `true`, the brick will present the cards maintaining the order established in the property `initialization.payer.cardsIds`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **OPTIONAL** |
| `visual.defaultPaymentOption`           | `object`             | Object that define a single payment method as default, so the form will load with this option already selected. Only one option is allowed. (Can contain one of the following properties `creditCardForm`, `debitCardForm`, `prepaidCardForm`, `savedCardForm`, `ticketForm`, `bankTransferForm`, `walletForm`, or `creditForm`)                                                                                                                                                                                                                                                                                                 | **OPTIONAL** |
| `defaultPaymentOption.creditCardForm`   | `boolean`            | When `true`, the form loads with credit card form selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **OPTIONAL** |
| `defaultPaymentOption.prepaidCardForm`  | `boolean`            | When `true`, the form loads with credit card form selected, since the form used is the same.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **OPTIONAL** |
| `defaultPaymentOption.debitCardForm`    | `boolean`            | When `true`, the form loads with debit card form selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **OPTIONAL** |
| `defaultPaymentOption.savedCardForm`    | `string`             | One of the `cardsIds` informed in the property `initialization.payer.cardsIds`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **OPTIONAL** |
| `defaultPaymentOption.ticketForm`       | `boolean`            | When `true`, the form loads with ticket selected ([check availability](#ticket-availability))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **OPTIONAL** |
| `defaultPaymentOption.bankTransferForm` | `boolean`            | When `true`, the form loads bank transfer selected ([check availability](#bank-transfer-availability))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **OPTIONAL** |
| `defaultPaymentOption.walletForm`       | `boolean`            | When `true`, the form loads with Mercado Pago Wallet selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **OPTIONAL** |
| `defaultPaymentOption.creditForm`       | `boolean`            | When `true`, the form loads with Mercado Pago Credits selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **OPTIONAL** |
| `paymentMethods`                        | `object`             | Object that allow payment methods configuration. Contains `maxInstallments`, `minInstallments`, `creditCard`, `prepaidCard`, `debitCard`, `ticket`, `bankTransfer`, `atm`, `mercadoPago`                                                                                                                                                                                                                                                                                                                                                                                                                                         | **OPTIONAL** |
| `paymentMethods.maxInstallments`        | `number`             | Maximum number of installments to be offered to the user                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **OPTIONAL** |
| `paymentMethods.minInstallments`        | `number`             | Minimal number of installments to be offered to the user                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **OPTIONAL** |
| `paymentMethods.creditCard`             | `string[] or string` | Allow payments with credit card. When the value `'all'` is provided, all credit cards are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get) for the paymentType `credit_card`.                                                                                                                                                                                                                                                                                                            | **OPTIONAL** |
| `paymentMethods.prepaidCard`            | `string[] or string` | Allow payments with prepaid card. When the value `'all'` is provided, all prepaid cards are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get) for the paymentType `prepaid_card`.                                                                                                                                                                                                                                                                                                         |
| `paymentMethods.debitCard`              | `string[] or string` | Allow payments with debit card. When the value `'all'` is provided, all debit cards are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get) for the paymentType `debit_card`.                                                                                                                                                                                                                                                                                                               | **OPTIONAL** |
| `paymentMethods.ticket`                 | `string[] or string` | Allow payments with tickets ([check availability](#ticket-availability)). When the value `'all'` is provided, all ticket methods are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get) for the payment type `ticket`.                                                                                                                                                                                                                                                                     | **OPTIONAL** |
| `paymentMethods.bankTransfer`           | `string[] or string` | Allow payments with Bank Transfer ([check availability](#bank-transfer-availability)). When the value `'all'` is provided, all bank transfer methods are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get) for the payment type `bank_transfer`.                                                                                                                                                                                                                                          | **OPTIONAL** |
| `paymentMethods.atm`                    | `string[] or string` | Allow payments with ATM methods ([check availability](#atm-availability)). When the value `'all'` is provided, all bank transfer methods are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get) for the payment type `atm`.                                                                                                                                                                                                                                                                | **OPTIONAL** |
| `paymentMethods.mercadoPago`            | `string[] or string` | Allow payments with Mercado Pago Wallet (available in all countries) and installments without card (only available in Argentina, Brazil and Mexico). When the value `'all'` is provided, payments with both are accepted. When `'wallet_purchase'` is provided, just payments with Mercado Pago Wallet are accepted and users must log in when redirected to their Mercado Pago account. When `'onboarding_credits'` is provided, just payments with installments without card are accepted. In that case, after logging in, will be presented to the user the pre-selected credit payment option in their Mercado Pago account. | **OPTIONAL** |

---

## Supertoken Flow

The Supertoken Flow is designed for authenticated users who have existing payment methods saved in their Mercado Pago account. This flow provides a streamlined payment experience by leveraging the user's authentication token.

### Usage Example

```js
mp.bricks().create('payment', 'paymentBrick_container', {
  initialization: {
    supertoken: '<USER_SUPERTOKEN>',
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
    onSubmit: ({ paymentMethod, formData }) => {
      return new Promise((resolve, reject) => {
        fetch('/process_payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
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

### Supertoken Flow Settings

#### Supertoken Initialization

For authenticated users, the initialization requires the supertoken and supports limited additional configuration.

| Initialization key | Type     | Description                                                                                                                          |              |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `supertoken`       | `string` | Authentication token for the logged-in user. This token provides access to the user's saved payment methods and account information. | **REQUIRED** |
| `fingerprint`      | `string` | Device fingerprint for fraud prevention and security validation.                                                                     | **OPTIONAL** |

#### Supertoken Callbacks

The Supertoken Flow requires all three core callbacks for proper payment processing.

| Callback key  | Description                                                            |              | Params                              | Returns         |
| ------------- | ---------------------------------------------------------------------- | ------------ | ----------------------------------- | --------------- |
| `onReady`     | It is called when the brick finishes loading                           | **REQUIRED** | `void`                              | `void`          |
| `onError`     | It is called when there is an error in the Brick                       | **REQUIRED** | `BrickError`                        | `void`          |
| `onSubmit`    | It is called when the user clicks on the submit button                 | **REQUIRED** | `PaymentFormData`, `AdditionalData` | `Promise<void>` |
| `onBinChange` | It is called when the user fills or update card's BIN (first 8 digits) | **OPTIONAL** | `bin`                               | `void`          |

> **Note**: In the Supertoken Flow, `onSubmit` is **REQUIRED** because authenticated users expect immediate payment processing capabilities.

#### Supertoken Customization

The Supertoken Flow supports limited customization options focused on visual appearance and installment configuration.

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

## Shared Components

### Data Types

#### `BrickError`

```ts
{
  type: 'non_critical' | 'critical';
  message: string;
  cause: ErrorCause;
}
```

#### `ErrorCause`

The following table lists all possible error causes that can occur in the Payment Brick:

#### Initialization Errors

| Error Cause                           | Description                                                            | Mode              |
| ------------------------------------- | ---------------------------------------------------------------------- | ----------------- |
| `missing_amount_property`             | The required amount property is missing from initialization            | Guest             |
| `missing_required_review_props`       | Required properties for the review step are missing                    | Guest             |
| `no_preference_provided`              | No preference ID was provided when required                            | Guest             |
| `amount_is_not_number`                | The provided amount value is not a valid number                        | Guest             |
| `invalid_supertoken`                  | The provided supertoken is invalid or expired                          | Supertoken        |
| `supertoken_is_undefined`             | The supertoken is undefined when it should have a value                | Supertoken        |
| `already_initialized`                 | The brick has already been initialized and cannot be initialized again | Guest, Supertoken |
| `payment_brick_initialization_failed` | Failed to initialize the payment brick                                 | Guest, Supertoken |
| `incorrect_initialization`            | The brick was initialized with incorrect or invalid parameters         | Guest, Supertoken |
| `container_not_found`                 | The specified container element was not found in the DOM               | Guest, Supertoken |
| `missing_container_id`                | The container ID parameter is missing or empty                         | Guest, Supertoken |
| `missing_locale_property`             | The required locale property is missing from configuration             | Guest, Supertoken |
| `missing_payment_information`         | Essential payment information could not be obtained                    | Guest, Supertoken |
| `missing_payment_type`                | The payment type is not specified or is invalid                        | Guest, Supertoken |
| `missing_required_callbacks`          | Required callback functions are missing from the configuration         | Guest, Supertoken |
| `missing_site_property`               | The required site property is missing from SDK configuration           | Guest, Supertoken |
| `missing_texts`                       | Required text translations are missing for the current locale          | Guest, Supertoken |
| `settings_empty`                      | The settings object is empty or null                                   | Guest, Supertoken |
| `invalid_preference_purpose`          | The preference has an invalid or unsupported purpose                   | Guest, Supertoken |
| `fields_setup_failed`                 | Failed to set up the secure form fields                                | Guest, Supertoken |
| `fields_setup_failed_after_3_tries`   | Failed to set up secure form fields after 3 retry attempts             | Guest, Supertoken |
| `invalid_sdk_instance`                | The SDK instance is invalid or not properly configured                 | Guest, Supertoken |
| `translation_key_not_found`           | A required translation key was not found for the current locale        | Guest, Supertoken |
| `validations_parameter_null`          | A validation parameter is null when it should have a value             | Guest, Supertoken |

#### Data Retrieval Errors

| Error Cause                           | Description                                                               | Mode              |
| ------------------------------------- | ------------------------------------------------------------------------- | ----------------- |
| `get_address_data_failed`             | Failed to retrieve address data (e.g., from ZIP code lookup)              | Guest             |
| `get_mexico_payment_points_failed`    | Failed to retrieve payment points available in Mexico                     | Guest             |
| `get_payment_installments_failed`     | Failed to retrieve available installment options                          | Guest             |
| `get_preference_details_failed`       | Failed to retrieve preference details from the provided preference ID     | Guest             |
| `get_remedy_updated_payment_failed`   | Failed to retrieve updated payment information for remedy                 | Guest             |
| `get_saved_cards_failed`              | Failed to retrieve saved cards                                            | Guest             |
| `get_card_bin_payment_methods_failed` | Failed to retrieve payment methods based on the card BIN (first 8 digits) | Guest             |
| `get_card_issuers_failed`             | Failed to retrieve the list of card issuers                               | Guest             |
| `no_issuers_found_for_card`           | No card issuers found for the provided card information                   | Guest             |
| `no_payment_method_for_provided_bin`  | No payment method found for the provided card BIN                         | Guest             |
| `malformed_card_bin_settings`         | The card BIN settings are malformed or invalid                            | Guest             |
| `empty_installments`                  | No installment options are available for the selected payment method      | Guest             |
| `financial_institution_not_found`     | The specified financial institution was not found or is not available     | Guest             |
| `get_account_payment_methods_failed`  | Failed to retrieve payment methods from the user's account                | Supertoken        |
| `account_payment_methods_empty`       | The user's account has no available payment methods                       | Supertoken        |
| `account_money_empty`                 | The user's account has insufficient funds                                 | Supertoken        |
| `get_chunk_failed`                    | Failed to load a required code chunk or resource                          | Guest, Supertoken |
| `get_config_assets_failed`            | Failed to load configuration assets required for the Brick                | Guest, Supertoken |
| `get_identification_types_failed`     | Failed to retrieve available identification types for the country         | Guest, Supertoken |
| `get_payment_data_failed`             | Failed to retrieve payment data                                           | Guest, Supertoken |
| `get_smart_option_value_prop_failed`  | Failed to retrieve smart option value proposition                         | Guest, Supertoken |
| `get_payment_methods_failed`          | Failed to retrieve the list of available payment methods                  | Guest, Supertoken |

#### User interaction Errors

| Error Cause                                  | Description                                                            | Mode              |
| -------------------------------------------- | ---------------------------------------------------------------------- | ----------------- |
| `update_preference_details_failed`           | Failed to update preference details                                    | Guest             |
| `card_method_filling_failed`                 | Failed to fill card payment method information                         | Guest             |
| `payment_method_not_in_allowed_methods`      | The selected payment method is not in the list of allowed methods      | Guest             |
| `payment_method_not_in_allowed_types`        | The selected payment method's type is not in the list of allowed types | Guest             |
| `unauthorized_payment_method`                | The selected payment method is not authorized for this merchant        | Guest             |
| `incomplete_fields`                          | Required form fields are incomplete or missing                         | Guest, Supertoken |
| `no_installments_in_selected_range`          | No installment options available in the specified range                | Guest, Supertoken |
| `submit_attempt_while_fetching_payment_info` | Attempted to submit while payment information is still being fetched   | Guest, Supertoken |

#### Payment Processing Errors

| Error Cause                                | Description                                                | Mode              |
| ------------------------------------------ | ---------------------------------------------------------- | ----------------- |
| `window_redirect_was_blocked`              | A required window redirect was blocked by the browser      | Guest             |
| `card_token_creation_failed`               | Failed to create a secure token for the card               | Guest, Supertoken |
| `secure_fields_card_token_creation_failed` | Failed to create a secure token using PCI-compliant fields | Guest, Supertoken |

#### Update Errors

| Error Cause                            | Description                                              | Mode  |
| -------------------------------------- | -------------------------------------------------------- | ----- |
| `amount_is_not_number_in_update`       | The amount provided in the update method is not valid    | Guest |
| `payment_review_invalid_update_object` | The update object provided for payment review is invalid | Guest |

#### `PaymentFormData`

```ts
{
  selectedPaymentMethod: 'credit_card' | 'debit_card' | 'ticket' | 'bank_transfer' | 'wallet_purchase' | 'atm';
  formData: CardData | TicketData | BankTransferData | WalletPurchaseData;
}
```

> Note: The objects `CardData`, `TicketData` and `BankTransferData` could be directly sent to Mercado Pago `payment` API for processing.

##### `CardData`

```ts
{
    'token': string,
    'issuer_id': string,
    'payment_method_id': string,
    'transaction_amount': number,
    'payment_method_option_id': string | null,
    'processing_mode': string | null,
    'installments': number,
    'payer': {
        'email': string,
        'identification': {
                'type': string,
                'number': string
        }
    }
}
```

##### `TicketData`

`?` means the field is optional

```ts
{
    'payment_method_id': string,
    'transaction_amount': number,
    'transaction_details'?: {
        'financial_institution': string,
    },
    'payer': {
        'email': string,
        'identification'?: {
            'type': string,
            'number': string
        },
        'first_name'?: string,
        'last_name'?: string,
        'address'?: {
            'city': string,
            'federal_unit': string,
            'neighborhood': string,
            'street_name': string,
            'street_number': string,
            'zip_code': string
        }
    },
    'metadata'?: {
        'payment_point'?: string,
        'payment_mode'?: string
    }
}
```

##### `BankTransferData`

```ts
{
    'payment_method_id': string,
    'transaction_amount': number,
    'payer': {
        'email': string
    }
}
```

##### `WalletPurchaseData`

```ts
null;
```

#### `AdditionalData`

```ts
{
    'bin': string,
    'lastFourDigits': string,
    'cardholderName': string,
    'paymentTypeId': string,
}
```

### Custom Texts

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
| `payerFirstName.placeholder`           | `string` |
| `payerFirstName.label`                 | `string` |
| `payerLastName.placeholder`            | `string` |
| `payerLastName.label`                  | `string` |
| `zipCode.placeholder`                  | `string` |
| `zipCode.label`                        | `string` |
| `addressState.placeholder`             | `string` |
| `addressState.label`                   | `string` |
| `addressCity.placeholder`              | `string` |
| `addressCity.label`                    | `string` |
| `addressNeighborhood.placeholder`      | `string` |
| `addressNeighborhood.label`            | `string` |
| `addressStreet.placeholder`            | `string` |
| `addressStreet.label`                  | `string` |
| `addressNumber.label`                  | `string` |
| `addressComplement.label`              | `string` |
| `entityType.label`                     | `string` |
| `entityType.placeholder`               | `string` |
| `financialInstitution.label`           | `string` |
| `financialInstitution.placeholder`     | `string` |

### Style

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

#### Custom Variables

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

### Payment Method Availability

#### Ticket availability

| Site              |
| ----------------- |
| `MLA (Argentina)` |
| `MLB (Brazil)`    |
| `MCO (Colombia)`  |
| `MLM (Mexico)`    |
| `MLU (Uruguay)`   |

#### Bank Transfer availability

| Site             |
| ---------------- |
| `MLB (Brazil)`   |
| `MCO (Colombia)` |

#### ATM availability

| Site           |
| -------------- |
| `MLM (Mexico)` |
| `MPE (Peru)`   |

---

## Flow Comparison

| Feature                   | Guest Flow                                    | Supertoken Flow                             |
| ------------------------- | --------------------------------------------- | ------------------------------------------- |
| **Authentication**        | Anonymous users                               | Authenticated users with supertoken         |
| **Payment Methods**       | Full configuration available                  | Uses user's saved payment methods           |
| **Required Callbacks**    | `onReady`, `onError`                          | `onReady`, `onError`, `onSubmit`            |
| **Customization Options** | Extensive (payment methods, payer data, etc.) | Limited (visual styling, installments only) |
| **User Experience**       | Full payment form with all details            | Streamlined form with saved payment methods |
| **Amount Configuration**  | Required in initialization                    | Handled through user's account context      |

---

## Brick Controller

The Brick Controller contains methods that allow the integrator to interact with the rendered Brick.

|                   |            |
| ----------------- | ---------- |
| unmount           | **METHOD** |
| getFormData       | **METHOD** |
| getAdditionalData | **METHOD** |
| update            | **METHOD** |

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

| Brick     | Return Data       |
| --------- | ----------------- |
| `payment` | `PaymentFormData` |

### `Brick Controller`.getAdditionalData()

The `getAdditionalData` method returns additional data that may be useful to you (only works if the submit button is disabled).

#### Params

None.

#### Returns

| Brick     | Return Data      |
| --------- | ---------------- |
| `payment` | `AdditionalData` |

### `Brick Controller`.update()

When called, the `update` method updates the given data, preserving the current instance of the brick.

#### Params

| Field    | Type     | Description                                                                                                                                                     | Validation                                                                                                                                                                                                              |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amount` | `number` | Payment amount. Updating the amount does not affect payments via Mercado Pago Wallet and Installments without card, as their values are defined in the backend. | The new amount must be greater than or equal to the minimum amount allowed by the payment method selected by the user. If validation succeeds, the update method will return `true`. Otherwise, it will return `false`. |

#### Returns

`boolean`

#### Example

```js
paymentBrickController.update({ amount: 95.32 });
```
