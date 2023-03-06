# Checkout PRO

## Initializing the Checkout

To initialize the checkout you need to call the `.bricks` function from the SDK along with some options.

## Checkout

```javascript
mercadopago.bricks(checkoutParams);
```

### Parameters

| Option name      | Type     | Attributes               | Description                  |              |
| ---------------- | -------- | ------------------------ | ---------------------------- | ------------ |
| `initialization` | _object_ | `preferenceId`: _string_ | Payment preference           | **REQUIRED** |
| `initialization` | _object_ | `redirectMode`: _string_ | Customize the opening schema | **OPTIONAL** |

#### Opening scheme

The are three ways to open the checkout experience: redirect on the same tab, which is the default, redirecting to a new tab or using a modal.

| Option name    | value   | Description                                       |
| -------------- | ------- | ------------------------------------------------- |
| `redirectMode` | `self`  | [**Default**] Keeps the redirect on the same page |
| `redirectMode` | `blank` | Makes the redirect to a new page                  |
| `redirectMode` | `modal` | Opens the checkout experience in modal mode       |

### Additional configurations

You can pass some other configurations as params to the `.bricks()` function:

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

The alternative values, which are optional, replaces what it defined by default. To check what the alternative values are, plesse check the [Developers site](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/landing)

##### `customization.visual` | _object_ | **OPTIONAL** : Change button's apperance and style

| Option name         | Type     | Description                         |
| ------------------- | -------- | ----------------------------------- |
| `buttonBackground`  | _string_ | Checkout button label               |
| `buttonHeight`      | _string_ | Displayed below the checkout button |
| `borderRadius`      | _string_ | Checkout button label               |
| `valuePropColor`    | _string_ | Displayed below the checkout button |
| `verticalPadding`   | _string_ | Checkout button label               |
| `horizontalPadding` | _string_ | Displayed below the checkout button |

The alternative values, which are optional, replaces what it defined by default. To check what the alternative values are, plesse check the [Developers site](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/landing)

#### The `callbacks` object

##### `callbacks` | _object_ | **OPTIONAL** : Auxiliary lifecycle callbacks.

| Callback key | Description                                            |              |
| ------------ | ------------------------------------------------------ | ------------ |
| `onSubmit`   | It is called when the user clicks on the button        | **OPTIONAL** |
| `onReady`    | It is called when the button finishes loading.         | **OPTIONAL** |
| `onError`    | It is called when there is an error in the integration | **OPTIONAL** |

#### Rendering the Checkout

##### mercadopago.bricks.`render()`

Renders the Checkout Button on a given container. This button has the trigger to open the checkout.

Parameters

| Option name | Type     | Description                                    | Value    |
| ----------- | -------- | ---------------------------------------------- | -------- |
| `container` | _string_ | Selector (id, class) for the container element | -        |
| `label`     | _string_ | Label for the checkout trigger button          | "wallet" |

##### mercadopago.checkout.`unmount()`

Manually unmounts the the opened iframe element. It can be used to generate a new integration instance.
