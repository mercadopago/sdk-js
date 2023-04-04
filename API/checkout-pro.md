# Checkout PRO

## Initializing the Checkout

To initialize the checkout you need to call the `.bricks()` and then `.create` function from the SDK along with some parameters

`.create("wallet", "<DOM_CONTAINER>", settings)`

| Parameter         | Type     | Description                                                                |
| ----------------- | -------- | -------------------------------------------------------------------------- |
| `wallet`          | _string_ | Defines the checkout experience. This value is fixed.                      |
| `<DOM_CONTAINER>` | _string_ | The identifier of the element where the payment button should be displayed |
| `settings`        | _object_ | Include additional configurations such as `initialization` options         |

## Checkout

```javascript
mercadopago.bricks().create("wallet", "<DOM_CONTAINER>", {
  initialization: {
    preferenceId: "<PREFERENCE_ID>",
  },
});
```

> Returns: `Promise<CONTROLLER>`. [See more](#rendering-the-checkout)

### Parameters

| Option name      | Type     | Attributes               | Description                  |              |
| ---------------- | -------- | ------------------------ | ---------------------------- | ------------ |
| `initialization` | _object_ | `preferenceId`: _string_ | Payment preference           | **REQUIRED** |
| `initialization` | _object_ | `redirectMode`: _string_ | Customize the opening schema | **OPTIONAL** |

#### Opening scheme

There are three ways to open the checkout experience: redirect on the same tab, which is the default, redirecting to a new tab or using a modal.

| Option name    | value   | Description                                       |
| -------------- | ------- | ------------------------------------------------- |
| `redirectMode` | `self`  | [**Default**] Keeps the redirect on the same page |
| `redirectMode` | `blank` | Makes the redirect to a new page                  |
| `redirectMode` | `modal` | Opens the checkout experience in modal mode       |

<details>
  <summary>HTML/JS</summary>

```javascript
mercadopago.bricks().create("wallet", "<DOM_CONTAINER>", {
  initialization: {
    preferenceId: "<PREFERENCE_ID>",
    redirectMode: "modal",
  },
});
```

</details>

<details>
  <summary>ReactJS</summary>

```jsx
<Wallet
  initialization={{ preferenceId: "<PREFERENCE_ID>", redirectMode: "modal" }}
/>
```

</details>

### Additional configurations

You can pass some other configurations as params to the `.create` function:

#### The `customization` object

##### `customization.checkout.theme` | _object_ | **OPTIONAL** : Visual customization data.

| Option name     | Type     | Description                                     |
| --------------- | -------- | ----------------------------------------------- |
| `elementsColor` | _string_ | Checkout elements color (e.g., buttons, labels) |
| `headerColor`   | _string_ | Color for the checkout header                   |

##### `customization.texts` | _object_ | **OPTIONAL** : Display alternative labels on button

| Option name | Type     | Description                         |
| ----------- | -------- | ----------------------------------- |
| `action`    | _string_ | Checkout button label               |
| `valueProp` | _string_ | Displayed below the checkout button |

The alternative values, which are optional, override the default. To check alternatives values, see the [developers site](https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/modify-texts)

##### `customization.visual` | _object_ | **OPTIONAL** : Change button's apperance and style

| Option name         | Type     | Description                                                                                     |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `buttonBackground`  | _string_ | Checkout button background. Available options: `default`, `black`, `blue`, `white`.             |
| `buttonHeight`      | _string_ | Checkout button height. Default is `48px`                                                       |
| `borderRadius`      | _string_ | Checkout button border radius. Default is `6px`.                                                |
| `valuePropColor`    | _string_ | Checkout button value prop color. Available options: `grey`, `white` and the default is `grey`. |
| `verticalPadding`   | _string_ | Checkout button vertical padding. Default is `16px`                                             |
| `horizontalPadding` | _string_ | Checkout button horizontal padding. Default is `16px`                                           |

The alternative values, which are optional, override the default. To check alternatives values, see the [developers site](https://www.mercadopago.com.br/developers/en/docs/checkout-bricks/wallet-brick/additional-customization/modify-appearance)

#### The `callbacks` object

##### `callbacks` | _object_ | **OPTIONAL** : Auxiliary lifecycle callbacks.

| Callback key | Description                                            |              |
| ------------ | ------------------------------------------------------ | ------------ |
| `onSubmit`   | It is called when the user clicks on the submit button | **OPTIONAL** |
| `onReady`    | It is called when the button finishes loading.         | **OPTIONAL** |
| `onError`    | It is called when there is an error in the integration | **OPTIONAL** |

#### Rendering the Checkout

##### mercadopago.bricks.`create()`

Renders the Checkout Button in a given container. This button has the trigger to open the checkout.

##### controller. `unmount()`

<details>
  <summary>Unmount example</summary>

```javascript
const bricksBuilder = mp.bricks();
const renderComponent = async (bricksBuilder) => {
  const settings = {
    initialization: {
      preferenceId: "<PREFERENCE_ID>",
    },
  };
  window.brickController = await bricksBuilder.create(
    "wallet",
    "wallet_container",
    settings
  );
};
renderComponent(bricksBuilder);

// Somewhere in your flow
controller.unmount();
```

</details>

Manually unmounts the opened iframe element. It can be used to generate a new integration instance.

### Integration examples

<details>
  <summary>HTML/JS</summary>

```js
<div class="component_container"></div>
<script src="https://sdk.mercadopago.com/js/v2"></script>
<script>
 const mercadopago = new MercadoPago('YOUR_PUBLIC_KEY')
 const bricksBuilder = mercadopago.bricks();
 const renderComponent = async (bricksBuilder) => {
   const settings = {
     initialization: {
       preferenceId: '<PREFERENCE_ID>'
     },
   };
   const controller = await bricksBuilder.create(
     'wallet',
     'component_container',
     settings
   );

 };
 renderComponent(bricksBuilder);
</script>
```

</details>

<details>
  <summary>ReactJS</summary>

```jsx
import { initMercadoPago, Wallet } from '@mercadopago/sdk-js'
initMercadoPago('YOUR_PUBLIC_KEY');

<Wallet initialization={preferenceId: "<PREFERENCE_ID>"} />
```

</details>
