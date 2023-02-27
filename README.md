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
