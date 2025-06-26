# Payment Brick - Review Flow Documentation

### This feature is temporarily exclusive for **MLM (México)** 🇲🇽 and **MLA (Argentina)** 🇦🇷

The Payment Brick Review Flow extends the Guest Flow with additional review and confirmation steps, providing customers with a detailed overview of their purchase before completing the payment.

---

## `BricksBuilder`.create(`brick`, `target`, `settings`)

### This feature is temporarily exclusive for **MLM (México)** 🇲🇽 and **MLA (Argentina)** 🇦🇷

#### Full example with **review and confirmation** steps:

```js
mp.bricks().create("payment", "paymentBrick_container", {
  initialization: {
    amount: 80,
    preferenceId: "<PREFERENCE_ID>",
    items: {
      totalItemsAmount: 100,
      itemsList: [
        {
          units: 10,
          value: 10,
          name: "<NAME>",
          description: "<DESCRIPTION>",
          imageURL: "<IMAGE_URL>",
        },
      ],
    },
    shipping: {
      costs: 0,
      shippingMode: "<SHIPPING_MODE>",
      description: "<SHIPPING_DESCRIPTION>",
      receiverAddress: {
        streetName: "<STREET_NAME>",
        streetNumber: "<STREET_NUMBER>",
        neighborhood: "<PAYER_NEIGHBORHOOD>",
        city: "<PAYER_CITY>",
        federalUnit: "<PAYER_FED_UNIT>",
        zipCode: "<ZIP_CODE>",
        additionalInformation: "<ADDITIONAL_INFORMATION>",
      },
    },
    payer: {
      email: "<EMAIL>",
    },
    billing: {
      firstName: "<FIRST_NAME>",
      lastName: "<LAST_NAME>",
      taxRegime: "<TAX_REGIME>",
      taxIdentificationNumber: "<TAX_IDENTIFICATION_NUMBER>",
      identification: {
        type: "<IDENTIFICATION_TYPE>",
        number: "<IDENTIFICATION_NUMBER>",
      },
      billingAddress: {
        streetName: "<STREET_NAME>",
        streetNumber: "<STREET_NUMBER>",
        neighborhood: "<PAYER_NEIGHBORHOOD>",
        city: "<PAYER_CITY>",
        federalUnit: "<FED_UNIT>",
        zipCode: "<ZIP_CODE>",
      },
    },
    discounts: {
      totalDiscountsAmount: 20,
      discountsList: [
        {
          name: "<DISCOUNT_NAME>",
          value: 20,
        },
      ],
    },
  },
  customization: {
    paymentMethods: {
      creditCard: "all",
      debitCard: "all",
      prepaidCard: "all",
      ticket: "all",
      bankTransfer: "all",
      mercadoPago: "all",
      atm: "all",
    },
    enableReviewStep: true,
    reviewCardsOrder: ["payment_method", "shipping", "billing"],
  },
  callbacks: {
    onReady: () => {},
    onSubmit: ({ paymentMethod, formData }) => {
      return new Promise((resolve, reject) => {
        fetch("/process_payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((response) => resolve())
          .catch((error) => reject());
      });
    },
    onError: (error) => {},
    onClickEditShippingData: () => {},
    onClickEditBillingData: () => {},
    onRenderNextStep: (currentStep) => {},
    onRenderPreviousStep: (currentStep) => {},
  },
});
```

<br />

### Params

<br />

`brick` | _string_, **REQUIRED**

Selected Brick. Possible values are: `payment`.

<br />

`target` | _string_, **REQUIRED**

Id of the container that the brick will be rendered in. Can be any HTML element.

<br />

`settings` | _object_, **REQUIRED**

The `settings` object has properties to initialize and customize the brick being created.

