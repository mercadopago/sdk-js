## `BricksBuilder`.create(`brick`, `target`, `settings`)

Example:
```js
mp.bricks().create('statusScreen', 'statusScreenBrick_container' , {
    initialization: {
        paymentId: '1234567890'
    },
    callbacks: {
        onReady: () => {
            // handle form ready
        },
        onError: (error) => {
            // handle error
        }
    }
});
```

<br />

### Params:

<br />

`brick` | _string_, **REQUIRED**

Selected Brick. Possible values are: `statusScreen`.

<br />

`target` | _string_, **REQUIRED**

Id of the container that the brick will be rendered in. Can be any HTML element.

<br />

`settings` | _object_, **REQUIRED**

The `settings` object has properties to initialize and customize the brick being created.


|   Setting key  |   Type   |        Description                                   |              | 
|---------------|----------|------------------------------------------------------|--------------|
| `initialization`| `object` | Defines the initialization data. [See more](#initialization) | **REQUIRED** |
| `callbacks`     | `object` | Defines the callback functions. [See more](#callbacks) | **REQUIRED** |
| `customization` | `object`  | Defines custom properties. [See more](#customization) | **OPTIONAL** |
| `locale`        | `string` | Defines locale.                                     | **OPTIONAL** |

<br />

#### Initialization

<br />

Initialization is an object with the properties the brick will initialize with.

|   Initialization key  |   Type   |        Description                                   |              |
|---------------|----------|------------------------------------------------------|--------------|
| `paymentId`| `string` | The ID of the payment generated via Mercado Pago. | **REQUIRED** ||

<br />

#### Callbacks

<br />

The callbacks object contains the callbacks functions the brick will call during its life cycle.

|   Callback key     |     Description                                   |              | Params | Returns |
|-------------------|--------------------------------------------------|--------------|-----|----|
| `onReady` | It is called when the brick finishes loading | **REQUIRED** | `void` | `void` |
| `onError` | It is called when there is an error in the Brick | **REQUIRED** |  `BrickError` | `void` |

<br />

`BrickError`

```ts
{
    type: 'non_critical' | 'critical';
    message: string;
    cause: ErrorCause;
}
```
<br />

`ErrorCause`

```ts
{
    'already_initialized'
    'amount_is_not_number'
    'container_not_found'
    'get_mexico_payment_points_failed'
    'get_payment_data_failed'
    'get_payment_methods_failed'
    'incorrect_initialization'
    'invalid_sdk_instance'
    'missing_container_id'
    'missing_locale_property'
    'missing_required_callbacks'
    'missing_texts'
    'settings_empty'
}
```
<br />

#### Customization

<br />

Customizations object is used to load Brick under different conditions.


|   Customization key  |   Type   |        Description                                   |              |
|---------------|----------|------------------------------------------------------|--------------|
| `backUrls`| `object`| Controls whether the brick will show the user a button to navigate back to the seller's website | **OPTIONAL** |
| `visual`| `object`| Control the visual aspects of the brick. Contains `style`, `font`, `texts`, `hidePaymentButton` and `hideFormTitle` | **OPTIONAL** |
| `visual.texts`| `CustomTexts`| Defines custom texts for the Brick (available custom texts vary by Brick). | **OPTIONAL** |
| `visual.font`| `string`| Defines the custom font URL. This only applies to the [Secure Fields](../fields.md#fields-module). | **OPTIONAL** |
| `visual.style`| `Style`| Defines custom theme and CSS variables | **OPTIONAL** |
| `visual.showExternalReference`| `boolean`| Shows the `external_reference` field from the Payments API | **OPTIONAL** |
| `visual.hideTransactionDate`| `boolean`| Controls if the transaction date is shown in the Brick | **OPTIONAL** |
| `visual.hideStatusDetails`| `boolean`| Controls if the status detail of the payment is shown in the Brick | **OPTIONAL** |

<br />

#### backUrls

Controls whether the brick will show the user a button to navigate back to the seller's website.
The url must be in the same domain and subdomain that the Brick is loaded on, urls in another domain will be ignored.

|   key  |   Type   |        Description                                   |              |
|---------------|----------|------------------------------------------------------|--------------|
| `error`| `string` | Defines the url that will be shown to the user in case of error in the payment. | **OPTIONAL** |
| `return`| `string`| Defines the url that will be shown to the user in all scenarios of the brick. Useful to return to shopping page.  | **OPTIONAL** |

<br />

`CustomTexts`

Accepted properties are:

|             Property           | Type |
|------------------------------|----------|
|`ctaGeneralErrorLabel`| `string` |
|`ctaCardErrorLabel`| `string` |
|`ctaReturnLabel`| `string` |

<br />

#### Style

<br />

Style is an object with keys for theme and custom CSS variables.

|   Style key  |   Type   |        Description                                   |              |
|---------------|----------|------------------------------------------------------|--------------|
| `theme`| `string` | Defines theme for Brick. Possible values: `default`, `dark`, `flat`, `bootstrap` | **OPTIONAL** |
| `customVariables`| `object`| Defines custom variables to be applied. [Possible values](#custom-variables)  | **OPTIONAL** |

`style`
```js
{
    theme: 'dark',
    customVariables: {
        textPrimaryColor: 'blue'
    }
}
```
##### Custom Variables

Accepted properties are:

|             Property           | Type |
|------------------------------|----------|
|`textPrimaryColor`| `string` | 
|`textSecondaryColor`| `string` |
|`inputBackgroundColor`| `string` | 
|`formBackgroundColor`| `string` | 
|`baseColor`| `string` | 
|`baseColorFirstVariant`| `string` |
|`baseColorSecondVariant`| `string` |
|`errorColor`| `string` |
|`successColor`| `string` |
|`warningColor`| `string`|
|`outlinePrimaryColor`| `string` |
|`outlineSecondaryColor`| `string` |
|`buttonTextColor`| `string` |
|`fontSizeExtraSmall` | `string` |
|`fontSizeSmall` | `string` |
|`fontSizeMedium` | `string` |
|`fontSizeLarge` | `string` |
|`fontSizeExtraLarge` | `string` |
|`fontSizeExtraExtraLarge` | `string` |
|`fontWeightNormal` | `string` |
|`fontWeightSemiBold` | `string` |
|`formInputsTextTransform` | `string` |
|`inputVerticalPadding` | `string` |
|`inputHorizontalPadding` | `string` |
|`inputFocusedBoxShadow` | `string` |
|`inputErrorFocusedBoxShadow` | `string` |
|`inputBorderWidth` | `string` |
|`inputFocusedBorderWidth` | `string` |
|`borderRadiusSmall` | `string` |
|`borderRadiusMedium` | `string` |
|`borderRadiusLarge` | `string` |
|`borderRadiusFull` | `string` |
|`formPadding` | `string` |

> Note: All sizing properties accept values in: `px`, `rem`, `em`, and `%`

<br />

### Returns: `Promise<BRICK CONTROLLER>`

<br />

## Brick Controller

The Brick Controller contains methods that allow the integrator to interact with the rendered Brick.

<br />

|||
|-|-|
|unmount | **METHOD** |

<br />

### `Brick Controller`.unmount()

<br />

The `unmount` methods removes the rendered Brick from the page.


<br />

#### Params

None.

#### Returns

`void`

<br />