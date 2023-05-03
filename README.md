# SDK MercadoPago.js V2

<br />

## Table of Contents

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

| Browser           | Support  |
| ----------------- | -------- |
| Chrome            | 80+      |
| Firefox           | 74+      |
| Safari            | 14+      |
| Edge              | 80+      |
| Opera             | Complete |
| Internet Explorer | 11       |

<br />

### Mobile web

| Browser         | Support  |
| --------------- | -------- |
| Chrome          | 80+      |
| Firefox         | 74+      |
| Safari          | 13.3+    |
| Android Browser | Complete |

<br />

## Installation

To install the SDK, you must include the script in your application's HTML or install a package on `npm`

```html
<script src="https://sdk.mercadopago.com/js/v2"></script>
```

or

```javascript
npm install @mercadopago/sdk-js;
```

<br />

## Initializing

To start the SDK, you need to assign your `public_key` along with some `options`.

If you are using `html` reference:

### Example:

```javascript
const mp = new MercadoPago("YOUR_PUBLIC_KEY", {
  locale: "en-US",
});
```

If you are using `npm` package:

### Example:

```javascript
import { loadMercadoPago } from "@mercadopago/sdk-js";

await loadMercadoPago();
const mp = new window.MercadoPago("YOUR_PUBLIC_KEY", {
  locale: "en-US",
});
```

<br/>

## Checkout API

Use our APIs to build your own payment experience on your website or mobile application. From basic to advanced settings, control the entire experience.

There are multiple supported ways to integrate Checkout API. Ranging from the most simple integration, using Checkout Bricks, to integrating with the Core Methods, where the integrator has total control of the checkout experience.