| Setting key      | Type     | Description                                                  |              |
| ---------------- | -------- | ------------------------------------------------------------ | ------------ |
| `initialization` | `object` | Defines the initialization data. [See more](#initialization) | **REQUIRED** |
| `callbacks`      | `object` | Defines the callback functions. [See more](#callbacks)       | **REQUIRED** |
| `customization`  | `object` | Defines custom properties. [See more](#customization)        | **OPTIONAL** |
| `locale`         | `string` | Defines the locale.                                          | **OPTIONAL** |

<br />

#### Initialization

<br />

Initialization is an object with the properties the brick will initialize with.

| Initialization key | Type     | Description                                                                                                                                                                                                                   |              |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `amount`           | `number` | Defines the final transaction amount, including shipping fee and possible discounts                                                                                                                                           | **REQUIRED** |
| `preferenceId`     | `string` | If provided, the brick will bring to screen the Mercado Pago payment option. [The preference id should be created in Backend](https://www.mercadopago.com/developers/en/docs/checkout-pro/checkout-customization/preferences) | **OPTIONAL** |
| `payer`            | `object` | Defines payer initial data. [See more](#payer)                                                                                                                                                                                | **OPTIONAL** |
| `items`            | `object` | [Exclusive for review step] Defines the ordered items. [See more](#items)                                                                                                                                                     | **OPTIONAL** |
| `shipping`         | `object` | [Exclusive for review step] Defines shipping data. [See more](#shipping)                                                                                                                                                      | **OPTIONAL** |
| `billing`          | `object` | [Exclusive for review step] Defines billing data. [See more](#billing)                                                                                                                                                        | **OPTIONAL** |
| `discounts`        | `object` | [Exclusive for review step] Defines applied discounts data. [See more](#discounts)                                                                                                                                            | **OPTIONAL** |

<br />

##### Payer

Contains initial payer information.

| Payer key               | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |              |
| ----------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `email`                 | `string`   | Defines the payer email. Brick will hide email field if this value is correctly filled                                                                                                                                                                                                                                                                                                                                                                                                         | **REQUIRED** |
| `firstName`             | `string`   | Payer first name                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **OPTIONAL** |
| `lastName`              | `string`   | Payer last name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **OPTIONAL** |
| `identification`        | `object`   | Defines payer identification. Contains keys `type` and `number`                                                                                                                                                                                                                                                                                                                                                                                                                                | **OPTIONAL** |
| `identification.type`   | `string`   | Identification type. Possible values vary based on siteId                                                                                                                                                                                                                                                                                                                                                                                                                                      | **REQUIRED** |
| `identification.number` | `string`   | Identification number. If filled correctly the Brick will prefill the identification number input                                                                                                                                                                                                                                                                                                                                                                                              | **REQUIRED** |
| `address`               | `object`   | Defines payer address. Contains keys `zipCode`, `federalUnit`, `city`, `neighborhood`, `streetName`, `streetNumber` and `complement`                                                                                                                                                                                                                                                                                                                                                           | **OPTIONAL** |
| `address.zipCode`       | `string`   | Zip code of payer address. If filled correctly the Brick will prefill the zip code input                                                                                                                                                                                                                                                                                                                                                                                                       | **OPTIONAL** |
| `address.federalUnit`   | `string`   | State of payer address. If filled correctly the Brick will prefill the federal unit input                                                                                                                                                                                                                                                                                                                                                                                                      | **OPTIONAL** |
| `address.city`          | `string`   | City of payer address. If filled correctly the Brick will prefill the city input                                                                                                                                                                                                                                                                                                                                                                                                               | **OPTIONAL** |
| `address.neighborhood`  | `string`   | Neighborhood of payer address. If filled correctly the Brick will prefill the neighborhood input                                                                                                                                                                                                                                                                                                                                                                                               | **OPTIONAL** |
| `address.streetName`    | `string`   | Street name of payer address. If filled correctly the Brick will prefill the street name input                                                                                                                                                                                                                                                                                                                                                                                                 | **OPTIONAL** |
| `address.streetNumber`  | `number`   | Street number of payer address. If filled correctly the Brick will prefill the street number input                                                                                                                                                                                                                                                                                                                                                                                             | **OPTIONAL** |
| `address.complement`    | `string`   | Complement of payer address. If filled correctly the Brick will prefill the complement input                                                                                                                                                                                                                                                                                                                                                                                                   | **OPTIONAL** |
| `customerId`            | `string`   | Customer ID. View how to manage customers. [See More](https://www.mercadopago.com/developers/en/reference/customers/_customers/post)                                                                                                                                                                                                                                                                                                                                                           | **OPTIONAL** |
| `cardsIds`              | `string[]` | Saved Cards Ids. If defined in conjunction with Customer ID, the payer will be able to use their saved cards in checkout. The brick will sort from most recent save card to oldest. If you want the cards not to be sorted, you should add the property `preserveSavedCardsOrder` explained in [this section](#customization). For more information about cards ids in Mercado Pago [click here](https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/post). | **OPTIONAL** |

##### Items

Contains product information for **review steps**

| Items key                 | Type       | Description                            |              |
| ------------------------- | ---------- | -------------------------------------- | ------------ |
| `totalItemsAmount`        | `number`   | Sum of the values of all ordered items | **REQUIRED** |
| `itemsList`               | `object[]` | Array with the ordered items           | **REQUIRED** |
| `itemsList[].units`       | `number`   | Quantity of a given item               | **REQUIRED** |
| `itemsList[].value`       | `number`   | Value per a given item                 | **REQUIRED** |
| `itemsList[].name`        | `string`   | Item name                              | **REQUIRED** |
| `itemsList[].description` | `string`   | Item description                       | **OPTIONAL** |
| `itemsList[].imageURL`    | `string`   | Item icon URL¹                         | **OPTIONAL** |

¹ **NOTE**: The `imageURL` property, used to display the item icon, must end with one of the following extensions: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.webp`, `.svg`.

##### Shipping

Contains shipping information for **review steps**

| Items key                               | Type     | Description                                  |              |
| --------------------------------------- | -------- | -------------------------------------------- | ------------ |
| `costs`                                 | `number` | The shipping cost                            | **OPTIONAL** |
| `shippingMode`                          | `string` | The type of shipping. Example: Express       | **REQUIRED** |
| `description`                           | `string` | Shipping description                         | **OPTIONAL** |
| `receiverAddress`                       | `object` | Shipping address                             | **REQUIRED** |
| `receiverAddress.streetName`            | `string` | Address street name                          | **REQUIRED** |
| `receiverAddress.streetNumber`          | `string` | Address street number                        | **REQUIRED** |
| `receiverAddress.neighborhood`          | `string` | Address neighborhood                         | **OPTIONAL** |
| `receiverAddress.city`                  | `string` | Address city                                 | **OPTIONAL** |
| `receiverAddress.federalUnit`           | `string` | Address federal unit                         | **OPTIONAL** |
| `receiverAddress.complement`            | `string` | Address complement, such as apartment number | **OPTIONAL** |
| `receiverAddress.zipCode`               | `string` | Address zip code                             | **REQUIRED** |
| `receiverAddress.additionalInformation` | `string` | Note message regarding shipping address      | **OPTIONAL** |

##### Billing

Contains billing information for **review steps**

| Items key                     | Type     | Description                                                     |              |
| ----------------------------- | -------- | --------------------------------------------------------------- | ------------ |
| `firstName`                   | `string` | The first name under which the payment should be issued         | **OPTIONAL** |
| `lastName`                    | `string` | The last name under which the payment should be issued          | **OPTIONAL** |
| `taxRegime`                   | `string` | The tax regime. Example: `Simplified Trust Regime`              | **OPTIONAL** |
| `taxIdentificationNumber`     | `string` | The tax identification number                                   | **REQUIRED** |
| `billingAddress`              | `object` | The payer`s address under which the payment should be issued    | **OPTIONAL** |
| `billingAddress.streetName`   | `string` | Address street name                                             | **REQUIRED** |
| `billingAddress.streetNumber` | `string` | Address street number                                           | **REQUIRED** |
| `billingAddress.neighborhood` | `string` | Address neighborhood                                            | **OPTIONAL** |
| `billingAddress.city`         | `string` | Address city                                                    | **OPTIONAL** |
| `billingAddress.federalUnit`  | `string` | Address federal unit                                            | **OPTIONAL** |
| `billingAddress.zipCode`      | `string` | Address zip code                                                | **REQUIRED** |
| `identification`              | `object` | Defines payer identification. Contains keys `type` and `number` | **OPTIONAL** |
| `identification.type`         | `string` | Identification type. Possible values vary based on siteId       | **REQUIRED** |
| `identification.number`       | `string` | Identification number                                           | **REQUIRED** |

##### Discounts

Contains discounts information for **review steps**

> **NOTE:** The discount report is only a visual representation and it will not automatically be subtracted from the total amount.

| Items key               | Type       | Description                                |              |
| ----------------------- | ---------- | ------------------------------------------ | ------------ |
| `totalDiscountsAmount`  | `number`   | Sum of the values of all applied discounts | **REQUIRED** |
| `discountsList`         | `object[]` | Array with the applied discounts           | **REQUIRED** |
| `discountsList[].name`  | `string`   | Discount name. Example: `BLACKFRIDAY10`    | **REQUIRED** |
| `discountsList[].value` | `number`   | Discount value: Example: `10`              | **REQUIRED** |

</br>

##### Identification Type Values

| SiteId            | Identification Type Values      |
| ----------------- | ------------------------------- |
| `MLB (Brazil)`    | `CPF`, `CNPJ`                   |
| `MLA (Argentina)` | `DNI`, `CI`, `LC`, `LE`, `Otro` |
| `MCO (Colombia)`  | `CC`, `CE`, `NIT`, `Otro`       |
| `MLC (Chile)`     | `RUT`, `Otro`                   |
| `MLU (Uruguay)`   | `CI`, `Otro`                    |
| `MPE (Peru)`      | `DNI`, `C.E`, `RUC`, `Otro`     |

<br />

#### Callbacks

<br />

The callbacks object contains the callbacks functions the brick will call during its life cycle.

| Callback key              | Description                                                                                              |               | Params                              | Returns         |
| ------------------------- | -------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------- | --------------- |
| `onReady`                 | It is called when the brick finishes loading                                                             | **REQUIRED**  | `void`                              | `void`          |
| `onError`                 | It is called when there is an error in the Brick                                                         | **REQUIRED**  | `BrickError`                        | `void`          |
| `onSubmit`                | It is called when the user clicks on the submit button                                                   | **REQUIRED**  | `PaymentFormData`, `AdditionalData` | `Promise<void>` |
| `onBinChange`             | It is called when the user fills or update card's BIN (first 8 digits)                                   | **OPTIONAL**  | `bin`                               | `void`          |
| `onClickEditShippingData` | [Exclusive for review step] It is called when the user clicks to edit the shipping data card             | **OPTIONAL¹** | `void`                              | `void`          |
| `onClickEditBillingData`  | [Exclusive for review step] It is called when the user clicks to edit the billing data card              | **OPTIONAL²** | `void`                              | `void`          |
| `onRenderNextStep`        | [Exclusive for review step] It is called when the user moves through the next step on the payment flow   | **OPTIONAL**  | `currentStep`                       | `void`          |
| `onRenderPreviousStep`    | [Exclusive for review step] It is called when the user moves back to a previous step on the payment flow | **OPTIONAL**  | `currentStep`                       | `void`          |

¹ **Required** when any other key is provided for the `initialization.shipping` property. \
² **Required** when any other key is provided for the `initialization.billing` property.

<br />

`BrickError`

```ts
{
  type: "non_critical" | "critical";
  message: string;
  cause: ErrorCause;
}
```

<br />

`ErrorCause`

```ts
{
  'already_initialized',
  'amount_is_not_number',
  'amount_is_not_number_in_update',
  'card_token_creation_failed',
  'container_not_found',
  'fields_setup_failed',
  'fields_setup_failed_after_3_tries',
  'financial_institution_not_found',
  'get_address_data_failed',
  'get_card_bin_payment_methods_failed',
  'get_card_issuers_failed',
  'get_identification_types_failed',
  'get_mexico_payment_points_failed',
  'get_config_assets_failed',
  'get_payment_installments_failed',
  'empty_installments',
  'get_payment_methods_failed',
  'get_preference_details_failed',
  'get_saved_cards_failed',
  'incomplete_fields',
  'incorrect_initialization',
  'invalid_preference_purpose',
  'invalid_sdk_instance',
  'missing_amount_property',
  'missing_site_property',
  'missing_container_id',
  'missing_locale_property',
  'missing_payment_information',
  'missing_payment_type',
  'missing_required_callbacks',
  'missing_texts',
  'no_preference_provided',
  'no_chunk_path_provided',
  'secure_fields_card_token_creation_failed',
  'settings_empty',
  'translation_key_not_found',
  'unauthorized_payment_method',
  'update_preference_details_failed',
  'validations_parameter_null',
  'get_chunk_failed',
  'get_saved_cards_on_bricks_api_failed',
  'window_redirect_was_blocked',
  'missing_required_review_props',
  'no_payment_method_for_provided_bin',
  'payment_method_not_in_allowed_types',
  'payment_method_not_in_allowed_methods',
  'no_installments_in_selected_range',
  'no_issuers_found_for_card',
}
```

<br />

`PaymentFormData`

```ts
{
  selectedPaymentMethod: "credit_card" |
    "debit_card" |
    "ticket" |
    "bank_transfer" |
    "wallet_purchase" |
    "atm";
  formData: CardData | TicketData | BankTransferData | WalletPurchaseData;
}
```

<br />

> Note: The objects `CardData`, `TicketData` and `BankTransferData` could be directly sent to Mercado Pago `payment` API for processing.

<br />

`CardData`

<br />

`?` means the field is optional

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
    },
    'additional_info'?: {
        'shipments'?: {
            'receiver_address': {
                'zip_code'?: string,
                'state_name'?: string,
                'city_name'?: string,
                'street_name'?: string,
                'street_number'?: number,
                'apartment'?: string,
            },
        },
        'items'?: [
            {
              'unit_price': number,
              'quantity': number,
              'title': string,
              'description'?: string,
              'picture_url'?: string,
            },
        ],
    },
}
```

<br />

`TicketData`

<br />

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
    },
    'additional_info'?: {
        'shipments'?: {
            'receiver_address': {
                'zip_code'?: string,
                'state_name'?: string,
                'city_name'?: string,
                'street_name'?: string,
                'street_number'?: number,
                'apartment'?: string,
            },
        },
        'items'?: [
            {
              'unit_price': number,
              'quantity': number,
              'title': string,
              'description'?: string,
              'picture_url'?: string,
            }
        ],
    },
}
```

<br />

`BankTransferData`

<br />

```ts
{
    'payment_method_id': string,
    'transaction_amount': number,
    'payer': {
        'email': string
    }
}
```

`WalletPurchaseData`

<br />

```ts
null;
```

<br />

`AdditionalData`

<br />

```ts
{
    'bin': string,
    'lastFourDigits': string,
    'cardholderName': string,
}
```

<br />

#### Customization

<br />

Customizations object is used to load Brick under different conditions.

| Customization key                       | Type                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |              |
| --------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `visual`                                | `object`             | Control the visual aspects of the brick. Contains `style`, `font`, `texts`, `hidePaymentButton`, `hideFormTitle`, `preserveSavedCardsOrder` and `defaultPaymentOption`                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **OPTIONAL** |
| `visual.font`                           | `string`             | Defines the custom font URL. This only applies to the [PCI fields](../fields.md#fields-module).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **OPTIONAL** |
| `visual.texts`                          | `CustomTexts`        | Defines [custom texts](#custom-texts) for the Brick (available custom texts vary by Brick).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **OPTIONAL** |
| `visual.style`                          | `Style`              | Defines custom theme and CSS variables                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **OPTIONAL** |
| `visual.hidePaymentButton`              | `boolean`            | Hides the payment button and disables the `onSubmit` callback.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **OPTIONAL** |
| `visual.hideFormTitle`                  | `boolean`            | Hides the form title row.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **OPTIONAL** |
| `visual.preserveSavedCardsOrder`        | `boolean`            | When `true`, the brick will present the cards maintaining the order established in the property `initialization.payer.cardsIds`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **OPTIONAL** |
| `visual.defaultPaymentOption`           | `object`             | Object that define a single payment method as default, so the form will load with this option already selected. Only one option is allowed. (Can contain one of the following properties`creditCardForm`, `debitCardForm`, `prepaidCardForm`, `savedCardForm`, `ticketForm`, `bankTransferForm`, `walletForm`, or `creditForm`)                                                                                                                                                                                                                                                                                                  | **OPTIONAL** |
| `defaultPaymentOption.creditCardForm`   | `boolean`            | When `true`, the form loads with credit card form selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **OPTIONAL** |
| `defaultPaymentOption.prepaidCardForm`  | `boolean`            | When `true`, the form loads with credit card form selected, since the form used is the same.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **OPTIONAL** |
| `defaultPaymentOption.debitCardForm`    | `boolean`            | When `true`, the form loads with debit card form selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **OPTIONAL** |
| `defaultPaymentOption.savedCardForm`    | `string`             | One of the `cardsIds` informed in the property `initialization.payer.cardsIds`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **OPTIONAL** |
| `defaultPaymentOption.ticketForm`       | `boolean`            | When `true`, the form loads with ticket selected ([check availability](#ticket-availability))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **OPTIONAL** |
| `defaultPaymentOption.bankTransferForm` | `boolean`            | When `true`, the form loads bank transfer selected ([check availability](#bank-transfer-availability))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **OPTIONAL** |
| `defaultPaymentOption.walletForm`       | `boolean`            | When `true`, the form loads with Mercado Pago Wallet selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **OPTIONAL** |
| `defaultPaymentOption.creditForm`       | `boolean`            | When `true`, the form loads with Mercado Pago Credits selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **OPTIONAL** |
| `paymentMethods`                        | `object`             | Object that allow payment methods configuration. Contains `maxInstallments`, `minInstallments`, `creditCard`, `prepaidCard`, `debitCard`, `ticket`, `bankTransfer`, `atm`, `mercadoPago`.                                                                                                                                                                                                                                                                                                                                                                                                                                        | **OPTIONAL** |
| `paymentMethods.maxInstallments`        | `number`             | Maximum number of installments to be offered to the user                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **OPTIONAL** |
| `paymentMethods.minInstallments`        | `number`             | Minimal number of installments to be offered to the user                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **OPTIONAL** |
| `paymentMethods.creditCard`             | `string[] or string` | Allow payments with credit card. When the value `'all'` is provided, all credit cards are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get) for the paymentType `credit_card`.                                                                                                                                                                                                                                                                                                            | **OPTIONAL** |
| `paymentMethods.prepaidCard`            | `string[] or string` | Allow payments with prepaid card. When the value `'all'` is provided, all prepaid cards are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get) for the paymentType `prepaid_card`.                                                                                                                                                                                                                                                                                                         |
| `paymentMethods.debitCard`              | `string[] or string` | Allow payments with debit card. When the value `'all'` is provided, all debit cards are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get) for the paymentType `debit_card`.                                                                                                                                                                                                                                                                                                               | **OPTIONAL** |
| `paymentMethods.ticket`                 | `string[] or string` | Allow payments with tickets ([check availability](#ticket-availability)). When the value `'all'` is provided, all ticket methods are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get) for the payment type `ticket`.                                                                                                                                                                                                                                                                     | **OPTIONAL** |
| `paymentMethods.bankTransfer`           | `string[] or string` | Allow payments with Bank Transfer ([check availability](#bank-transfer-availability)). When the value `'all'` is provided, all bank transfer methods are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get) for the payment type `bank_transfer`.                                                                                                                                                                                                                                          | **OPTIONAL** |
| `paymentMethods.atm`                    | `string[] or string` | Allow payments with ATM methods ([check availability](#atm-availability)). When the value `'all'` is provided, all bank transfer methods are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get) for the payment type `atm`.                                                                                                                                                                                                                                                                | **OPTIONAL** |
| `paymentMethods.mercadoPago`            | `string[] or string` | Allow payments with Mercado Pago Wallet (available in all countries) and installments without card (only available in Argentina, Brazil and Mexico). When the value `'all'` is provided, payments with both are accepted. When `'wallet_purchase'` is provided, just payments with Mercado Pago Wallet are accepted and users must log in when redirected to their Mercado Pago account. When `'onboarding_credits'` is provided, just payments with installments without card are accepted. In that case, after logging in, will be presented to the user the pre-selected credit payment option in their Mercado Pago account. | **OPTIONAL** |
| `enableReviewStep`                      | `boolean`            | [Exclusive for review step] Enables the payment confirmation flow                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **OPTIONAL** |
| `reviewCardsOrder`                      | `string[]`           | [Exclusive for review step] Change the order that the cards are displayed on screen. The default is `["payment_method", "shipping", "billing"`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **OPTIONAL** |

<br />

#### Custom Texts

Accepted properties are:

| Property                                  | Type     |
| ----------------------------------------- | -------- |
| `formTitle`                               | `string` |
| `cardNumber`                              | `object` |
| `cardNumber.label`                        | `string` |
| `cardNumber.placeholder`                  | `string` |
| `expirationDate`                          | `object` |
| `expirationDate.label`                    | `string` |
| `expirationDate.placeholder`              | `string` |
| `securityCode`                            | `object` |
| `securityCode.label`                      | `string` |
| `securityCode.placeholder`                | `string` |
| `cardholderName`                          | `object` |
| `cardholderName.label`                    | `string` |
| `cardholderName.placeholder`              | `string` |
| `cardholderIdentification`                | `object` |
| `cardholderIdentification.placeholder`    | `string` |
| `installmentsSectionTitle`                | `string` |
| `selectInstallments`                      | `string` |
| `selectIssuerBank`                        | `string` |
| `emailSectionTitle`                       | `string` |
| `email`                                   | `object` |
| `email.label`                             | `string` |
| `email.placeholder`                       | `string` |
| `formSubmit`                              | `string` |
| `payerFirstName.placeholder`              | `string` |
| `payerFirstName.label`                    | `string` |
| `payerLastName.placeholder`               | `string` |
| `payerLastName.label`                     | `string` |
| `zipCode.placeholder`                     | `string` |
| `zipCode.label`                           | `string` |
| `addressState.placeholder`                | `string` |
| `addressState.label`                      | `string` |
| `addressCity.placeholder`                 | `string` |
| `addressCity.label`                       | `string` |
| `addressNeighborhood.placeholder`         | `string` |
| `addressNeighborhood.label`               | `string` |
| `addressStreet.placeholder`               | `string` |
| `addressStreet.label`                     | `string` |
| `addressNumber.label`                     | `string` |
| `addressComplement.label`                 | `string` |
| `entityType.label`                        | `string` |
| `entityType.placeholder`                  | `string` |
| `financialInstitution.label`              | `string` |
| `financialInstitution.placeholder`        | `string` |
| `reviewConfirm`                           | `object` |
| `reviewConfirm.componentTitle`            | `string` |
| `reviewConfirm.payerDetailsTitle`         | `string` |
| `reviewConfirm.shippingDetailsTitle`      | `string` |
| `reviewConfirm.billingDetailsTitle`       | `string` |
| `reviewConfirm.paymentMethodDetailsTitle` | `string` |
| `reviewConfirm.detailsTitle`              | `string` |
| `reviewConfirm.summaryItemsTitle`         | `string` |
| `reviewConfirm.summaryShippingTitle`      | `string` |
| `reviewConfirm.summaryDiscountTitle`      | `string` |
| `reviewConfirm.summaryYouPayTitle`        | `string` |
| `reviewConfirm.summaryTotalTitle`         | `string` |

<br />

#### Style

<br />

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

##### Custom Variables

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
| `secondaryColorListItem`     | `string` |

> Note: All sizing properties accept values in: `px`, `rem`, `em`, and `%`

<br />

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

### Returns: `Promise<BRICK CONTROLLER>`

<br />

## Brick Controller

The Brick Controller contains methods that allow the integrator to interact with the rendered Brick.

|                   |            |
| ----------------- | ---------- |
| unmount           | **METHOD** |
| getFormData       | **METHOD** |
| getAdditionalData | **METHOD** |
| update            | **METHOD** |
| nextStep          | **METHOD** |

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

When called, the `update` method updates the given data via patch, preserving the current instance of the brick.

> **You should use the same object structure as the initialization.**

#### Params

| Field       | Type     | Description                                                                                                                                                     | Validation                                                                                                                                                                                                              |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amount`    | `number` | Payment amount. Updating the amount does not affect payments via Mercado Pago Wallet and Installments without card, as their values are defined in the backend. | The new amount must be greater than or equal to the minimum amount allowed by the payment method selected by the user. If validation succeeds, the update method will return `true`. Otherwise, it will return `false`. |
| `items`     | `object` | `initialization.items` object                                                                                                                                   | If validation succeeds, the update method will return `true`. Otherwise, it will return `false`.                                                                                                                        |
| `shipping`  | `object` | `initialization.shipping` object                                                                                                                                | If validation succeeds, the update method will return `true`. Otherwise, it will return `false`.                                                                                                                        |
| `billing`   | `object` | `initialization.billing` object                                                                                                                                 | If validation succeeds, the update method will return `true`. Otherwise, it will return `false`.                                                                                                                        |
| `discounts` | `object` | `initialization.discounts` object                                                                                                                               | If validation succeeds, the update method will return `true`. Otherwise, it will return `false`.                                                                                                                        |

#### Returns

`boolean`

#### Examples

```js
paymentBrickController.update({ amount: 95.32 });
```

```js
paymentBrickController.update({
  discounts: {
    totalDiscountsAmount: 25,
    discountsList: [
      {
        name: "<DISCOUNT_NAME_UPDATED>",
        value: 25,
      },
    ],
  },
});
```

### `Brick Controller`.nextStep()

The `nextStep` method is used to advance on payment flow, which is the review and confirmation steps.

#### Params

void

#### Returns

`Promise<string>` indicating the current step.

#### Example

```js
paymentBrickController.nextStep();
```
