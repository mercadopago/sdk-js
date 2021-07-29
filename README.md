# SDK MercadoPago.js V2
Mercado Pago's Official JS SDK

<br />

# Table of Contents
1. [About](#about)
2. [Support](#support)
    1. [Desktop web](#desktop-web)
    2. [Mobile web](#mobile-web)
3. [Installation](#installation)
4. [Initializing](#initializing)
5. [Checkout API](#checkout-api)
6. [Checkout PRO](#checkout-pro)
7. [Checkout Tokenizer](#checkout-tokenize)
8. [API](#api)
9. [Notes](#notes)

<br />

## About 
It is a **clientside SDK** whose main objective is to **facilitate the integration of Mercado Pago payment solutions on your website**, thus allowing a secure flow and within the security standards of sensitive data transfer.

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
const mp = new MercadoPago('YOUR_PUBLIC_KEY', {
  locale: 'en-US',
})
```

<br/>

## Checkout API
Use our APIs to build your own payment experience on your website or mobile application. From basic to advanced settings, control the entire experience.

See the API for [Checkout API CardForm](#mp-instancecardformamount-automount-processingmode-form-callbacks) or [Checkout API Core Methods](#mp-instancegetidentificationtypes)

<br />

### Full example (using cardForm)

```HTML
<!DOCTYPE html>
<html>
<body>
 <form id="form-checkout" >
   <input type="text" name="cardNumber" id="form-checkout__cardNumber" />
   <input type="text" name="cardExpirationMonth" id="form-checkout__cardExpirationMonth" />
   <input type="text" name="cardExpirationYear" id="form-checkout__cardExpirationYear" />
   <input type="text" name="cardholderName" id="form-checkout__cardholderName"/>
   <input type="email" name="cardholderEmail" id="form-checkout__cardholderEmail"/>
   <input type="text" name="securityCode" id="form-checkout__securityCode" />
   <select name="issuer" id="form-checkout__issuer"></select>
   <select name="identificationType" id="form-checkout__identificationType"></select>
   <input type="text" name="identificationNumber" id="form-checkout__identificationNumber"/>
   <select name="installments" id="form-checkout__installments"></select>
   <button type="submit" id="form-checkout__submit">Pay</button>

   <progress value="0" class="progress-bar">loading...</progress>
 </form>

 <script src="https://sdk.mercadopago.com/js/v2"></script>
 <script>
    const mp = new MercadoPago('PUBLIC_KEY', {
        locale: 'en-US'
    })

     const cardForm = mp.cardForm({
         amount: '100.5',
         autoMount: true,
         processingMode: 'aggregator',
         form: {
             id: 'form-checkout',
             cardholderName: {
                 id: 'form-checkout__cardholderName',
                 placeholder: 'Cardholder name',
             },
             cardholderEmail: {
                 id: 'form-checkout__cardholderEmail',
                 placeholder: 'Email',
             },
             cardNumber: {
                 id: 'form-checkout__cardNumber',
                 placeholder: 'Card number',
             },
              cardExpirationMonth: {
                 id: 'form-checkout__cardExpirationMonth',
                 placeholder: 'MM'
             },
             cardExpirationYear: {
                 id: 'form-checkout__cardExpirationYear',
                 placeholder: 'YYYY'
             },
             securityCode: {
                 id: 'form-checkout__securityCode',
                 placeholder: 'CVV',
             },
             installments: {
                 id: 'form-checkout__installments',
                 placeholder: 'Total installments'
             },
             identificationType: {
                 id: 'form-checkout__identificationType',
                 placeholder: 'Document type'
             },
             identificationNumber: {
                 id: 'form-checkout__identificationNumber',
                 placeholder: 'Document number'
             },
             issuer: {
                 id: 'form-checkout__issuer',
                 placeholder: 'Issuer'
             }
         },
         callbacks: {
            onFormMounted: error => {
                if (error) return console.warn('Form Mounted handling error: ', error)
                console.log('Form mounted')
            },
            onFormUnmounted: error => {
                if (error) return console.warn('Form Unmounted handling error: ', error)
                console.log('Form unmounted')
            },
            onIdentificationTypesReceived: (error, identificationTypes) => {
                if (error) return console.warn('identificationTypes handling error: ', error)
                console.log('Identification types available: ', identificationTypes)
            },
            onPaymentMethodsReceived: (error, paymentMethods) => {
                if (error) return console.warn('paymentMethods handling error: ', error)
                console.log('Payment Methods available: ', paymentMethods)
            },
            onIssuersReceived: (error, issuers) => {
                if (error) return console.warn('issuers handling error: ', error)
                console.log('Issuers available: ', issuers)
            },
            onInstallmentsReceived: (error, installments) => {
                if (error) return console.warn('installments handling error: ', error)
                console.log('Installments available: ', installments)
            },
            onCardTokenReceived: (error, token) => {
                if (error) return console.warn('Token handling error: ', error)
                console.log('Token available: ', token)
            },
            onSubmit: (event) => {
                event.preventDefault();
                const cardData = cardForm.getCardFormData();
                console.log('CardForm data available: ', cardData)
            },
            onFetching:(resource) => {
                console.log('Fetching resource: ', resource)

                // Animate progress bar
                const progressBar = document.querySelector('.progress-bar')
                progressBar.removeAttribute('value')

                return () => {
                    progressBar.setAttribute('value', '0')
                }
            },
        }
     })
 </script>
</body>
</html>
```

<br>

## Checkout PRO
Checkout Pro is the integration that allows you to charge through our web form from any device in a simple, fast and secure way.

See the API for [Checkout PRO](#)

<br />

### Full example

```html
<!DOCTYPE html>
<html>
<body>
    <div class="cho-container"></div>
    <script src="https://sdk.mercadopago.com/js/v2"></script>
    <script>
        const mp = new MercadoPago('PUBLIC_KEY', {
            locale: 'en-US'
        })
        const checkout = mp.checkout({
            preference: {
                id: 'YOUR_PREFERENCE_ID'
            }
        });
        checkout.render({
            container: '.cho-container',
            label: 'Pay'
        });
    </script>
</body>
</html>
```

<br>

## Checkout Tokenize
With the Web Tokenize Checkout from Mercado Pago forget the complexity to structure a form for tokenization and payment. This simple integration will provide you with a form with a design and ready front end.

See the API for [Checkout Tokenize](#)

<br />

### Full example

```html
<!DOCTYPE html>
<html>
<body>
    <div class="tokenizer-container"></div>
    <script src="https://sdk.mercadopago.com/js/v2"></script>
    <script>
        const tokenizer = mp.checkout({
            tokenizer: {
                totalAmount: 4000,
                summary: {
                    arrears: 18,
                    taxes: 20,
                    charge: 30,
                    discountLabel: 'discount label',
                    discount: 5,
                    productLabel: 'product label',
                    product: 400,
                    shipping: 10,
                    title: 'summary title',
                },
                savedCards: {
                    cardIds: 'CARD_ID',
                    customerId: 'CUSTOMER_ID'
                },
                installments: {
                    minInstallments: 2,
                    maxInstallments: 9,
                },
                backUrl: 'http://YOUR_URL/process'
            },
            theme: {
                elementsColor: '#2ddc52',
                headerColor: '#2ddc52'
            }
        });
        
        tokenizer.render({
            container: '.tokenizer-container',
            label: 'Pagar'
        });
    </script>
</body>
</html>
```

<br />

## API

### MercadoPago(`public_key`[`, options`])

SDK instantiation method.

#### Params:
`public_key` | *string*, **REQUIRED** 

It is the public key for your account.

<br />
 
`options` | *object*, **OPTIONAL**


|Option name|Values|Default|Type|Description||
|-|-|-|-|-|-|
|`locale` |`es-AR`<br>`es-CL`<br>`es-CO`<br>`es-MX`<br>`es-VE`<br>`es-UY`<br>`es-PE`<br>`pt-BR`<br>`en-US`|Browser default locale | *string* | Set the locale | **OPTIONAL** |
|`advancedFraudPrevention` |`true\|false`| true | *boolean* | Enables/disables device ID fraud prevention system | **OPTIONAL** |

<br />

#### Example:

```javascript
const mp = new MercadoPago('PUBLIC_KEY', {
  locale: 'en-US',
  advancedFraudPrevention: true,
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
const paymentMethods = await mp.getPaymentMethods({ bin: '411111' })
```

#### Return: `PROMISE` (showing most common used results.)

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
| `paymentMethodId` | `STRING` | Payment method ID | **REQUIRED** |
| `bin` | `STRING` | Card number first 6 digits | **REQUIRED** |

<br />

#### Example:

```javascript
const issuers = await mp.getIssuers({ paymentMethodId: 'visa', bin: '4111111' })
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
| `locale` | `STRING` | Set the response message language | **OPTIONAL** |
| `processingMode` | `"aggregator"` \| `"gateway"` | Process mode | **OPTIONAL** |

<br />

#### Example:
```javascript
const installments = await mp.getInstallments({
  amount: '1000',
  locale: 'pt-BR',
  bin: '411111',
  processingMode: 'aggregator'
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
| `cardExpirationMonth` | `STRING` | Expiration month | **REQUIRED** |
| `cardExpirationYear` | `STRING` | Expiration year | **REQUIRED** |
| `securityCode` | `STRING` | Security code | **REQUIRED** |
| `identificationType` | `STRING` | Type of document | **REQUIRED** |
| `identificationNumber` | `STRING` | Value of document | **REQUIRED** |

<br />

#### Example:

```javascript
const cardToken = await mp.createCardToken({
    cardNumber: '5031433215406351' ,
    cardholderName: 'APRO',
    cardExpirationMonth: '11',
    cardExpirationYear: '2025',
    securityCode: '123',
    identificationType: 'CPF',
    identificationNumber: '12345678912',
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
|`cardholderEmail`|`cardFormMap`|`<input>`|Cardholder Email HTML options|**OPTIONAL**|
|`cardNumber`|`cardFormMap`|`<input>`|Card number HTML options|**REQUIRED**|
|`cardExpirationMonth`|`cardFormMap`|`<input>` \| `<select>`|Card expiration month HTML options|**REQUIRED**|
|`cardExpirationYear`|`cardFormMap`|`<input>` \| `<select>`|Card expiration year HTML options|**REQUIRED**|
|`securityCode`|`cardFormMap`|`<input>`|CVV HTML options|**REQUIRED**|
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

<br />

## Checkout PRO

### Initializing the Checkout
To initialize the checkout you need to call the `.checkout` function from the SDK along with some options.

#### Checkout

```javascript
mercadopago.checkout(checkoutParams)
```

##### Params

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
|`summary` | *object* |`title`: *string* <br>`taxes`: *number* <br>`arrears`: *number* <br>`charge`: *number* <br>`discount`: *number* <br>`product`: *number* <br>`shipping`: *number* <br>`discountLabel`: *string* <br>`productLabel`: *string* <br>| Additional taxes and customization for the summary | **OPTIONAL** |
|`backUrl` | *string* || Return URL | **OPTIONAL** |
|`installments` | *object* |`minInstallments`: *number* <br> `maxInstallments`: *number*| Set minimum and maximum number of installments available | **OPTIONAL** |
|`savedCards` | *object* | `cardIds`: *string* <br> `customerId`: *string*| Set default saved cards | **OPTIONAL** |

##### Additional configurations 
Regardless of the product you are trying to render, you can pass some other configurations as params to the `.checkout()` function: 

`theme` | *object* | **OPTIONAL** : Visual customization data.

|Option name|Type|Description|
|-|-|-|
|`elementsColor` | *string* | Checkout elements color (e.g., buttons, labels)|
|`headerColor` | *string* | Color for the checkout header|

`autoOpen` | *boolean* | **OPTIONAL** : If the value is set to `true`, it will trigger the checkout to automatically open as soon as the page loads.

`render` | *object* | **OPTIONAL** : Set the render options right away without needing to call the rendering functions later.
|Option name|Type|Description|
|-|-|-|
|`container` | *string* | Checkout elements color (e.g., buttons, labels)|
|`label`|*string*|Label for the checkout trigger button|
|`type`|*string*|Type for the checkout trigger button|

#### Rendering the Checkout 

##### mercadopago.checkout.`render()`
Renders the Payment Button on a given container. This button has the trigger to open the checkout.

**Params**
|Option name|Type|Description||
|-|-|-|-|
|`container`|*string*|Selector (id, class) for the container element||
|`label`|*string*|Label for the checkout trigger button||
|`type`|*string*|Type for the checkout trigger button||

##### mercadopago.checkout.`open()`
Manually triggers the opening of an iframe element with the checkout.

## Notes

When requesting our SDK (https://sdk.mercadopago.com/js/v2), we may ship different script based on the browser's User Agent so we can optmize the bundle size according to the needs.
For IE 11 we ship polyfills so you can get a better experience when integrating with our SDK
