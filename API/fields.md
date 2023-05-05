## Fields module

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

|||
|-|-|
|getIdentificationTypes | **METHOD** |
|getPaymentMethods | **METHOD** |
|getIssuers | **METHOD** |
|getInstallments | **METHOD** |
|fields | **MODULE** |

<br />

---

<br />





### `mp instance`.fields.createCardToken(`nonPCIData`)
Token creation method

<br />

#### Returns: `Promise<CardTokenResponse | void>`

`CardTokenResponse`
```js
{
    id: string,
    public_key: string,
    card_id?: unknown,
    luhn_validation: boolean,
    status: string,
    date_used?: unknown,
    card_number_length: number,
    date_created: Date,
    first_six_digits: string,
    last_four_digits: string,
    security_code_length: number,
    expiration_month: number,
    expiration_year: number,
    date_last_updated: Date,
    date_due: Date,
    live_mode: boolean,
    cardholder: Cardholder,
}
```

<br />

#### Params:
`nonPCIData` | _object_, **REQUIRED**

Options:

| Field                  | Type   |
|------------------------|--------|
| `cardId`               | string |
| `cardholderName`       | string |
| `identificationType`   | string |
| `identificationNumber` | string |

<br />

### `mp instance`.fields.updateCardToken(`token`)
Token update method

<br />

#### Returns: `Promise<CardTokenResponse | void>`

`CardTokenResponse`
```js
{
    id: string,
    public_key: string,
    card_id?: unknown,
    luhn_validation: boolean,
    status: string,
    date_used?: unknown,
    card_number_length: number,
    date_created: Date,
    first_six_digits: string,
    last_four_digits: string,
    security_code_length: number,
    expiration_month: number,
    expiration_year: number,
    date_last_updated: Date,
    date_due: Date,
    live_mode: boolean,
    cardholder: Cardholder,
}
```

<br />

#### Params:
`token` | _string_, **REQUIRED**

To update the _cardtoken_, it is necessary to fill in the fields that will be updated in the form and send the previously created _cardtoken_ as a parameter

<br />

### `mp instance`.fields.create(`type`, `options`)
Field instantiation method.

Example:
```js
mp.fields.create("cardNumber", {
    placeholder: "Card Number",
});
```
<br />

### `mp instance`.fields.focus()
Used to focus on secure fields

Example:
```js
mp.fields.focus();
```
<br />

### `mp instance`.fields.blur()
Used to blur on secure fields

Example:
```js
mp.fields.blur();
```

<br />

#### Returns: `FIELD INSTANCE`

<br />

#### Params:
`type` | _string_, **REQUIRED**

Field type. Possible values are: `cardNumber`, `securityCode`, `expirationMonth`, `expirationYear` or `expirationDate`.

> Note: Expiration Date cannot coexist with Expiration Month or Expiration Year

<br />

`options` | _object_, **OPTIONAL**

The `options` object have properties to customize the field being created.

Options:

