## `BricksBuilder`.create(`brick`, `target`, `settings`)

Example:
```js
mp.bricks().create('cardPayment', 'cardPaymentBrick_container' , {
    initialization: {
        amount: 100
    },
    callbacks: {
        onReady: () => {
            // handle form ready
        },
        onSubmit: (cardData) => {
            return new Promise((resolve, reject) => {
                fetch("/process_payment", { 
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cardData)
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

Selected Brick. Possible values are: `cardPayment`.

<br />

`target` | _string_, **REQUIRED**

Id of the container that the brick will be rendered in. Can be any HTML element.

<br />

`settings` | _object_, **REQUIRED**

The `settings` object has properties to initialize and customize the brick being created.


|   Setting key  |   Type   |        Description                                   |              | 
|---------------|----------|------------------------------------------------------|--------------|
| `initialization`| `object` | Defines the initialization data.[See more](#initialization) | **REQUIRED** |
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

<br />

##### Payer

Payer contains initial payer information.

|   Payer key  |   Type   |        Description                                   |
|---------------|----------|------------------------------------------------------|
| `email`| `string` | Defines the payer email. Brick will hide email field if this value is correctly filled |
| `identification`     | `object` | Defines payer identification. Contains keys `type` and `number` |
| `identification.type` | `string`  | Identification type. Possible values vary based on siteId | 
| `identification.number` | `string` | Identification number. If filled correctly the Brick will prefill the identification number input | 

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
| `onSubmit` | It is called when the user clicks on the submit button | **OPTIONAL** | <code>Promise<CardData &#124; void></code> | `Promise<void>` | 

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

> Note: The `CardData` object can be processed directly to the Mercado Pago `payment` API.

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
| `paymentMethods`| `object` | Object that allow payment methods configuration. Contains `maxInstallments`, `minInstallments`, and `types` | **OPTIONAL** |
| `paymentMethods.maxInstallments`| `number` | Maximum number of installments to be offered to the user  | **OPTIONAL** | 
| `paymentMethods.minInstallments`| `number` | Minimal number of installments to be offered to the user  | **OPTIONAL** |
| `paymentMethods.types`| `object` | Control of the accepted payment types. Contains `excluded` and `included` | **OPTIONAL** | 
| `paymentMethods.types.excluded`| `string[]` | Not accepted payment types. Accepts: `credit_card`, `debit_card` | **OPTIONAL** |
| `paymentMethods.types.included`| `string[]` | Accepted payment types. Accepts: `credit_card`, `debit_card` | **OPTIONAL** |

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

The `getFormData` method returns the data the user filled in the form, only if the submit button is disabled.


#### Params

None.

#### Returns

| Brick | Return Data |
|------------------------|--------|
| `cardPayment` | `CardData`|