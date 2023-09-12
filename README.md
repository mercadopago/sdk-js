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
6. [Bricks](#bricks)
7. [Checkout Pro](#checkout-pro)
8. [API](#api)
9. [Notes](#notes)

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


### Bricks
A modular, secure and customizable payment solution, where you control the entire experience and choose which brick and layout to use based on your site’s needs.
#### Live Demo: 

| Brick               | Description                         | Documentation |
|-----------------------|-------------------------------------|----------------|
| Card Payment Brick   | Card Payment Brick offers a payment form with an optimized design and different themes, providing all the necessary fields to make a payment with a credit and/or debit card, and includes the necessary mechanisms to automatically receive the necessary data to create the payment in the back end. | [🇦🇷 Argentina](https://www.mercadopago.com.ar/developers/es/live-demo/card-payment-brick)<br/>[🇧🇷 Brazil](https://www.mercadopago.com.br/developers/pt/live-demo/card-payment-brick)<br/>[🇨🇱 Chile](https://www.mercadopago.cl/developers/es/live-demo/card-payment-brick)<br/>[🇨🇴 Colombia](https://www.mercadopago.com.co/developers/es/live-demo/card-payment-brick)<br/>[🇲🇽 Mexico](https://www.mercadopago.com.mx/developers/es/live-demo/card-payment-brick)<br/>[🇵🇪 Peru](https://www.mercadopago.com.pe/developers/es/live-demo/card-payment-brick)<br/>[🇺🇾 Uruguay](https://www.mercadopago.com.uy/developers/es/live-demo/card-payment-brick) |
| Payment Brick         | Payment Brick is a modular and customizable solution that allows you to add several payment methods to your store with just one Brick, allowing you to save card data for future purchases. By using Payment Brick, you will have different payment methods at your disposal and you will be able to choose which ones to enable for your site. | [🇦🇷 Argentina](https://www.mercadopago.com.ar/developers/es/live-demo/payment-brick)<br/>[🇧🇷 Brazil](https://www.mercadopago.com.br/developers/pt/live-demo/payment-brick)<br/>[🇨🇱 Chile](https://www.mercadopago.cl/developers/es/live-demo/payment-brick)<br/>[🇨🇴 Colombia](https://www.mercadopago.com.co/developers/es/live-demo/payment-brick)<br/>[🇲🇽 Mexico](https://www.mercadopago.com.mx/developers/es/live-demo/payment-brick)<br/>[🇵🇪 Peru](https://www.mercadopago.com.pe/developers/es/live-demo/payment-brick)<br/>[🇺🇾 Uruguay](https://www.mercadopago.com.uy/developers/es/live-demo/payment-brick) |
| Wallet                | Wallet Brick allows you to offer payments from your Mercado Pago account at any stage of the purchase process. | [🇦🇷 Argentina](https://www.mercadopago.com.ar/developers/es/live-demo/wallet-brick)<br/>[🇧🇷 Brazil](https://www.mercadopago.com.br/developers/pt/live-demo/wallet-brick)<br/>[🇨🇱 Chile](https://www.mercadopago.cl/developers/es/live-demo/wallet-brick)<br/>[🇨🇴 Colombia](https://www.mercadopago.com.co/developers/es/live-demo/wallet-brick)<br/>[🇲🇽 Mexico](https://www.mercadopago.com.mx/developers/es/live-demo/wallet-brick)<br/>[🇵🇪 Peru](https://www.mercadopago.com.pe/developers/es/live-demo/wallet-brick)<br/>[🇺🇾 Uruguay](https://www.mercadopago.com.uy/developers/es/live-demo/wallet-brick) |
| Status Screen Bricks  | The Status Screen Brick allows you to show the buyer the status of a purchase made with any payment method provided by Checkout Bricks. | [🇦🇷 Argentina](https://www.mercadopago.com.ar/developers/es/live-demo/status-screen-brick)<br/>[🇧🇷 Brazil](https://www.mercadopago.com.br/developers/pt/live-demo/status-screen-brick)<br/>[🇨🇱 Chile](https://www.mercadopago.cl/developers/es/live-demo/status-screen-brick)<br/>[🇨🇴 Colombia](https://www.mercadopago.com.co/developers/es/live-demo/status-screen-brick)<br/>[🇲🇽 Mexico](https://www.mercadopago.com.mx/developers/es/live-demo/status-screen-brick)<br/>[🇵🇪 Peru](https://www.mercadopago.com.pe/developers/es/live-demo/status-screen-brick)<br/>[🇺🇾 Uruguay](https://www.mercadopago.com.uy/developers/es/live-demo/status-screen-brick) |

<br />

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
  <summary>Full example using Core Methods</summary>

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
  <form id="form-checkout" action="/process_payment" method="POST">
    <div id="form-checkout__cardNumber" class="container"></div>
    <div id="form-checkout__expirationDate" class="container"></div>
    <div id="form-checkout__securityCode" class="container"></div>
    <input type="text" id="form-checkout__cardholderName" placeholder="Titular do cartão" />
    <select id="form-checkout__issuer" name="issuer">
      <option value="" disabled selected>Banco emissor</option>
    </select>
    <select id="form-checkout__installments" name="installments">
      <option value="" disabled selected>Parcelas</option>
    </select>
    <select id="form-checkout__identificationType" name="identificationType">
      <option value="" disabled selected>Tipo de documento</option>
    </select>
    <input type="text" id="form-checkout__identificationNumber" name="identificationNumber" placeholder="Número do documento" />
    <input type="email" id="form-checkout__email" name="email" placeholder="E-mail" />

    <input id="token" name="token" type="hidden">
    <input id="paymentMethodId" name="paymentMethodId" type="hidden">
    <input id="transactionAmount" name="transactionAmount" type="hidden" value="100">
    <input id="description" name="description" type="hidden" value="Nome do Produto">

    <button type="submit" id="form-checkout__submit">Pagar</button>
  </form>

            
<script>
  const mp = new MercadoPago("YOUR_PUBLIC_KEY");
</script>

  
  <script>
        const cardNumberElement = mp.fields.create('cardNumber', {
      placeholder: "Número do cartão"
    }).mount('form-checkout__cardNumber');
    const expirationDateElement = mp.fields.create('expirationDate', {
      placeholder: "MM/YY",
    }).mount('form-checkout__expirationDate');
    const securityCodeElement = mp.fields.create('securityCode', {
      placeholder: "Código de segurança"
    }).mount('form-checkout__securityCode');




    (async function getIdentificationTypes() {
      try {
        const identificationTypes = await mp.getIdentificationTypes();
        const identificationTypeElement = document.getElementById('form-checkout__identificationType');

        createSelectOptions(identificationTypeElement, identificationTypes);
      } catch (e) {
        return console.error('Error getting identificationTypes: ', e);
      }
    })();

    function createSelectOptions(elem, options, labelsAndKeys = { label: "name", value: "id" }) {
      const { label, value } = labelsAndKeys;

      elem.options.length = 0;

      const tempOptions = document.createDocumentFragment();

      options.forEach(option => {
        const optValue = option[value];
        const optLabel = option[label];

        const opt = document.createElement('option');
        opt.value = optValue;
        opt.textContent = optLabel;

        tempOptions.appendChild(opt);
      });

      elem.appendChild(tempOptions);
    }




    const paymentMethodElement = document.getElementById('paymentMethodId');
    const issuerElement = document.getElementById('form-checkout__issuer');
    const installmentsElement = document.getElementById('form-checkout__installments');

    const issuerPlaceholder = "Banco emissor";
    const installmentsPlaceholder = "Parcelas";

    let currentBin;
    cardNumberElement.on('binChange', async (data) => {
      const { bin } = data;
      try {
        if (!bin && paymentMethodElement.value) {
          clearSelectsAndSetPlaceholders();
          paymentMethodElement.value = "";
        }

        if (bin && bin !== currentBin) {
          const { results } = await mp.getPaymentMethods({ bin });
          const paymentMethod = results[0];

          paymentMethodElement.value = paymentMethod.id;
          updatePCIFieldsSettings(paymentMethod);
          updateIssuer(paymentMethod, bin);
          updateInstallments(paymentMethod, bin);
        }

        currentBin = bin;
      } catch (e) {
        console.error('error getting payment methods: ', e)
      }
    });

    function clearSelectsAndSetPlaceholders() {
      clearHTMLSelectChildrenFrom(issuerElement);
      createSelectElementPlaceholder(issuerElement, issuerPlaceholder);

      clearHTMLSelectChildrenFrom(installmentsElement);
      createSelectElementPlaceholder(installmentsElement, installmentsPlaceholder);
    }

    function clearHTMLSelectChildrenFrom(element) {
      const currOptions = [...element.children];
      currOptions.forEach(child => child.remove());
    }

    function createSelectElementPlaceholder(element, placeholder) {
      const optionElement = document.createElement('option');
      optionElement.textContent = placeholder;
      optionElement.setAttribute('selected', "");
      optionElement.setAttribute('disabled', "");

      element.appendChild(optionElement);
    }

    // Esta etapa melhora as validações cardNumber e securityCode
    function updatePCIFieldsSettings(paymentMethod) {
      const { settings } = paymentMethod;

      const cardNumberSettings = settings[0].card_number;
      cardNumberElement.update({
        settings: cardNumberSettings
      });

      const securityCodeSettings = settings[0].security_code;
      securityCodeElement.update({
        settings: securityCodeSettings
      });
    }



    async function updateIssuer(paymentMethod, bin) {
      const { additional_info_needed, issuer } = paymentMethod;
      let issuerOptions = [issuer];

      if (additional_info_needed.includes('issuer_id')) {
        issuerOptions = await getIssuers(paymentMethod, bin);
      }

      createSelectOptions(issuerElement, issuerOptions);
    }

    async function getIssuers(paymentMethod, bin) {
      try {
        const { id: paymentMethodId } = paymentMethod;
        return await mp.getIssuers({ paymentMethodId, bin });
      } catch (e) {
        console.error('error getting issuers: ', e)
      }
    };



    async function updateInstallments(paymentMethod, bin) {
      try {
        const installments = await mp.getInstallments({
          amount: document.getElementById('transactionAmount').value,
          bin,
          paymentTypeId: 'credit_card'
        });
        const installmentOptions = installments[0].payer_costs;
        const installmentOptionsKeys = { label: 'recommended_message', value: 'installments' };
        createSelectOptions(installmentsElement, installmentOptions, installmentOptionsKeys);
      } catch (error) {
        console.error('error getting installments: ', e)
      }
    }



    const formElement = document.getElementById('form-checkout');
    formElement.addEventListener('submit', createCardToken);

    async function createCardToken(event) {
      try {
        const tokenElement = document.getElementById('token');
        if (!tokenElement.value) {
          event.preventDefault();
          const token = await mp.fields.createCardToken({
            cardholderName: document.getElementById('form-checkout__cardholderName').value,
            identificationType: document.getElementById('form-checkout__identificationType').value,
            identificationNumber: document.getElementById('form-checkout__identificationNumber').value,
          });
          tokenElement.value = token.id;
          formElement.requestSubmit();
        }
      } catch (e) {
        console.error('error creating card token: ', e)
      }
    }

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
