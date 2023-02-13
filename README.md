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
6. [Checkout Pro](#checkout-pro)
7. [API](#api)
8. [Notes](#notes)

<br />

## About 
It is a **clientside SDK** whose main objective is to **facilitate the integration of Mercado Pago payment solutions on your website**, thus allowing a secure flow and within the security standards of sensitive data transfer.

<br />

## Support

### Desktop web


| Browser | Support |
|---------- | ----------|
| Chrome    | 80+
| Firefox    | 74+
| Safari    | 14+
| Edge | 80+
| Opera | Complete
| Internet Explorer    | 11

<br />

### Mobile web
| Browser | Support |
|---------- | ----------|
| Chrome    | Complete
| Firefox    | Complete
| Safari    | Complete
| Android Browser    | Complete

<br />

## Installation
To install the SDK, you must include script in your application's HTML or install a package on `npm`


```html
<script src="https://sdk.mercadopago.com/js/v2"></script>
```

or

```npm
npm install @mercadopago/sdk-js;
```

<br />

## Initializing
To start the SDK, you need to assign your `public_key` along with some `options`.

If you are using `html` reference:

### Example:

```javascript
const mp = new MercadoPago('YOUR_PUBLIC_KEY', {
  locale: 'en-US',
})
```

If you are using `npm` package:

### Example:

```javascript
import { loadMercadoPago } from '@mercadopago/sdk-js'

await loadMercadoPago();
const mp = new window.MercadoPago('YOUR_PUBLIC_KEY', {
  locale: 'en-US',
})
```

<br/>

## Checkout API
Use our APIs to build your own payment experience on your website or mobile application. From basic to advanced settings, control the entire experience.

There are multiple supported ways to integrate Checkout API. Ranging from the most simple integration, using Checkout Bricks, to integrating with the Core Methods, where the integrator has total control of the checkout experience.

For a complete reference on the integration options, check the [API reference](#api)

<br />

### Full example (using Bricks)

```HTML 
<html>
    <body>
        <div id="cardPaymentBrick_container"></div>
    </body>
</html>
<script src="https://sdk.mercadopago.com/js/v2"></script>


<script>
    const mp = new MercadoPago('YOUR_PUBLIC_KEY');
    const bricksBuilder = mp.bricks();

    const renderCardPaymentBrick = async (bricksBuilder) => {

        const settings = {
            initialization: {
                amount: 100, //value of the payment to be processed
            },
            customization: {
                visual: {
                    style: {
                        theme: 'dark' // 'default' |'dark' | 'bootstrap' | 'flat'
                    } 
                }
            },
            callbacks: {
                onSubmit: (cardFormData) => {
                    return new Promise((resolve, reject) => {
                        fetch("/process_payment", { 
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(cardFormData)
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
                onReady: () => {
                    // handle form ready
                },
                onError: (error) => {
                    // handle error
                }
            }                       
        }

        cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
    };

    renderCardPaymentBrick(bricksBuilder);
</script>

```

### Full example (using cardForm)

```HTML
<!DOCTYPE html>
<html>
    <body>
    <form id="form-checkout" >
    <input type="text" name="cardNumber" id="form-checkout__cardNumber" />
    <input type="text" name="expirationDate" id="form-checkout__expirationDate" />
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
                expirationDate: {
                    id: 'form-checkout__expirationDate',
                    placeholder: 'MM/YYYY'
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
                onError: (error, event) => {
                    console.log(event, error);
                },
                onValidityChange: (error, field) => {
                    if (error) return error.forEach(e => console.log(`${field}: ${e.message}`));
                    console.log(`${field} is valid`);
                },
                onReady: () => {
                    console.log("CardForm ready");
                }
            }
        })
    </script>
    </body>
    </html>

```
## Checkout Pro
Checkout Pro is the integration that allows you to charge through our web form from any device in a simple, fast and secure way.

See the [API reference](#api)

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
|`advancedFraudPrevention` |`true\|false`| true | *boolean* | Set the advanced fraud prevention status | **OPTIONAL** |
|`trackingDisabled` |`true\|false`| false | *boolean* | Enable/disable tracking of generic usage metrics | **OPTIONAL** |

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

Check the reference for all SDK modules.

||
|-|
|[Checkout Bricks](/API/bricks/index.md) |
|[Card Form](/API/card-form.md) |
|[Core Methods](/API/core-methods.md) |
|[Secure Fields](/API/fields.md) |
|[Checkout Pro](/API/checkout-pro.md) |

<br />

---

<br />

## Notes

When requesting our SDK (https://sdk.mercadopago.com/js/v2), we may ship different script based on the browser's User Agent so we can optmize the bundle size according to the needs.
For IE 11 we ship polyfills so you can get a better experience when integrating with our SDK
