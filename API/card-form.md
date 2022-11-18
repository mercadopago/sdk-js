### `mp instance`.cardForm({`amount`[`, autoMount`, `processingMode`]`, form, callbacks`})
CardForm instantiation method.

<br />

#### Returns: `CARDFORM INSTANCE`

<br />

#### Params:
`amount` | _string_, **REQUIRED**

Payment total amount

---

`autoMount` | _boolean_, **OPTIONAL**

Mount the `Cardform Instance` when it is instantiated

**default value**: `true`

---

`processingMode` | _string_, **OPTIONAL**

Set the processing mode

**valid values**: `"gateway"` | `"aggregator"`

**default value**: `aggregator`

---

`form` | _object_, **REQUIRED**

The `form` object contains `cardFormMap` whose purpose is to map the HTML fields into the SDK.

<br />

Form Options:

| Option Key | Type | HTML Element | Description | |
|-|-|-|-|-|
|`id`|`string`|`<form>`|Form ID|**REQUIRED**|
|`cardholderName`|`cardFormMap`|`<input>`|Cardholder name HTML options|**REQUIRED**|
|`cardholderEmail`|`cardFormMap`|`<input>`|Cardholder Email HTML options|**OPTIONAL**|
|`cardNumber`|`cardFormMap`|`<input>`\|Card number HTML options|**REQUIRED**|
|`expirationMonth`|`cardFormMap`|`<input>` \| `<select>`\|Card expiration month HTML options|**REQUIRED**|
|`expirationYear`|`cardFormMap`|`<input>` \| `<select>`\|Card expiration year HTML options|**REQUIRED**|
|`expirationDate`|`cardFormMap`|`<input>` \| `<select>`\|Card expiration date HTML options|**REQUIRED**|
|`securityCode`|`cardFormMap`|`<input>`\|SecurityCode HTML options|**REQUIRED**|
|`installments`|`cardFormMap`|`<select>`|Installments HTML options|**REQUIRED**|
|`identificationType`|`cardFormMap`|`<select>`|Documentation type HTML options|**REQUIRED**|
|`identificationNumber`|`cardFormMap`|`<input>`|Documentation value HTML options|**REQUIRED**|
|`issuer`|`cardFormMap`|`<select>`|Issuer value HTML options|**REQUIRED**|

<br />

<br />

