## `BricksBuilder`.create(`brick`, `target`, `settings`)

Example:
```js
mp.bricks().create('payment', 'paymentBrick_container' , {
    initialization: {
        amount: 100
    },
    customization: {
        paymentMethods: {
            creditCard: 'all',
            debitCard: 'all',
        },
    },
    callbacks: {
        onReady: () => {
            // handle form ready
        },
        onSubmit: ({paymentMethod, formData}) => {
            if(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
                return new Promise((resolve, reject) => {
                    fetch("/process_payment", { 
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData)
                    })
                    .then((response) => {
                        // get payment result
                        resolve();
                    })
                    .catch((error) => {
                        // get payment result error
                        reject();
                    })
                });
            }
        }, 
        onError: (error) => {
            // handle error
        }
    }
});
```

<br />

### Params:

<br />

`brick` | _string_, **REQUIRED**

Selected Brick. Possible values are: `payment`.

<br />

`target` | _string_, **REQUIRED**

Id of the container that the brick will be rendered in. Can be any HTML element.

<br />

`settings` | _object_, **REQUIRED**

The `settings` object has properties to initialize and customize the brick being created.


|   Setting key  |   Type   |        Description                                   |              | 
|---------------|----------|------------------------------------------------------|--------------|
| `initialization`| `object` | Defines the initialization data. [See more](#initialization) | **REQUIRED** |
| `callbacks`     | `object` | Defines the callback functions. [See more](#callbacks) | **REQUIRED** |
| `customization` | `object`  | Defines custom properties. [See more](#customization) | **OPTIONAL** |
| `locale`        | `string` | Defines locale.                                     | **OPTIONAL** |

<br />

#### Initialization

<br />

Initialization is an object with the properties the brick will initialize with.

|   Initialization key  |   Type   |        Description                                   |              |
|---------------|----------|------------------------------------------------------|--------------|
| `amount`| `number` | Defines the transaction amount. | **REQUIRED** |
| `payer`| `object`| Defines payer initial data. [Possible values](#payer)  | **OPTIONAL** |
| `preferenceId`| `string`| If provided, the brick will bring to screen the Mercado Pago payment option. [The preference id should be created in Backend](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/checkout-customization/preferences)  | **OPTIONAL** |

<br />

##### Payer

Payer contains initial payer information.

|   Payer key  |   Type   |        Description                                   |
|---------------|----------|------------------------------------------------------|
| `email`| `string` | Defines the payer email. Brick will hide email field if this value is correctly filled |
| `firstName`| `string` | Payer first name |
| `lastName`| `string` | Payer last name |
| `identification`     | `object` | Defines payer identification. Contains keys `type` and `number` |
| `identification.type` | `string`  | Identification type. Possible values vary based on siteId | 
| `identification.number` | `string` | Identification number. If filled correctly the Brick will prefill the identification number input |
| `address` | `object` | Defines payer address. Contains keys `zipCode`, `federalUnit`,`city`,`neighborhood`,`streetName`,`streetNumber` and `complement` | 
| `address.zipCode` | `string` | Zip code of payer address. If filled correctly the Brick will prefill the zip code input | 
| `address.federalUnit` | `string` | State of payer address. If filled correctly the Brick will prefill the federal unit input | 
| `address.city` | `string` | City of payer address. If filled correctly the Brick will prefill the city input | 
| `address.neighborhood` | `string` | Neighborhood of payer address. If filled correctly the Brick will prefill the neighborhood input | 
| `address.streetName` | `string` | Street name of payer address. If filled correctly the Brick will prefill the street name input | 
| `address.streetNumber` | `number` | Street number of payer address. If filled correctly the Brick will prefill the street number input | 
| `address.complement` | `string` | Complement of payer address. If filled correctly the Brick will prefill the complement input | 
| `customerId` | `string` | Customer ID. View how to manage customers. [See More](https://www.mercadopago.com.br/developers/pt/reference/customers/_customers/post)  | 
| `cardsIds` | `string[]` | Saved Cards Ids. If defined in conjunction with Customer ID, the payer will be able to use their saved cards in checkout. [See More](https://www.mercadopago.com.br/developers/pt/reference/cards/_customers_customer_id_cards/post)  | 

|   SiteId          |   Identification Type Values          |
|-------------------|-------------------------------------|
| `MLB (Brazil)`    | `CPF`, `CNPJ`                       |
| `MLA (Argentina)` | `DNI`, `CI`, `LC`, `LE`, `Otro`     |
| `MCO (Colombia)`  | `CC`, `CE`, `NIT`, `Otro`           |
| `MLC (Chile)`     | `RUT`, `Otro`                       |
| `MLU (Uruguay)`   | `CI`, `Otro`                        |
| `MPE (Peru)`      | `DNI`, `C.E`, `RUC`, `Otro`         |

<br />


#### Callbacks

<br />

The callbacks object contains the callbacks functions the brick will call during its life cycle.

|   Callback key     |     Description                                   |              | Params | Returns |
|-------------------|--------------------------------------------------|--------------|-----|----|
| `onReady` | It is called when the brick finishes loading | **REQUIRED** | `void` | `void` |
| `onError` | It is called when there is an error in the Brick | **REQUIRED** |  `BrickError` | `void` |
| `onSubmit` | It is called when the user clicks on the submit button | **OPTIONAL** | `PaymentFormData`, `AdditionalData` | `Promise<void>` | 
| `onBinChange` | It is called when the user fills or update card's BIN (first 8 digits) | **OPTIONAL** |  `bin` | `void` |

<br />

`BrickError`

```ts
{
    type: 'non_critical' | 'critical';
    message: string;
    cause: ErrorCause;
}
```
<br />

`ErrorCause`

```ts
{
    'invalid_sdk_instance',
    'container_not_found',
    'incorrect_initialization',
    'already_initialized',
    'settings_empty',
    'missing_amount_property',
    'amount_is_not_number',
    'missing_required_callbacks',
    'missing_container_id',
    'missing_locale_property',
    'missing_texts',
    'fields_setup_failed',
    'missing_payment_information',
    'null_date',
    'wrong_date_format',
    'incomplete_fields',
    'validations_parameter_null',
    'get_payment_methods_failed',
    'card_token_creation_failed',
    'get_identification_types_failed',
    'get_card_bin_payment_methods_failed',
    'get_card_issuers_failed',
    'get_payment_installments_failed',
}
```
<br />

`PaymentFormData`

```ts
{
    selectedPaymentMethod: 'credit_card' | 'debit_card' | 'ticket' | 'bank_transfer' | 'wallet_purchase';
    formData: CardData | TicketData | BankTransferData | WalletPurchaseData;
}
```
<br />

> Note: The objects `CardData`, `TicketData` and `BankTransferData` could be directly sent to Mercado Pago `payment` API for processing.

<br />

`CardData`

<br />

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

<br />

`TicketData`

<br />

```ts
{
    'payment_method_id': string,
    'transaction_amount': number,
    'payer': {
        'email': string,
        'identification': {
                'type': string,
                'number': string
        }
        'first_name': string,
        'last_name': string,
        'address': {
            'city': string,
            'federal_unit': string,
            'neighborhood': string,
            'street_name': string,
            'street_number': string,
            'zip_code': string
        }
    }
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
null
```

<br />

`AdditionalData`

<br />

```ts
{
    'bin': string
}
```

<br />

#### Customization

<br />

Customizations object is used to load Brick under different conditions.


|   Customization key  |   Type   |        Description                                   |              |
|---------------|----------|------------------------------------------------------|--------------|
| `visual`| `object`| Control the visual aspects of the brick. Contains `style`, `font`, `texts`, `hidePaymentButton` and `hideFormTitle` | **OPTIONAL** |
| `visual.font`| `string`| Defines the custom font URL. This only applies to the [Secure Fields](../fields.md#fields-module). | **OPTIONAL** |
| `visual.texts`| `CustomTexts`| Defines custom texts for the Brick (available custom texts vary by Brick). | **OPTIONAL** |
| `visual.style`| `Style`| Defines custom theme and CSS variables | **OPTIONAL** |
| `visual.hidePaymentButton`| `boolean`| Hides the payment button and disables the `onSubmit` callback. | **OPTIONAL** |
| `visual.hideFormTitle`| `boolean`| Hides the form title row. | **OPTIONAL** |
| `visual.hideRedirectionPanel`| `boolean`| Hides the redirection form. Only applies when the Wallet Purchase option is enabled. | **OPTIONAL** |
| `paymentMethods`| `object` | Object that allow payment methods configuration. Contains `maxInstallments`, `minInstallments`, `creditCard`, `debitCard`, `ticket`, `bankTransfer`. | **OPTIONAL** |
| `paymentMethods.maxInstallments`| `number` | Maximum number of installments to be offered to the user  | **OPTIONAL** | 
| `paymentMethods.minInstallments`| `number` | Minimal number of installments to be offered to the user  | **OPTIONAL** |
| `paymentMethods.creditCard`| `string[] or string` | Allow payments with credit card. When the value `'all'` is provided, all credit cards are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com.br/developers/pt/reference/payment_methods/_payment_methods/get) for the paymentType `credit_card`. | **OPTIONAL** |
| `paymentMethods.debitCard`| `string[] or string` | Allow payments with debit card. When the value `'all'` is provided, all debit cards are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com.br/developers/pt/reference/payment_methods/_payment_methods/get) for the paymentType `debit_card`. | **OPTIONAL** |
| `paymentMethods.ticket`| `string[] or string` | Allow payments with tickets (only available in Brazil and Argentina). When the value `'all'` is provided, all ticket methods are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com.br/developers/pt/reference/payment_methods/_payment_methods/get) for the payment type `ticket`. | **OPTIONAL** |
| `paymentMethods.bankTransfer`| `string[] or string` | Allow payments with Bank Transfer (only available in Brazil). When the value `'all'` is provided, all bank transfer methods are accepted. When an array is provided, it should contain the [IDs of the desired payment method](https://www.mercadopago.com.br/developers/pt/reference/payment_methods/_payment_methods/get) for the payment type `bank_transfer`. | **OPTIONAL** |

<br />

`CustomTexts`

Accepted properties are:

|             Property           | Type |
|------------------------------|----------|
|`formTitle`| `string` |
|`cardNumber`| `object` |
|`cardNumber.label`| `string` |
|`cardNumber.placeholder`| `string` | 
|`expirationDate`| `object` |
|`expirationDate.label`| `string` |
|`expirationDate.placeholder`| `string` |
|`securityCode`| `object` |
|`securityCode.label`| `string` |
|`securityCode.placeholder`| `string` | 
|`cardholderName`| `object` |
|`cardholderName.label`| `string` |
|`cardholderName.placeholder`| `string` |
|`cardholderIdentification`| `object` |
|`cardholderIdentification.placeholder`| `string` |
|`installmentsSectionTitle`| `string` | 
|`selectInstallments`| `string` |
|`selectIssuerBank`| `string` | 
|`emailSectionTitle`| `string` | 
|`email`| `object` |
|`email.label`| `string` |
|`email.placeholder`| `string` |
|`formSubmit`| `string` |
|`payerFirstName.placeholder`| `string`|
|`payerFirstName.label`| `string`|
|`payerLastName.placeholder`| `string`|
|`payerLastName.label`| `string`|
|`zipCode.placeholder`| `string`|
|`zipCode.label`| `string`|
|`addressState.placeholder`| `string`|
|`addressState.label`| `string`|
|`addressCity.placeholder`| `string`|
|`addressCity.label`| `string`|
|`addressNeighborhood.placeholder`| `string`|
|`addressNeighborhood.label`| `string`|
|`addressStreet.placeholder`| `string`|
|`addressStreet.label`| `string`|
|`addressNumber.label`| `string`|
|`addressComplement.label`| `string`|

<br />

#### Style

<br />

Style is an object with keys for theme and custom CSS variables.

|   Style key  |   Type   |        Description                                   |              |
|---------------|----------|------------------------------------------------------|--------------|
| `theme`| `string` | Defines theme for Brick. Possible values: `default`, `dark`, `flat`, `bootstrap` | **OPTIONAL** |
| `customVariables`| `object`| Defines custom variables to be applied. [Possible values](#custom-variables)  | **OPTIONAL** |

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

|             Property           | Type |
|------------------------------|----------|
|`textPrimaryColor`| `string` | 
|`textSecondaryColor`| `string` |
|`inputBackgroundColor`| `string` | 
|`formBackgroundColor`| `string` | 
|`baseColor`| `string` | 
|`baseColorFirstVariant`| `string` |
|`baseColorSecondVariant`| `string` |
|`secondaryColor`| `string` |
|`errorColor`| `string` |
|`successColor`| `string` |
|`outlinePrimaryColor`| `string` |
|`outlineSecondaryColor`| `string` |
|`buttonTextColor`| `string` |
`fontSizeExtraSmall` | `string` |
`fontSizeSmall` | `string` |
`fontSizeMedium` | `string` |
`fontSizeLarge` | `string` |
`fontSizeExtraLarge` | `string` |
`fontWeightNormal` | `string` |
`fontWeightSemiBold` | `string` |
`formInputsTextTransform` | `string` |
`inputVerticalPadding` | `string` |
`inputHorizontalPadding` | `string` |
`inputFocusedBoxShadow` | `string` |
`inputErrorFocusedBoxShadow` | `string` |
`inputBorderWidth` | `string` |
`inputFocusedBorderWidth` | `string` |
`borderRadiusSmall` | `string` |
`borderRadiusMedium` | `string` |
`borderRadiusLarge` | `string` |
`borderRadiusFull` | `string` |
`formPadding` | `string` |

> Note: All sizing properties accept values in: `px`, `rem`, `em`, and `%`

<br />

### Returns: `Promise<BRICK CONTROLLER>`

<br />

## Brick Controller

The Brick Controller contains methods that allow the integrator to interact with the rendered Brick.

<br />

|||
|-|-|
|unmount | **METHOD** |
|getFormData | **METHOD** |
|getAdditionalData | **METHOD** |

<br />

### `Brick Controller`.unmount()

<br />

The `unmount` methods removes the rendered Brick from the page.


<br />

#### Params

None.

#### Returns

`void`

<br />

### `Brick Controller`.getFormData()

<br />

The `getFormData` method returns the data the user filled in the form (only works if the submit button is disabled).


#### Params

None.

#### Returns

| Brick | Return Data |
|------------------------|--------|
| `payment` | `PaymentFormData`|

### `Brick Controller`.getAdditionalData()

<br />

The `getAdditionalData` method returns additional data that may be useful to you (only works if the submit button is disabled).


#### Params

None.

#### Returns

| Brick | Return Data |
|------------------------|--------|
| `payment` | `AdditionalData`|