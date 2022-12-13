> **ATTENTION:** Wallet Brick has two ways of integration, one is sending the preference on initialization, and the other is sending the preference at the moment of submit (callback `onSubmit`). You must choose only one way of integration.

<br />

## `BricksBuilder`.create(`brick`, `target`, `settings`)

### Returns: `Promise<BRICK CONTROLLER>`

[See more about Brick Controller](#brick-controller)

<br />

Example of sending the preference on initialization:

```js
mp.bricks().create("wallet", "walletBrick_container", {
  initialization: {
    preferenceId: "<PREFERENCE_ID>", // preferenceId generated in the backend
  },
  callbacks: {
    onReady: () => {
      // Callback called when the brick is ready.
      // Here you can hide loadings from your site, for example.
    },
    onSubmit: () => {
      // Callback called when clicking on Wallet Brick.
      // This is possible because the brick is a button.
    },
    onError: (error) => {
      // Callback called for all brick error cases
      console.error(error);
    },
  },
});
```

<br />

Example of sending the preference in callback `onSubmit`:

```js
mp.bricks().create("wallet", "walletBrick_container", {
  callbacks: {
    onReady: () => {
      // Callback called when the brick is ready.
      // Here you can hide loadings from your site, for example.
    },
    onSubmit: () => {
      // Callback called when clicking Wallet Brick.
      // This is possible because the brick is a button.
      // At this time of submit, you must create the preference.
      const yourRequestBodyHere = {
        items: [
          id: "202809963",
          title: "Dummy title",
          description: "Dummy description",
          quantity: 1,
          unit_price: 10,
        ],
        purpose: "wallet_purchase"
      };

      return new Promise((resolve, reject) => {
        fetch("/create_preference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(yourRequestBodyHere)
        })
        .then((response) => {
          // Resolve the promise with the Preference ID
          resolve(response.preference_id);
        })
        .catch((error) => {
          // Handle error response when trying to create the preference
          reject();
        })
      });
    },
    onError: (error) => {
      // Callback called for all brick error cases
      console.error(error);
    },
  },
});
```

<br />

### Params:

<br />

`brick` | _string_, **REQUIRED**

Selected Brick. Possible values are: `wallet`.

<br />

`target` | _string_, **REQUIRED**

Id of the container that the brick will be rendered in. Can be any HTML element.

<br />

`settings` | _object_, **REQUIRED**

The `settings` object has properties to initialize and customize the brick being created.

| Setting key      | Type     | Description                                                  |                                                                                                          |
| ---------------- | -------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `initialization` | `object` | Defines the initialization data. [See more](#initialization) | **Only required if you chose to integrate through the flow that sends the preference on initialization** |
| `callbacks`      | `object` | Defines the callback functions. [See more](#callbacks)       | **REQUIRED**                                                                                             |
| `customization`  | `object` | Defines custom properties. [See more](#customization)        | **OPTIONAL**                                                                                             |
| `locale`         | `string` | Defines locale.                                              | **OPTIONAL**                                                                                             |

<br />

#### Initialization

<br />

Initialization is an object with the properties the brick will initialize with.

| Initialization key | Type     | Description                         |              |
| ------------------ | -------- | ----------------------------------- | ------------ |
| `preferenceId`     | `string` | Preference generated in the backend | **OPTIONAL** |

<br />

#### Callbacks

<br />

The callbacks object contains the callbacks functions the brick will call during its life cycle.

| Callback key | Description                                      |              | Params       | Returns         |
| ------------ | ------------------------------------------------ | ------------ | ------------ | --------------- |
| `onReady`    | It is called when the brick finishes loading     | **REQUIRED** | `void`       | `void`          |
| `onError`    | It is called when there is an error in the brick | **REQUIRED** | `BrickError` | `void`          |
| `onSubmit`   | It is called when the user clicks on the brick   | **OPTIONAL** | `void`       | `Promise<void>` |

<br />

`BrickError`

```ts
{
  type: "non_critical" | "critical";
  message: string;
  cause: ErrorCause;
}
```

<br />

`ErrorCause`

```ts
{
    'invalid_sdk_instance',
    'container_not_found',
    'incorrect_initialization',
    'already_initialized',
    'settings_empty',
    'missing_required_callbacks',
    'missing_container_id',
    'missing_locale_property',
    'missing_texts',
    'missing_payment_information',
    'incomplete_fields',
    'validations_parameter_null',
    'get_payment_methods_failed',
}
```

<br />

#### Customization

<br />

Customizations object is used to load Brick under different conditions.

| Customization key         | Type     | Description                                                                                                                                    |              |
| ------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `texts`                   | `object` | Controls the texts of the brick.                                                                                                               | **OPTIONAL** |
| `texts.action`            | `string` | Defines the the call to action text. Options available: `pay`, `buy`. Default is `pay`.                                                        | **OPTIONAL** |
| `texts.valueProp`         | `string` | Defines the value prop. Options available: `practicality`, `convenience`, `security_details`, `security_safety`. Default is `security_safety`. | **OPTIONAL** |
| `visual`                  | `object` | Controls visual aspects of the brick.                                                                                                          | **OPTIONAL** |
| `visual.buttonBackground` | `string` | Defines the brick background color. Available options: `default`, `black`, `blue`, `white`. Default is `default`.                              | **OPTIONAL** |
| `visual.buttonHeight`     | `string` | Defines the brick height. Default is `48px`. Min: `48px`. Max: free choice.                                                                    | **OPTIONAL** |
| `visual.borderRadius`     | `string` | Defines the brick border radius. Default is `6px`.                                                                                             | **OPTIONAL** |
| `visual.valuePropColor`   | `string` | Defines the value prop color. Available options: `grey`, `white`. Default is `grey`.                                                           | **OPTIONAL** |
| `visual.verticalPadding`  | `string` | Defines the brick vertical padding. Default is `16px`. Min: `8px`. Max: free choice.                                                           | **OPTIONAL** |

<br />

<br />

## Brick Controller

The Brick Controller contains methods that allow the integrator to interact with the rendered Brick.

<br />

|         |            |
| ------- | ---------- |
| unmount | **METHOD** |

<br />

### `Brick Controller`.unmount()

<br />

The `unmount` methods removes the rendered Brick from the page.

#### Params

None.

#### Returns

`void`