|       Option key      |   Type   |        Description                                   |              | Enabled for                    |
|-----------------------|----------|------------------------------------------------------|--------------|--------------------------------|
| `placeholder`         | `string` | Defines field placeholder.                           | **OPTIONAL** | ALL                            |
| `style`               | `object` | Defines field styles. [See more](#style)             | **OPTIONAL** | ALL                            |
| `customFonts`         | `array`  | Defines field customFonts. [See more](#custom-fonts) | **OPTIONAL** | ALL                            |
| `mode`                | `string` | Defines year mode. [See more](#year-mode)            | **OPTIONAL** | expirationYear, expirationDate |
| `enableLuhnValidation`| `boolean`| Defines Luhn validation. [See more](#luhn-validation)| **OPTIONAL** | cardNumber |

<br />

#### Style

Style is an object with keys being the name of CSS property and value a `string` with the property value.

`style`
```js
{
    height: "100%",
    marginTop: "8px",
    "margin-bottom": "8px",
    fontFamily: "Roboto"
}
```

Accepted properties are:

|             Property           |
|:------------------------------:|
|`color`|
|`"font-family"` \| \| `fontFamily`|
|`"font-size"` \| \| `fontSize`|
|`"font-style"` \| \| `fontStyle`|
|`"font-variant"` \| \| `fontVariant`|
|`"font-weight"` \| \| `fontWeight`|
|`height`|
|`margin`|
|`"margin-bottom"` \| \| `marginBottom`|
|`"margin-left"` \| \| `marginLeft`|
|`"margin-right"` \| \| `marginRight`|
|`"margin-top"` \| \| `marginTop`|
|`padding`|
|`"padding-bottom"` \| \| `paddingBottom`|
|`"padding-left"` \| \| `paddingLeft`|
|`"padding-right"` \| \| `paddingRight`|
|`"padding-top"` \| \| `paddingTop`|
|`"placeholder-color"` \| \| `placeholderColor`|
|`"text-align"` \| \| `textAlign`|
|`width`|

Example:
```js
mp.fields.create("cardNumber", {
    placeholder: "Card Number",
    style: {
        fontFamily: "Roboto"
    }
});
```

<br />

#### Custom Fonts

Custom Fonts is an array with `src` attribute defining an url from where to load a custom font.

`customFonts`
```js
{
    src: "https://fonts.googleapis.com/css2?family=Roboto"
}
```

Example:
```js
mp.fields.create("cardNumber", {
    placeholder: "Card Number",
    style: {
        fontFamily: "Roboto"
    },
    customFonts: [
        {
            src: "https://fonts.googleapis.com/css2?family=Roboto"
        }
    ]
});
```

<br />

#### Year Mode

Defines year mode for 'expirationYear' or 'expirationMonth' fields.

Possible values are `short` or `full`. 

- `short`: year must be of two digits.
- `full`: year must be of two digits.
- `undefined`: both formats are accepted.

#### Luhn Validation

Defines whether the card number will be validated by [Luhn](https://en.wikipedia.org/wiki/Luhn_algorithm) validation.
It is very important to remember that for it to work, the [update](#field-instanceupdateproperties) must have been sent correctly.


<br />

## FIELD HELPERS

### `field instance`.mount(`container`)
Field mounting method.

<br />

#### Returns: `FIELD INSTANCE`

<br />

#### Params:

|    Param    |   Type   |               Description               |          |
|:-----------:|:--------:|:---------------------------------------:|:--------:|
| `container` | `string` | HTML DIV id where field will be mounted | REQUIRED |

<br />

### `field instance`.unmount()
Field unmounting method.

<br />

### `field instance`.on(`event`, `callback`)
Method to add event listeners to field.

<br />

#### Params:

|    Param   |    Type    |                     Description                     |          |
|:----------:|:----------:|:---------------------------------------------------:|:--------:|
| `event`    | `string`   | Event to listen                                     | REQUIRED |
| `callback` | `function` | Callback function to be executed when event happens | REQUIRED |

<br />

The default events, enabled for every field are: `blur`, `focus`, `ready` or `validityChange`. The table below specifies the callback functions signature for every event.

| Event | Params | Description | Enabled for |
|-|-|-|-|
|blur|`defaultEvent`|Callback triggered when blur event occurs| ALL |
|focus|`defaultEvent`|Callback triggered when focus event occurs| ALL |
|ready|`defaultEvent`|Callback triggered when field has been initialized| ALL |
|change|`defaultEvent`|Callback triggered when field value changes| ALL |
|paste|`defaultEvent`|Callback triggered when paste some value on field| ALL |
|validityChange|`validityChangeEvent`|Callback triggered when field validation occurs| ALL |
|error|`errorEvent`|Callback triggered when error event occurs| ALL |
|binChange|`binChangeEvent`|Callback triggered when bin state changes from invalid to valid or from valid to invalid. It returns the bin when valid or null when invalid| cardNumber |

`defaultEvent`
```js
{
    field: string
}
```

`validityChangeEvent`
```js
{
    field: string,
    errorMessages: [{
        message: string,
        cause: string
    }]
}
```

<br />

The table below provides information about causes and messages:
<table>
    <tr>
        <td><b>Field</b></td>
        <td><b>Cause</b></td>
        <td><b>Messages</b></td>
    </tr>
    <tr>
        <td rowspan="3">

`           cardNumber`
        </td>
        <td>

`           invalid_type`
        </td>
        <td>cardNumber should be a number.</td>
    </tr>
    <tr>
        <td>
        
`           invalid_length`
        </td>
        <td>cardNumber should be of length between '9' and '18'.</td>
    </tr>
    <tr>
        <td>
        
`           invalid_value`
        </td>
        <td>card number rejected on Luhn Validation.</td>
    </tr>
    <tr>
        <td rowspan="2">
        
`           securityCode`
        </td>
        <td>
        
`           invalid_type`
        </td>
        <td>securityCode should be a number.</td>
    </tr>
    <tr>
        <td>
        
`           invalid_length`
        </td>
        <td>securityCode should be of length '3'.<br />securityCode should be of length '4'.</td>
    </tr>
    <tr>
        <td rowspan="2">
        
`           expirationMonth`
        </td>
        <td>
        
`           invalid_type`
        </td>
        <td>expirationMonth should be a number.</td>
    </tr>
    <tr>
        <td>
        
`           invalid_value`
        </td>
        <td>expirationMonth should be a value from 1 to 12.<br />expirationMonth value should be greater than '&lt;previous month&gt;' or expirationYear value should be greater than '&lt;current year&gt;'.</td>
    </tr>
    <tr>
        <td rowspan="3">
        
`           expirationYear`
        </td>
        <td>
        
`           invalid_type`
        </td>
        <td>expirationYear should be a number.</td>
    </tr>
    <tr>
        <td>
        
`           invalid_length`
        </td>
        <td>expirationYear should be of length '2' or '4'.</td>
    </tr>
    <tr>
        <td>
        
`           invalid_value`
        </td>
        <td>expirationYear should be greater or equal than &lt;currentYear&gt;.<br />expirationMonth value should be greater than '&lt;previous month&gt;' or expirationYear value should be greater than '&lt;current year&gt;'.</td>
    </tr>
    <tr>
        <td rowspan="3">
        
`           expirationDate`
        </td>
        <td colspan="2" style="padding: 16px"><center>
        
`expirationMonth` and `expirationYear` causes and messages.
        </center></td>
    </tr>
</table>

>IMPORTANT: All errors return a detailed object of each error

<br />

`errorEvent`
```js
{
    field: string,
    error: string
}
```

`binChangeEvent`
```js
{
    bin: string | null,
    field: string
}
```

<br />

### `field instance`.update(`properties`)
Method to update field properties.

<br />

#### Params:

|    Param    |    Type    |                     Description                     |          |
|:-----------:|:----------:|:---------------------------------------------------:|:--------:|
| `properties`| `object`   | Properties to update                                | REQUIRED |

<br />

<br />

The table below specifies the properties available for being updated.

| Property | Type | Description | Enabled for |
|-|-|-|-|
|placeholder|`string`|Field placeholder| ALL |
|settings|`SecurityCode` \| `CardNumber`|Field settings| securityCode, cardNumber |

`SecurityCode`
```js
{
    mode: string, // 'mandatory' | 'optional'
    length: number // 3 | 4
}
```

`CardNumber`
```js
{
    length: number // Between 8 and 19
    validation: string // 'standard' | 'none'
}
```

<br />

#### Returns: `FIELD INSTANCE`

<br />

---

<br />