#### The `CardformMap` type
|||||
|-|-|-|-|
|`id`|`string`|Field ID|**REQUIRED**|
|`placeholder`|`string`|Field Placeholder|**OPTIONAL**|
|`style`|`object`|Field styles only available for `cardNumber`, `securityCode`, `expirationDate`, `expirationMonth` and `expirationYear` when the `iframe` option is `true`. [See more](fields.md#style)|**OPTIONAL**|
|`customFonts`|`array`|Field customFonts only available for `cardNumber`, `securityCode`, `expirationDate`, `expirationMonth` and `expirationYear` when the `iframe` option is `true`. [See more](fields.md#custom-fonts)|**OPTIONAL**|
|`mode`|`string`|Field mode only available for `expirationDate` and `expirationYear` when the `iframe` option is `true`. [See more](fields.md#year-mode)|**OPTIONAL**|

<br />

---

<br />

`callback` | _object_, **REQUIRED**

The `callback` object contains callbaks functions to handle different stages of `Cardform instance`'s flow

<br />

| callback | params | Description | |
|-|-|-|-|
|onFormMounted|`error`?: ERROR|Callback triggered when CardForm is mounted|**REQUIRED**|
|onFormUnmounted|`error`?: ERROR|Callback triggered when CardForm is unmounted|**OPTIONAL**|
|onIdentificationTypesReceived|`error`?: ERROR  <br/>`data`?: `identificationTypesResponse`|Callback triggered when `getIdentificationTypes()` response returns|**OPTIONAL**|
|onPaymentMethodsReceived|`error`?: ERROR  <br/>`data`?: `paymentMethodsResponse`|Callback triggered when `getPaymentMethods()` response returns|**OPTIONAL**|
|onIssuersReceived|`error`?: ERROR  <br/>`data`?: `issuersResponse`|Callback triggered when `getIssuers()` response returns|**OPTIONAL**|
|onInstallmentsReceived|`error`?: ERROR  <br/>`data`?: `installmentsResponse`|Callback triggered when `getInstallments()` response returns|**OPTIONAL**|
|onCardTokenReceived|`error`?: ERROR  <br/>`data`?: `cardTokenResponse`|Callback triggered when `createCardToken()` response returns|**OPTIONAL**|
|onFetching|`resource`?: String|Callback triggered whenever the SDK is asynchronously fetching an external resource. **Its possible to return a function from this callback, which is executed after the fetching is done**|**OPTIONAL**|
|onSubmit|`event`?: Event|Callback triggered before the form is submitted|**OPTIONAL**|
|onReady||Callback triggered when cardForm is ready. It occurs when `getIdentificationTypes()` response returns and when iframes are ready if iframe option is true|**OPTIONAL**|
|onValidityChange|`error`?: `validityChangeResponse`<br>`field`?: string|Callback triggered when some field validation occurs|**OPTIONAL**|
|onBinChange|`bin`: string|Callback triggered when BIN has changed|**OPTIONAL**|
|onError|`error`?: `onErrorResponse`<br>`event`?: ErrorEvent|Callback triggered when some error occurs. You can use this callback to replace error validation of previous callbacks|**OPTIONAL**|

<br />

#### The responses types:


`identificationTypesResponse`
```javascript
[{
    installments: string,
    installment_rate: number,
    discount_rate: number,
    min_allowed_amount: number,
    max_allowed_amount: number,
    recommended_message: string,
    installment_amount: number,
    total_amount: number,
    payment_method_option_id: string,
}]
```

---

`paymentMethodsResponse`
```javascript
{
  paging: {
    total: number,
      limit: number,
      offset: number,
    },
  results: [{
    secure_thumbnail: string,
    min_accreditation_days: number,
    max_accreditation_days: number,
    id: string,
    payment_type_id: string,
    accreditation_time: number,
    thumbnail: string,
    marketplace: string,
    deferred_capture: string,
    labels: string[],
    name: string,
    site_id: string,
    processing_mode: string,
    merchant_account_id?: string,
    additional_info_needed: string[],
    status: string,
    settings: [{
        security_code: {
            mode: string,
            card_location: string,
            length: number
        },
        card_number: {
            length: number,
            validation: string
        },
        bin: {
            pattern: string,
            installments_pattern: string,
            exclusion_pattern: string,
        }
    }],
    issuer: {
        default: boolean,
        name: string,
        id: number
    },
}
```

---

`issuersResponse`
```javascript
[{
    id: string,
    name: string,
    thumbnail: string,
    processing_mode: string,
}]
```

---
`installmentsResponse`
```javascript
{
    merchant_account_id?: string,
    payer_costs: [{
        installments: string,
        installment_rate: number,
        discount_rate: number,
        min_allowed_amount: number,
        max_allowed_amount: number,
        recommended_message: string,
        installment_amount: number,
        total_amount: number,
        payment_method_option_id: string,
    }]
}
```
---
`cardTokenResponse`
```javascript
{
    token: string
}
```
---
`validityChangeResponse`
```js
[
    {
        message: string,
        code: string
    }
]
```
---
`onErrorResponse`
```js
[
    {
        message: string
    }
]
```

<br />

---

`iframe` | _boolean_, **OPTIONAL**

Defines wheter the SDK should use MP Fields for `cardNumber`, `securityCode` and `expirationDate` or not.

If you opt to use `iframe`, you must change the HTML Element for `cardNumber`, `securityCode` and `expirationDate` to `div`, in order to be used as the container for the iFrames.

Check section [Fields](https://developers.mercadopago.com/en/guides/online-payments/checkout-api/receiving-payment-by-card) for more information

**default value**: `false`

---

<br />

## CARDFORM HELPERS

Once CardForm is instantiated, `CARDFORM HELPERS` is returned, and contains methods (HELPER FUNCTION) that help working with CARDFORM INSTANCE

<br />

### `cardform instance`.mount()
Mount cardForm

#### Return:
Trigger `onFormMounted` callback

---

### `cardform instance`.unmount()
Unmount cardForm

#### Return:
Trigger `onFormUnmounted` callback

---

### `cardform instance`.createCardToken()
Create a card token

#### Return:
Trigger `onCardTokenReceived` callback

---

### `cardform instance`.getCardFormData()
Returns all the available data from your `cardForm instance`

#### Return:
`cardFormDataResponse`
```javascript
{
    token: string,
    installments: string,
    paymentMethodId: string,
    issuerId: string,
    identificationType: string,
    identificationNumber: string,
    processingMode: string,
    merchantAccountId?: string
}
```

---

### `cardform instance`.submit()
Invoke a `HTMLFormElement.requestSubmit()` on your `cardForm` form element

#### Return:
Trigger `onSubmit` callback

---
### `cardform instance`.update(`field`, `properties`)
Method to update field properties.

<br />

#### Params:

|    Param    |    Type    |                     Description                     |          |
|:-----------:|:----------:|:---------------------------------------------------:|:--------:|
| `field`     | `string`   | Field to update                                     | REQUIRED |
| `properties`| `object`   | Properties to update                                | REQUIRED |

<br />

The table below specifies the properties available for being updated.

| Property | Type | Description | Enabled for |
|-|-|-|-|
|placeholder|`string`|Field placeholder| ALL |

<br />

---

<br />
