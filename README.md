# THIS IS A DRAFT!
# DO NOT USE IN PRODUCTION. 

# SDK MercadoPago.js V2 - BETA
Mercado Pago's Official JS SDK

<br />

# Table of Contents
1. [About](#about)
2. [Support](#support)
    1. [Desktop web](#desktop-web)
    2. [Mobile web](#mobile-web)
3. [Features](#features)
    1. [Core Methods](#mp-instancegetidentificationtypes)
    2. [CardForm](#mp-instancecardformamount-automount-processingmode-form-callbacks)
4. [Installation](#installation)
5. [Initializing](#initializing)
6. [Full example](#full-example)
7. [API](#api)
8. [Checkout Off Web](#checkout-off-web)
9. [Notes](#notes)

<br />

## About 
It is a **clientside SDK** whose main objective is to **generate a token from the buyer's card**, thus allowing a secure flow and within the security standards of sensitive data transfer.

<br />

## Support

### Desktop web


| Navegador | Suporte |
|---------- | ----------|
| Chrome    | Complete
| Firefox    | Complete
| Safari    | Complete
| Edge | Complete
| Opera | Complete
| Internet Explorer    | 11

<br />

### Mobile web
| Navegador | Suporte |
|---------- | ----------|
| Chrome    | Complete
| Firefox    | Complete
| Safari    | Complete
| Android Browser    | Complete

<br />

## Features
The new version maintains the **basic functionalities of V1** (with slightly API modifications) and adds a new functionality - **cardForm** - which aims to **optimize the integration** by abstracting most of the logic that was previously in the hands of the integrator, but still maintaining the **flexibility** that the checkout transparent should deliver.

<br />

## Installation
To install the SDK, you must include script in your application's HTML:


```html
<script src="https://sdk.mercadopago.com/js/v2"></script>
```

<br />

## Initializing
To start the SDK, you need to assign your `public_key` along with some `options`.

### Example:

```javascript
const mercadopago = new MercadoPago('PUBLIC_KEY', {
  locale: 'pt-BR',
})
```

<br/>

## Full example

```HTML

<body>
 <form id="form-checkout" >
   <input name="cardNumber" id="form-checkout__cardNumber" />
   <input name="CVV" id="form-checkout__CVV" />
   <input name="expirationMonth" id="form-checkout__expirationMonth" />
   <input name="expirationYear" id="form-checkout__expirationYear" />
   <input name="cardholderName" id="form-checkout__cardholderName"/>
   <select name="issuer" id="form-checkout__issuer"></select>
   <select name="docType" id="form-checkout__docType"></select>
   <input name="docValue" id="form-checkout__docValue"/>
   <select name="installments" id="form-checkout__installments"></select>
   <button type="submit" id="form-checkout__submit">Pagar</button>
 </form>

 <script src="https://sdk.mercadopago.com/js/v2"></script>
 <script>
const mercadopago = new MercadoPago('PUBLIC_KEY', {
         locale: 'pt-BR',
     });

     const cardForm = mercadopago.cardForm({
         amount: 1000,
         autoMount: true,
         processingMode: 'aggregator',
         form: {
             id: 'form-checkout',
             cardholderName: {
                 id: 'form-checkout__cardholderName',
                 placeholder: 'Full name',
             },
             cardNumber: {
                 id: 'form-checkout__cardNumber',
                 placeholder: 'Card number',
             },
             CVV: {
                 id: 'form-checkout__CVV',
                 placeholder: 'CVV',
             },
             installments: {
                 id: 'form-checkout__installments',
                 placeholder: 'Total installments'
             },
             expirationMonth: {
                 id: 'form-checkout__expirationMonth',
                 placeholder: 'MM'
             },
             expirationYear: {
                 id: 'form-checkout__expirationYear',
                 placeholder: 'YYYY'
             },
             docType: {
                 id: 'form-checkout__docType',
                 placeholder: 'Document type'
             },
             docValue: {
                 id: 'form-checkout__docValue',
                 placeholder: 'Document number'
             },
             issuer: {
                 id: 'form-checkout__issuer',
                 placeholder: 'Issuer'
             }
         },
         callbacks: {
            onFormMounted: function(error) {
                if (error) return console.log('Form Mounted handling error ', error)
                console.log('Form mounted')
            },
            onFormUnmounted: function(error) {
                if (error) return console.log('Form Unmounted handling error ', error)
                console.log('Form unmounted')
            },
            onIdentificationTypesReceived: function(error, identificationTypes) {
                if (error) return console.log('identificationTypes handling error ', error)
                console.log('Identification types available: ', identificationTypes)
            },
            onPaymentMethodsReceived: function(error, paymentMethods) {
                if (error) return console.log('paymentMethods handling error ', error)
                console.log('Payment Methods available: ', paymentMethods)
            },
            onIssuersReceived: function(error, issuers) {
                if (error) return console.log('issuers handling error ', error)
                console.log('Issuers available: ', issuers)
            },
            onInstallmentsReceived: function(error, installments) {
                if (error) return console.log('installments handling error ', error)
                console.log('Installments available: ', installments)
            },
            onCardTokenReceived: function(error, token) {
                if (error) return console.log('Token handling error ', error)
  
                const formData = cardForm.getCardFormData()
                console.log('form Data: ', formData)
                // post data to your backend
     
            },
        }
     })

     document.getElementById('form-checkout').addEventListener('submit', function(e) {
         e.preventDefault();
         cardForm.createCardToken()
     })
 </script>
</body>
```

<br>

## API

### MercadoPago(`public_key`[`, options`])

SDK instantiation method.

#### Params:
`public_key` | *string*, **REQUIRED** 

It is the public key for your account.

<br />
 
`options` | *object*, **OPTIONAL**


|Option name|Default|Type|Description||
|-|-|-|-|-|
|`locale` | Browser default locale | *string* | Set the locale | **OPTIONAL** |

<br />

#### Example:

```javascript
const mercadopago = new MercadoPago('PUBLIC_KEY', {
  locale: 'pt-BR',
})
```
<br />

#### Return: `mp instance`

|||
|-|-|
|getIdentificationTypes | **METHOD** |
|getPaymentMethods | **METHOD** |
|getIssuers | **METHOD** |
|getInstallments | **METHOD** |
|createCardToken | **METHOD** |
|cardForm | **CARDFORM** |

<br />

---

<br />


### `mp instance`.getIdentificationTypes()
Return all the document types based on the `public_key`

#### Example:

```javascript
const identificationTypes = await mp.getIdentificationTypes()
```
 

#### Return: `PROMISE`
```javascript
[{
  id: string,
  name: string,
  type: string,
  min_length: number,
  max_length: number
}]
```
<br />

---

<br />

### `mp instance`.getPaymentMethods(`paymentMethodsParams`)
Returns a payment methods list

<br />

#### Params:
`paymentMethodsParams` | _object_, **REQUIRED**
| Option Key | Type | Description | |
|-|-|-|-|
| `bin` | `STRING` | Card number first 6 digits | **REQUIRED** |
| `processingMode` | `"aggregator"` \| `"gateway"` | Process mode | **OPTIONAL** |

<br />

#### Example:

```javascript
const paymentMethods = await mp.getPaymentMethods({ payment_method_id: 'visa' })
```

#### Return: `PROMISE` (showing most common used results.)

```javascript
[{
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
}]
```

<br />

---

<br />

### `mp instance`.getIssuers(`issuersParams`)
Returns a issuers list

<br />

#### Params:
`issuersParams` | _object_, **REQUIRED**
| Option Key | Type | Description | |
|-|-|-|-|
| `payment_method_id` | `STRING` | Payment method ID | **REQUIRED** |
| `bin` | `STRING` | Card number first 6 digits | **REQUIRED** |

<br />

#### Example:

```javascript
const issuers = await mp.getIssuers({ payment_method_id: 'visa' })
```

#### Return: `PROMISE`
```javascript
[{
  id: string,
  name: string,
  secure_thumbnail: string,
  thumbnail: string,
  processing_mode: string,
  merchant_account_id?: string,
}]
```

<br />

---

<br />

### `mp instance`.getInstallments(`installmentsParams`)
Returns all installments available

<br />

#### Params:
`installmentsParams` | _object_, **REQUIRED**
| Option Key | Type | Description | |
|-|-|-|-|
| `amount` | `STRING` | Payment total amount | **REQUIRED** |
| `bin` | `STRING` | Card number first 6 digits | **REQUIRED** |
| `locale` | `STRING` | Set the response message language | **REQUIRED** |
| `processingMode` | `"aggregator"` \| `"gateway"` | Process mode | **REQUIRED** |

<br />

#### Example:
```javascript
const installments = await mp.getInstallments({
  amount: '1000',
  locale: 'pt-BR',
  bin: '411111'
})
```

#### Return: `PROMISE`

```javascript
[{
  ...
  merchant_account_id?: string,
  payer_costs: [{
    installments: number,
    installment_rate: number,
    discount_rate: number,
    labels: string[],
    installment_rate_collector: string[],
    min_allowed_amount: number,
    max_allowed_amount: number,
    recommended_message: string,
    installment_amount: number,
    total_amount: number,
    payment_method_option_id: string
  }]
}]
```

<br />

---

<br />

### `mp instance`.createCardToken(`cardTokenParams`)
Return a token card

#### Params:
`cardTokenParams` | _object_, **REQUIRED**
| Option Key | Type | Description | |
|-|-|-|-|
| `cardNumber` | `STRING` | Card number | **REQUIRED** |
| `cardholderName` | `STRING` | Cardholder name | **REQUIRED** |
| `cardholderIdentificationType` | `STRING` | Type of document | **REQUIRED** |
| `cardholderIdentificationNumber` | `STRING` | Value of document | **REQUIRED** |
| `securityCode` | `STRING` | Security code | **REQUIRED** |
| `cardExpirationMonth` | `STRING` | Expiration month | **REQUIRED** |
| `cardExpirationYear` | `STRING` | Expiration year | **REQUIRED** |

<br />

#### Example:

```javascript
const cardToken = await mp.createCardToken({
    cardNumber: '5031433215406351' ,
    cardholderName: 'APRO',
    cardholderIdentificationType: 'CPF',
    cardholderIdentificationNumber: '12345678912',
    securityCode: '123',
    cardExpirationMonth: '11',
    cardExpirationYear: '2025',
})
```

<br />

#### Return: `PROMISE`

```javascript
{
  ...
  id: string
}
```

<br />

---

<br />

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
|`cardNumber`|`cardFormMap`|`<input>`|Card number HTML options|**REQUIRED**|
|`CVV`|`cardFormMap`|`<input>`|CVV HTML options|**REQUIRED**|
|`installments`|`cardFormMap`|`<select>`|Installments HTML options|**REQUIRED**|
|`cardExpirationMonth`|`cardFormMap`|`<input>` \| `<select>`|Card expiration month HTML options|**REQUIRED**|
|`cardExpirationYear`|`cardFormMap`|`<input>` \| `<select>`|Card expiration year HTML options|**REQUIRED**|
|`docType`|`cardFormMap`|`<select>`|Documentation type HTML options|**REQUIRED**|
|`docValue`|`cardFormMap`|`<input>`|Documentation value HTML options|**REQUIRED**|
|`issuer`|`cardFormMap`|`<select>`|Issuer value HTML options|**REQUIRED**|

<br />

<br />

#### The CardformMap type
|||||
|-|-|-|-|
|`id`|`string`|Field ID|**REQUIRED**|
|`placeholder`|`string`|Field Placeholder|**OPTIONAL**|

<br />

---

<br />

`callback` | _object_, **REQUIRED**

The `callback` object contains callbaks functions to handle different stages of `Cardform instance`'s flow

<br />

| callback | params | Description | |
|-|-|-|-|
|onFormMounted(`error`)|`error`?: ERROR|Callback triggered when CardForm is mounted|**REQUIRED**|
|onFormUnmounted(`error`)|`error`?: ERROR|Callback triggered when CardForm is unmounted|**OPTIONAL**|
|onIdentificationTypesReceived(`error`, `data`)|`error`?: ERROR  <br/>`data`?: `identificationTypesResponse`|Callback triggered when `getIdentificationTypes()` response returns|**OPTIONAL**|
|onPaymentMethodsReceived(`error`, `data`)|`error`?: ERROR  <br/>`data`?: `paymentMethodsResponse`|Callback triggered when `getPaymentMethods()` response returns|**OPTIONAL**|
|onIssuersReceived(`error`, `data`)|`error`?: ERROR  <br/>`data`?: `issuersResponse`|Callback triggered when `getIssuers()` response returns|**OPTIONAL**|
|onInstallmentsReceived(`error`, `data`)|`error`?: ERROR  <br/>`data`?: `installmentsResponse`|Callback triggered when `getInstallments()` response returns|**OPTIONAL**|
|onCardTokenReceived(`error`, `data`)|`error`?: ERROR  <br/>`data`?: `cardTokenResponse`|Callback triggered when `createCardToken()` response returns|**OPTIONAL**|

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
[{
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
}]
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

<br />

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
Returns all the necessary data to make a payment

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

<br />

## Checkout Off Web 

#### Initializing the Checkout
To initialize the checkout you need to call the `.checkout` function from the SDK along with some options 

##### Checkout

```javascript
mercadopago.checkout(checkoutParams)
```

###### Params

|Option name|Type|Attributes|Description||
|-|-|-|-|-|
|`preference` | *object* | `id`: *string* | Payment Preference | **REQUIRED** |

##### Tokenizer 

```javascript
mercadopago.checkout(tokenizerParams)
```
###### Params

`tokenizer` | *object*, **REQUIRED** :  Data and customizations for the tokenizer. Can contain the following attributes: 

|Option name|Type|Attributes|Description||
|-|-|-|-|-|
|`totalAmount` | *number* || Payment amount | **REQUIRED** |
|`buttonConfirmLabel` | *string* || Label to display in the payment button | **REQUIRED** |
|`summary` | *object* |`title`: *string* <br>`taxes`: *number* <br>`arrears`: *number* <br>`charge`: *number* <br>`discount`: *number* <br>`product`: *number* <br>`shipping`: *number* <br>`discountLabel`: *string* <br>`productLabel`: *string* <br>`totalLabel`: *string* <br>| Additional taxes and customization for the summary | **OPTIONAL** |
|`backUrl` | *string* || Return URL | **OPTIONAL** |
|`installments` | *object* |`minInstallments`: *number* <br> `maxInstallments`: *number*| Set minimum and maximum number of installments available | **OPTIONAL** |
|`exclusions` | *object* |`paymentMethods`: *string* <br> `paymentType`: *string*| Exclude payment methods | **OPTIONAL** |
|`savedCards` | *object* | `cardIds`: *string* <br> `customerId`: *string*| Set default saved cards | **OPTIONAL** |

##### Additional configurations 
Regardless of the product you are trying to render, you can pass some other configurations as params to the `.checkout()` function: 

`theme` | *object* | **OPTIONAL** : Visual customization data 

|Option name|Type|Description|
|-|-|-|
|`elementsColor` | *string* | Checkout elements color (e.g., buttons, labels)|
|`headerColor` | *string* | Color for the checkout header|

`internalConfigurations` | *string* | **OPTIONAL** : Additional payment configurations
`autoOpen` | *boolean* | **OPTIONAL** : If the value is set to `true`, it will trigger the checkout to automatically open as soon as the page loads

`render` | *object* | **OPTIONAL** : Set the render options right away without needing to call the rendering functions later.
|Option name|Type|Description|
|-|-|-|
|`container` | *string* | Checkout elements color (e.g., buttons, labels)|
|`openMode` | *string* | Specify how should the checkout be opened. Possible values: `modal`, `redirect`|
|`label`|*string*|Label for the checkout trigger button|
|`type`|*string*|Type for the checkout trigger button|

#### Rendering the Checkout 

##### mercadopago.checkout.`render()`
Renders the Payment Button on a given container. This button has the trigger to open the checkout

**Params**
|Option name|Type|Description||
|-|-|-|-|
|`container`|*string*|Selector (id, class) for the container element||
|`openMode`|*string*|Specify how should the checkout be opened. Possible values: `modal`, `redirect`||
|`label`|*string*|Label for the checkout trigger button||
|`type`|*string*|Type for the checkout trigger button||

##### mercadopago.checkout.`open()`
Manually triggers the opening of an iframe element with the checkout.

**Params**
|Option name|Type|Description||
|-|-|-|-|
|`openMode`|*string*|Specify how should the checkout be opened. Possible values: `modal`, `redirect`||

## Notes

When requesting our SDK (https://sdk.mercadopago.com/js/v2), we may ship different script based on the browser's User Agent so we can optmize the bundle size according to the needs.
For IE 11 we ship polyfills so you can get a better experience when integrating with our SDK