For a complete reference on the integration options, check the [API reference](#api)

<br />
<details>
  <summary>Full example using Bricks</summary>

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
                        .then(resp => resp.json())
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

</details>

<details>
  <summary>Full example using cardForm</summary>

```HTML
<style>
#form-checkout {
  display: flex;
  flex-direction: column;
  max-width: 600px;
}

.container {
  height: 18px;
  display: inline-block;
  border: 1px solid rgb(118, 118, 118);
  border-radius: 2px;
  padding: 1px 2px;
}
</style>
<form id="form-checkout">
<div id="form-checkout__cardNumber" class="container"></div>
<div id="form-checkout__expirationDate" class="container"></div>
<div id="form-checkout__securityCode" class="container"></div>
<input type="text" id="form-checkout__cardholderName" />
<select id="form-checkout__issuer"></select>
<select id="form-checkout__installments"></select>
<select id="form-checkout__identificationType"></select>
<input type="text" id="form-checkout__identificationNumber" />
<input type="email" id="form-checkout__cardholderEmail" />

<button type="submit" id="form-checkout__submit">Pagar</button>
<progress value="0" class="progress-bar">Carregando...</progress>
</form>

<script src="https://sdk.mercadopago.com/js/v2"></script>
<script>
const mp = new MercadoPago('PUBLIC_KEY', {
    locale: 'en-US'
})
const cardForm = mp.cardForm({
  amount: "100.5",
  iframe: true,
  form: {
    id: "form-checkout",
    cardNumber: {
      id: "form-checkout__cardNumber",
      placeholder: "Card number",
    },
    expirationDate: {
      id: "form-checkout__expirationDate",
      placeholder: "MM/YYYY",
    },
    securityCode: {
      id: "form-checkout__securityCode",
      placeholder: "CVV",
    },
    cardholderName: {
      id: "form-checkout__cardholderName",
      placeholder: "Cardholder name",
    },
    issuer: {
      id: "form-checkout__issuer",
      placeholder: "Issuer",
    },
    installments: {
      id: "form-checkout__installments",
      placeholder: "Total installments",
    },
    identificationType: {
      id: "form-checkout__identificationType",
      placeholder: "Document type",
    },
    identificationNumber: {
      id: "form-checkout__identificationNumber",
      placeholder: "Document number",
    },
    cardholderEmail: {
      id: "form-checkout__cardholderEmail",
      placeholder: "Email",
    },
  },
  callbacks: {
    onFormMounted: error => {
      if (error) return console.warn("Form Mounted handling error: ", error);
      console.log("Form mounted");
    },
    onSubmit: event => {
      event.preventDefault();

      const {
        paymentMethodId: payment_method_id,
        issuerId: issuer_id,
        cardholderEmail: email,
        amount,
        token,
        installments,
        identificationNumber,
        identificationType,
      } = cardForm.getCardFormData();

      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          issuer_id,
          payment_method_id,
          transaction_amount: Number(amount),
          installments: Number(installments),
          description: "Product description",
          payer: {
            email,
            identification: {
              type: identificationType,
              number: identificationNumber,
            },
          },
        }),
      });
    },
    onFetching: (resource) => {
      console.log("Fetching resource: ", resource);

      // Animate progress bar
      const progressBar = document.querySelector(".progress-bar");
      progressBar.removeAttribute("value");

      return () => {
        progressBar.setAttribute("value", "0");
      };
    }
  },
});

</script>

```

</details>
</br>

## Checkout Pro

Checkout Pro is the integration that allows you to charge through our web form from any device in a simple, fast and secure way.

See the [API reference](#api)

<details>
  <summary>Full example using Checkout Pro</summary>

```html
<!DOCTYPE html>
<html>
  <body>
    <div class="cho_container"></div>
    <script src="https://sdk.mercadopago.com/js/v2"></script>
    <script>
      const mp = new MercadoPago("PUBLIC_KEY", { locale: "en-US" });
      const walletBuilder = mp.bricks();
      const renderComponent = async (walletBuilder) => {
        const settings = {
          initialization: {
            preferenceId: "<PREFERENCE_ID>",
          },
        };
        const walletController = await walletBuilder.create(
          "wallet",
          "cho_container",
          settings
        );
      };
      renderComponent(walletBuilder);
    </script>
  </body>
</html>
```

</details>
<br />

## API

### MercadoPago(`public_key`[`, options`])

SDK instantiation method.

#### Params:

`public_key` | _string_, **REQUIRED**

It is the public key for your account.

<br />
 
`options` | *object*, **OPTIONAL**

| Option name               | Values                                                                                          | Default                | Type      | Description                                      |              |
| ------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | --------- | ------------------------------------------------ | ------------ |
| `locale`                  | `es-AR`<br>`es-CL`<br>`es-CO`<br>`es-MX`<br>`es-VE`<br>`es-UY`<br>`es-PE`<br>`pt-BR`<br>`en-US` | Browser default locale | _string_  | Set the locale                                   | **OPTIONAL** |
| `advancedFraudPrevention` | `true\|false`                                                                                   | true                   | _boolean_ | Set the advanced fraud prevention status         | **OPTIONAL** |
| `trackingDisabled`        | `true\|false`                                                                                   | false                  | _boolean_ | Enable/disable tracking of generic usage metrics | **OPTIONAL** |

<br />

#### Example:

```javascript
const mp = new MercadoPago("PUBLIC_KEY", {
  locale: "en-US",
  advancedFraudPrevention: true,
});
```

<br />

#### Return: `mp instance`

Check the reference for all SDK modules.

|                                         |
| --------------------------------------- |
| [Checkout Bricks](/API/bricks/index.md) |
| [Card Form](/API/card-form.md)          |
| [Core Methods](/API/core-methods.md)    |
| [Secure Fields](/API/fields.md)         |
| [Checkout Pro](/API/checkout-pro.md)    |

<br />

---

<br />

## React library

The [React SDK library](https://github.com/mercadopago/sdk-react) makes the integration even easier. It is a wrapper that allows integrate Checkout Bricks easily inside React projects.

> Currently available for Checkout Pro and Checkout Bricks

```js
import { initMercadoPago } from "@mercadopago/sdk-react";

initMercadoPago("YOUR_PUBLIC_KEY");
```

## Notes

When requesting our SDK (https://sdk.mercadopago.com/js/v2), we may ship different script based on the browser's User Agent so we can optmize the bundle size according to the needs.
For IE 11 we ship polyfills so you can get a better experience when integrating with our SDK
