# `BricksBuilder`.create(`brick`, `target`, `settings`)

### This Brick is temporarily exclusive for **MLA (Argentina)** 🇦🇷

Example without settings:

```js
mp.bricks().create("brand", "brandBrick_container");
```

Example with complete settings:

```js
mp.bricks().create("brand", "brandBrick_container", {
  customization: {
    paymentMethods: {
      excludedPaymentMethods: ["rapipago"],
      excludedPaymentTypes: ["credit_card"],
      interestFreeInstallments: true,
      maxInstallments: 3,
    },
    text: {
      fontWeight: "regular",
      color: "inverted",
      textSize: "medium",
      useCustomFont: true,
      valueProp: "payment_methods_logos",
      align: "right",
    },
    visual: {
      hideMercadoPagoLogo: true,
      contentAlign: "center",
      backgroundColor: "MPSecondary",
      border: true,
      borderColor: "light",
      borderWidth: "2px",
      borderRadius: "15px",
      verticalPadding: "25px",
      horizontalPadding: "25px",
    },
  },
  callbacks: {
    onReady: () => {
      // handle form ready
    },
  },
});
```

## Params

`brick` | _string_, **REQUIRED**

Selected Brick. Possible values are: `brand`.

`target` | _string_, **REQUIRED**

Id of the container that the brick will be rendered in. Can be any HTML element.

`settings` | _object_, **OPTIONAL**

The `settings` object has properties to customize the brick being created.

| Setting key     | Type     | Description                                            |              |
| --------------- | -------- | ------------------------------------------------------ | ------------ |
| `customization` | `object` | Defines custom properties. [See more](#customization)  | **OPTIONAL** |
| `callbacks`     | `object` | Defines the callback functions. [See more](#callbacks) | **OPTIONAL** |

## Customization

Customizations object is used to load Brick under different conditions.

| Customization key                         | Type       | Description                                                                                                                                                                                                                                            |              |
| ----------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `paymentMethods`                          | `object`   | Controls which information about payment methods and payment method types will appear on the Brand Brick - at the default render and modal. Contains `excludedPaymentMethods`,`excludedPaymentTypes`,`maxInstallments` and `interestFreeInstallments`. | **OPTIONAL** |
| `paymentMethods.excludedPaymentMethods`   | `string[]` | Defines which Payment Method will not be shown at Brand Brick. The payment method name needs to be lower case. [See options here](#options)                                                                                                            | **OPTIONAL** |
| `paymentMethods.excludedPaymentTypes`     | `string[]` | Defines which Payment Method Type will not be shown at Brand Brick. The default value is `empty`. The possible values are `credit_card`, `debit_card` and `ticket`                                                                                     | **OPTIONAL** |
| `paymentMethods.interestFreeInstallments` | `boolean`  | Defines if it will be shown that the installments have interest or do not have interest. The possible values are `true` or `false`.                                                                                                                    | **OPTIONAL** |
| `paymentMethods.maxInstallments`          | `number`   | Defines which value will be shown as maximum installments accepted by the seller. If filled, the value starts at `2` and the maximum allowed to show is `12`.                                                                                          | **OPTIONAL** |
| `text`                                    | `object`   | Controls which message will appear on the Brand Brick. Contains `valueProp`, `useCustomFont`, `textSize`, `fontWeight` and `color`.                                                                                                                    | **OPTIONAL** |
| `text.align`                              | `string`   | Defines only the text alignment. The possible values are `left`, `center` and `right`. The default value is `left`.                                                                                                                                    | **OPTIONAL** |
| `text.fontWeight`                         | `string`   | Defines the font weight to the texts at Brand Brick. The possible values are `semi-bold` or `regular`.                                                                                                                                                 | **OPTIONAL** |
| `text.color`                              | `string`   | Defines the font color to the texts at Brand Brick. The possible values are `primary`, `secondary` or `inverted`.                                                                                                                                      | **OPTIONAL** |
| `text.textSize`                           | `string`   | Defines the font size to the texts at Brand Brick. The possible values are `extra-small`, `small`, `medium` or `large`.                                                                                                                                | **OPTIONAL** |
| `text.useCustomFont`                      | `boolean`  | Defines if will be used a custom font or if it will adopt the standard font to Brand Brick. The possible values are `true` or `false`. If `true`, brand brick will inherit the font-family from the container                                          | **OPTIONAL** |
| `text.valueProp`                          | `string`   | Defines which message will appear on the Brand Brick. The options are `payment_methods` (which is the default value), `payment_methods_logos`, `installments`,`security` and `credits`.                                                                | **OPTIONAL** |
| `visual`                                  | `object`   | Controls visual aspects for the Brand Brick. Contains `hideMercadoPagoLogo`, `contentAlign`, `backgroundColor`, `border`, `borderColor`, `borderWidth`, `borderRadius`, `verticalPadding` and `horizontalPadding`.                                     | **OPTIONAL** |
| `visual.backgroundColor`                  | `string`   | Defines which will be the background color at Brand Brick. The possible values are `white`, `MPPrimary`, `MPSecondary`, `black` or `transparent`.                                                                                                      | **OPTIONAL** |
| `visual.border`                           | `boolean`  | Defines if it will be shown a border around the banner. The possible values are `true` or `false`.                                                                                                                                                     | **OPTIONAL** |
| `visual.borderColor`                      | `string`   | Defines the border color. The possible values are `light` or `dark`.                                                                                                                                                                                   | **OPTIONAL** |
| `visual.borderRadius`                     | `string`   | Defines the border radius. The possible values are expressed in pixels in the format `Npx`                                                                                                                                                             | **OPTIONAL** |
| `visual.borderWidth`                      | `string`   | Defines the border color. The possible values are `1px` or `2px`.                                                                                                                                                                                      | **OPTIONAL** |
| `visual.contentAlign`                     | `string`   | Defines the content alignment - text and images - inside de Brand Brick. The possible values are `left`, `center` or `right`.                                                                                                                          | **OPTIONAL** |
| `visual.hideMercadoPagoLogo`              | `boolean`  | Defines if the MercadoPago logos will be shown at Brand Brick. The possible values are `true` or `false`.                                                                                                                                              | **OPTIONAL** |
| `visual.horizontalPadding`                | `string`   | Defines the horizontal padding for the Brand Brick. The possible values are expressed in pixels in the format `Npx` and the allowed values are between `0px` and `40px`.                                                                               | **OPTIONAL** |
| `visual.verticalPadding`                  | `string`   | Defines the vertical padding for the Brand Brick. The possible values are expressed in pixels in the format `Npx` and the allowed values are between `0px` and `40px`.                                                                                 | **OPTIONAL** |

### Options

The excluded payment options are

|             |
| ----------- |
| `master`    |
| `visa`      |
| `amex`      |
| `naranja`   |
| `maestro`   |
| `cabal`     |
| `cencosud`  |
| `cordobesa` |
| `argencard` |
| `diners`    |
| `tarshop`   |
| `cmr`       |
| `rapipago`  |
| `pagofacil` |

## Callbacks

The callbacks object contains the callbacks functions the brick will call during its life cycle.

| Callback key | Description                                  | Params | Returns |              |
| ------------ | -------------------------------------------- | ------ | ------- | ------------ |
| `onReady`    | It is called when the brick finishes loading | `void` | `void`  | **OPTIONAL** |
