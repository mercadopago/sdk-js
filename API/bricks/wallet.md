## `BricksBuilder`.create(`brick`, `target`, `settings`)

Returns: `Promise<BRICK CONTROLLER>` [See more about Brick Controller](#brick-controller)

> **ATTENTION:** Wallet Brick has two ways of integration, one is sending the preference on initialization, and the other is sending the preference at the moment of submit (callback `onSubmit`). You must choose only one way of integration.

<br />

Example of sending the preference on initialization:

> When sending the `preferenceId` on initialization, the callbacks are optional

```js
// HTML/JS
mp.bricks().create("wallet", "walletBrick_container", {
  initialization: {
    preferenceId: "<PREFERENCE_ID>", // preferenceId generated in the backend
  },
});
```

```jsx
// React/JSX
const App = () => {
  return (
    <Wallet
      initialization={{
        preferenceId: "PREFERENCE_ID", // preferenceId generated in the backend
      }}
    />
  );
};
```

<br />

Example of sending the preference in callback `onSubmit`:

> When not sending the `preferenceId` on initialization, the `onSubmit` callback become mandatory, since the preference is expected to be created on it.

```js
// HTML/JS
mp.bricks().create("wallet", "walletBrick_container", {
  callbacks: {
    onSubmit: () => {
      // Callback called when clicking Wallet Brick.
      // This is possible because the brick is a button.
      // At this time of submit, you must create the preference.
      const yourRequestBodyHere = {
        items: [{
          id: "202809963",
          title: "Dummy title",
          description: "Dummy description",
          quantity: 1,
          unit_price: 10,
          }],
        purpose: "wallet_purchase",
      };

      return new Promise((resolve, reject) => {
        fetch("/create_preference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(yourRequestBodyHere),
        })
        .then((resp) => resp.json())
        .then((response) => {
          // Resolve the promise with the Preference ID
          resolve(response.preference_id);
        })
        .catch((error) => {
          // Handle error response when trying to create the preference
          reject();
        });
      });
    }
  },
});
```

```jsx
// React/JSX
const App = () => {
  return (
    <Wallet
      initialization={{ redirectMode: "self" }}
      onSubmit={() => {
        // Callback called when clicking Wallet Brick.
        // This is possible because the brick is a button.
        // At this time of submit, you must create the preference.
        const yourRequestBodyHere = {
          items: [
            {
              id: "202809963",
              title: "Dummy title",
              description: "Dummy description",
              quantity: 1,
              unit_price: 10,
            },
          ],
          purpose: "wallet_purchase",
        };

        return new Promise((resolve, reject) => {
          fetch("/create_preference", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(yourRequestBodyHere),
          })
            .then((resp) => resp.json())
            .then((response) => {
              // Resolve the promise with the Preference ID
              resolve(response.preference_id);
            })
            .catch((error) => {
              // Handle error response when trying to create the preference
              reject();
            });
        });
      }}
    />
  );
};
```

<br />

### **Parameters**

`brick` | _string_, **REQUIRED**

Selected Brick. Possible values are: `wallet`.

`target` | _string_, **REQUIRED**

Id of the container that the brick will be rendered in. Can be any HTML element.

`settings` | _object_, **REQUIRED**

The `settings` object has properties to initialize and customize the brick being created.

| Setting key      | Type     | Description                                                      |               |
| ---------------- | -------- | ---------------------------------------------------------------- | ------------- |
| `initialization` | `object` | Defines the initialization data. [See more](#initialization)     | **REQUIRED¹** |
| `callbacks`      | `object` | Defines the callback functions. [See more](#auxiliary-callbacks) | **REQUIRED²** |
| `customization`  | `object` | Defines custom properties. [See more](#customization)            | **OPTIONAL**  |
| `locale`         | `string` | Defines locale.                                                  | **OPTIONAL**  |

¹ **Required** when integrating through the flow that sends the **preference on initialization**

² **Required** when integrating through the flow that creates the **preference on submit**

<br />

### **Initialization**

Initialization is an object with the properties the brick will initialize with.

| Initialization key | Type     | Description                                                                 |               |
| ------------------ | -------- | --------------------------------------------------------------------------- | ------------- |
| `preferenceId`     | `string` | Preference generated in the backend                                         | **OPTIONAL³** |
| `redirectMode`     | `string` | Indicates how the experience will be conducted. [See more](#opening-scheme) | **REQUIRED**  |

³ **Optional** when integrating through the flow that creates the preference on submit

<br />

### **Callbacks**

The callbacks object contains the auxiliary callbacks functions the brick will call during its life cycle.

| Callback key | Description                                      |               | Params       | Returns         |
| ------------ | ------------------------------------------------ | ------------- | ------------ | --------------- |
| `onSubmit`   | It is called when the user clicks on the brick   | **REQUIRED⁴** | `void`       | `Promise<void>` |
| `onReady`    | It is called when the brick finishes loading.    | **OPTIONAL**  | `void`       | `void`          |
| `onError`    | It is called when there is an error in the brick | **OPTIONAL**  | `BrickError` | `void`          |

⁴ **Required** when integrating through the flow that creates the **preference on submit**

<br />

### **Customization**

Customizations object is used to load Brick under different conditions.

| Customization key          | Type      | Description                                                                                                                                    |              |
| -------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `texts`                    | `object`  | Controls the texts of the brick.                                                                                                               | **OPTIONAL** |
| `texts.action`             | `string`  | Defines the call to action text. Options available: `pay`, `buy`. Default is `pay`.                                                            | **OPTIONAL** |
| `texts.valueProp`          | `string`  | Defines the value prop. Options available: `practicality`, `convenience`, `security_details`, `security_safety`. Default is `security_safety`. | **OPTIONAL** |
| `visual`                   | `object`  | Controls visual aspects of the brick.                                                                                                          | **OPTIONAL** |
| `visual.buttonBackground`  | `string`  | Defines the brick background color. Available options: `default`, `black`, `blue`, `white`. Default is `default`.                              | **OPTIONAL** |
| `visual.buttonHeight`      | `string`  | Defines the brick height. Default is `48px`. Min: `48px`. Max: free choice.                                                                    | **OPTIONAL** |
| `visual.borderRadius`      | `string`  | Defines the brick border radius. Default is `6px`.                                                                                             | **OPTIONAL** |
| `visual.valuePropColor`    | `string`  | Defines the value prop color. Available options: `grey`, `white`. Default is `grey`.                                                           | **OPTIONAL** |
| `visual.verticalPadding`   | `string`  | Defines the brick vertical padding. Default is `16px`. Min: `8px`. Max: free choice.                                                           | **OPTIONAL** |
| `visual.horizontalPadding` | `string`  | Defines the brick horizontal padding. Default is `0px`. Min: `0px`. Max: free choice.                                                          | **OPTIONAL** |
| `visual.hideValueProp`     | `boolean` | Hides the value prop text. Default is `false`.                                                                                                 | **OPTIONAL** |

---

<br>

### **Opening scheme**

There are three ways to open the checkout experience: redirect on the same tab, which is the default, redirecting to a new tab or using a modal.

| Parameter      | value   | Description                                 |
| -------------- | ------- | ------------------------------------------- |
| `redirectMode` | `self`  | Keeps the redirect on the same page         |
| `redirectMode` | `blank` | Makes the redirect to a new page            |
| `redirectMode` | `modal` | Opens the checkout experience in modal mode |

<details>
  <summary>HTML/JS example</summary>

```js
mp.bricks().create("wallet", "walletBrick_container", {
  initialization: {
    preferenceId: "<PREFERENCE_ID>", // preferenceId generated in the backend
    redirectMode: "modal", // default value is 'self'
  },
});
```

</details>

<details>
  <summary>ReactJS example</summary>

```jsx
const App = () => {
  return (
    <Wallet
      initialization={{
        preferenceId: "PREFERENCE_ID", // preferenceId generated in the backend
        redirectMode: "modal", // default value is 'self'
      }}
    />
  );
};
```

</details>

---

<br />

### `BrickError` example

```ts
{
  type: "non_critical" | "critical";
  message: string;
  cause: ErrorCause;
}
```

### The `ErrorCause`s

```ts
{
  ("already_initialized");
  ("container_not_found");
  ("get_preference_details_failed");
  ("incorrect_initialization");
  ("invalid_sdk_instance");
  ("missing_container_id");
  ("missing_locale_property");
  ("missing_required_callbacks");
  ("missing_texts");
  ("no_preference_provided");
  ("settings_empty");
}
```

### **Colors style**

Wallet Brick allows you to personalize the color style of its interface elements, customizing the way it will be displayed to the user.

- Only applicable to **Mercado Pago Wallet** payment method
- Exclusive for the **modal** opening scheme
- Color attributes must be in **hexadecimal** format

<details>
  <summary>HTML/JS example</summary>

```js
mp.bricks().create("wallet", "walletBrick_container", {
  initialization: {
    preferenceId: "<PREFERENCE_ID>",
    redirectMode: "blank",
  },
  customization: {
    checkout: {
      theme: {
        elementsColor: "#4287F5",
        headerColor: "#4287F5",
      },
    },
  },
});
```

</details>

<details>
  <summary>ReactJS example</summary>

```JSX
<Wallet
  initialization={{ preferenceId: '<PREFERENCE_ID>', redirectMode: 'blank' }}
  customization={{
    checkout: {
      theme: {
        elementsColor: '#4287F5',
        headerColor: '#4287F5'
      },
    },
 }}
/>
```

</details>

<br />

## **Brick Controller**

The Brick Controller contains methods that allow the integrator to interact with the rendered Brick.

|         |            |
| ------- | ---------- |
| unmount | **METHOD** |

### `Brick Controller`.unmount()

The `unmount` methods removes the rendered Brick from the page.

#### Params

None.

#### Returns

`void`

<details>
  <summary>Unmount example</summary>

```javascript
const controller = await mercadopago
  .bricks()
  .create("wallet", "<DOM_CONTAINER>", {
    initialization: {
      preferenceId: "<PREFERENCE_ID>",
    },
  });

// Somewhere in your flow
controller.unmount();
```

</details>
</br>

### A note about the purpose of the preference

When creating the preference in the backend, you can (optionally) configure a field called `purpose`, which can be `wallet_purchase` or `onboarding_credits`, learn more about the differences between them:

- `wallet_purchase`: users must log in when redirected to their Mercado Pago account.
- `onboarding_credits`: after logging in, the user will see the pre-selected credit payment option in his Mercado Pago account.
