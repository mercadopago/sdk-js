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

|                                   |            |
| --------------------------------- | ---------- |
| getIdentificationTypes            | **METHOD** |
| getPaymentMethods                 | **METHOD** |
| getAccountPaymentMethods          | **METHOD** |
| getIssuers                        | **METHOD** |
| getInstallments                   | **METHOD** |
| getCardId                         | **METHOD** |
| createCardToken                   | **METHOD** |
| updatePseudotoken                 | **METHOD** |
| renderCreditsContract             | **METHOD** |
| cardForm                          | **MODULE** |
| checkout                          | **MODULE** |
| [fields](fields.md#fields-module) | **MODULE** |

<br />

---

<br />

### `mp instance`.getIdentificationTypes()

Return all the document types based on the `public_key`

#### Example:

```javascript
const identificationTypes = await mp.getIdentificationTypes();
```

#### Return: `PROMISE`

```javascript
[
  {
    id: string,
    name: string,
    type: string,
    min_length: number,
    max_length: number,
  },
];
```

<br />

---

<br />

### `mp instance`.getPaymentMethods(`paymentMethodsParams`)

Returns a payment methods list

<br />

#### Params:

`paymentMethodsParams` | _object_, **REQUIRED**
| Option Key | Type | Description | |
|-|-|-|-|
| `bin` | `STRING` | Card number first 8 digits | **REQUIRED** |
| `processingMode` | `"aggregator"` \| `"gateway"` | Process mode | **OPTIONAL** |

<br />

#### Example:

```javascript
const paymentMethods = await mp.getPaymentMethods({ bin: "41111111" });
```

#### Return: `PROMISE` (showing most common used results.)

```javascript
{
  paging: {
    total: number,
      limit: number,
      offset: number,
    },
  results: [{
    secure_thumbnail: string,
    min_accreditation_days: number,
    max_accreditation_days: number,
    id: string,
    payment_type_id: string,
    accreditation_time: number,
    thumbnail: string,
    marketplace: string,
    deferred_capture: string,
    labels: string[],
    name: string,
    site_id: string,
    processing_mode: string,
    additional_info_needed: string[],
    status: string,
    settings: [{
        security_code: {
            mode: string,
            card_location: string,
            length: number
        },
        card_number: {
            length: number,
            validation: string
        },
        bin: {
            pattern: string,
            installments_pattern: string,
            exclusion_pattern: string,
        }
    }],
    issuer: {
        default: boolean,
        name: string,
        id: number
    },
}
```

<br />

---

<br />

### `mp instance`.getAccountPaymentMethods(`fastPaymentToken`)

Returns payment methods associated with an account using a fast payment token.

<br />

#### Params:

`fastPaymentToken` | _string_, **REQUIRED**
| Option Key | Type | Description | |
|-|-|-|-|
| `fastPaymentToken` | `STRING` | Fast payment token obtained from the [Authenticator](#authenticator)'s `show()` method | **REQUIRED** |

<br />

#### Example:

```javascript
const accountPaymentMethods = await mp.getAccountPaymentMethods(fastPaymentToken);
```

#### Return: `PROMISE`

```javascript
{
  data: [{
    id: string,
    name: string,
    thumbnail: string,
    token: string,
    type: "credit_card" | "debit_card" | "account_money" | "digital_currency",
    issuer: {
      default: boolean,
      id: string,
      name: string,
      bank: {
        country: string,
        name: string,
      };
    },
    security_code_settings: {
      length: number,
      mode: string,
    },
    card: {
      card_number: {
        bin: string,
        last_four_digits: string,
        length: number,
      };
    },
    installments: {
      installment_amount: string,
      installment_rate: number,
      installment_rate_collector: string[],
      installments: number,
      max_allowed_amount: number,
      min_allowed_amount: number,
      total_amount: string,
      labels: string[],
    };
  }]
}
```

#### Payment Method Types

The `getAccountPaymentMethods` response includes different payment method types:

| Type              | Description                                    | Additional Fields Available |
| ----------------- | ---------------------------------------------- | --------------------------- |
| `credit_card`     | User's saved credit cards                      | `card`, `security_code_settings`, `installments` |
| `debit_card`      | User's saved debit cards                       | `card`, `security_code_settings` |
| `account_money`   | User's Mercado Pago account balance            | None |
| `digital_currency`| **Mercado Crédito (Credits)** - BNPL solution  |  None |


<br />

---

<br />

### `mp instance`.getIssuers(`issuersParams`)

Returns a issuers list

<br />

#### Params:

`issuersParams` | _object_, **REQUIRED**
| Option Key | Type | Description | |
|-|-|-|-|
| `paymentMethodId` | `STRING` | Payment method ID | **REQUIRED** |
| `bin` | `STRING` | Card number first 8 digits | **REQUIRED** |

<br />

#### Example:

```javascript
const issuers = await mp.getIssuers({
  paymentMethodId: "visa",
  bin: "411111111",
});
```

#### Return: `PROMISE`

```javascript
[{
  id: string,
  name: string,
  secure_thumbnail: string,
  thumbnail: string,
  processing_mode: string,
  merchant_account_id?: string,
}]
```

<br />

---

<br />

### `mp instance`.getInstallments(`installmentsParams`)

Returns all installments available

<br />

#### Params:

`installmentsParams` | _object_, **REQUIRED**
| Option Key | Type | Description | |
|-|-|-|-|
| `amount` | `STRING` | Payment total amount | **REQUIRED** |
| `bin` | `STRING` | Card number first 8 digits | **REQUIRED** |
| `locale` | `STRING` | Set the response message language | **OPTIONAL** |
| `processingMode` | `"aggregator"` \| `"gateway"` | Process mode | **OPTIONAL** |

<br />

#### Example:

```javascript
const installments = await mp.getInstallments({
  amount: "1000",
  locale: "pt-BR",
  bin: "41111111",
  processingMode: "aggregator",
});
```

#### Return: `PROMISE`

```javascript
[{
  ...
  merchant_account_id?: string,
  payer_costs: [{
    installments: number,
    installment_rate: number,
    discount_rate: number,
    labels: string[],
    installment_rate_collector: string[],
    min_allowed_amount: number,
    max_allowed_amount: number,
    recommended_message: string,
    installment_amount: number,
    total_amount: number,
    payment_method_option_id: string
  }]
}]
```

<br />

---

<br />

### `mp instance`.getCardId(`fastPaymentToken`, `pseudotoken`)

Returns card identification information using a fast payment token and pseudotoken.

<br />

#### Params:

`fastPaymentToken, pseudotoken` | _string_, **REQUIRED**
| Option Key | Type | Description | |
|-|-|-|-|
| `fastPaymentToken` | `STRING` | Fast payment token obtained from the [Authenticator](#authenticator)'s `show()` method | **REQUIRED** |
| `pseudotoken` | `STRING` | Pseudotoken identifier | **REQUIRED** |

<br />

#### Example:

```javascript
const cardId = await mp.getCardId(fastPaymentToken, pseudotoken);
```

#### Return: `PROMISE`

```javascript
{
  card_id: string
}
```

<br />

---

<br />

### `mp instance`.createCardToken(`cardTokenParams`)

Return a token card

#### Params:

`cardTokenParams` | _object_, **REQUIRED**
| Option Key | Type | Description | |
|-|-|-|-|
| `cardNumber` | `STRING` | Card number | **OPTIONAL** |
| `cardholderName` | `STRING` | Cardholder name | **OPTIONAL** |
| `cardExpirationMonth` | `STRING` | Expiration month | **OPTIONAL** |
| `cardExpirationYear` | `STRING` | Expiration year | **OPTIONAL** |
| `securityCode` | `STRING` | Security code | **REQUIRED** |
| `identificationType` | `STRING` | Type of document | **OPTIONAL** |
| `identificationNumber` | `STRING` | Value of document | **OPTIONAL** |
| `cardId` | `STRING` | Id of a saved card | **OPTIONAL** |

<br />

#### Example:

```javascript
const cardToken = await mp.createCardToken({
  cardNumber: "5031433215406351",
  cardholderName: "APRO",
  cardExpirationMonth: "11",
  cardExpirationYear: "2025",
  securityCode: "123",
  identificationType: "CPF",
  identificationNumber: "12345678912",
});
```

<br />

#### Return: `PROMISE`

```javascript
{
  ...
  id: string
}
```

<br />

---

<br />

### `mp instance`.updatePseudotoken(`fastPaymentToken`, `pseudotoken`, `cardToken`)

Updates pseudotoken information with card token data.

<br />

#### Params:

`fastPaymentToken, pseudotoken, cardToken` | _string_, **REQUIRED**
| Option Key | Type | Description | |
|-|-|-|-|
| `fastPaymentToken` | `STRING` | Fast payment token obtained from the [Authenticator](#authenticator)'s `show()` method | **REQUIRED** |
| `pseudotoken` | `STRING` | Pseudotoken identifier | **REQUIRED** |
| `cardToken` | `STRING` | Card token to associate | **REQUIRED** |

<br />

#### Example:

```javascript
await mp.updatePseudotoken(fastPaymentToken, pseudotoken, cardToken);
```

#### Return: `PROMISE`

```javascript
// Returns void - no response data
```

<br />

---

<br />

### `mp instance`.renderCreditsContract(`containerId`, `options`)

Renders a Credits legal text component that displays the terms and conditions for Mercado Crédito (Buy Now Pay Later) payments.

<br />

#### Params:

`containerId` | _string_, **REQUIRED**

The HTML element ID where the Credits contract component will be rendered.

<br />

`options` | _object_, **REQUIRED**

| Option Key         | Type     | Description                                                                          |              |
| ------------------ | -------- | ------------------------------------------------------------------------------------ | ------------ |
| `fastPaymentToken` | `STRING` | Fast payment token obtained from the [Authenticator](#authenticator)'s `show()` method | **REQUIRED** |
| `pseudotoken`      | `STRING` | Pseudotoken identifier for the Credits payment method                                | **REQUIRED** |
| `pricingId`        | `STRING` | Pricing configuration identifier for the Credits contract                            | **REQUIRED** |
| `customization`    | `object` | Visual customization options for the component                                       | **OPTIONAL** |

#### Customization Options

| Customization Key | Type     | Description                      |              |
| ----------------- | -------- | -------------------------------- | ------------ |
| `textColor`       | `string` | Color of the contract text       | **OPTIONAL** |
| `textSize`        | `string` | Font size of the contract text   | **OPTIONAL** |
| `linkColor`       | `string` | Color of links in the contract   | **OPTIONAL** |

<br />

#### Example:

```javascript
const creditsController = await mp.renderCreditsContract('credits_container', {
  fastPaymentToken: '<USER_FAST_PAYMENT_TOKEN>',
  pseudotoken: '<CREDITS_PSEUDOTOKEN>',
  pricingId: '<PRICING_ID>',
  customization: {
    textColor: '#333333',
    textSize: '14px',
    linkColor: '#0070e0',
  },
});
```

#### Return: `PROMISE<CREDITS_CONTROLLER>`

The method returns a Promise that resolves to a Credits Controller object with the following methods:

| Method | Description                                                           | Params                               | Returns          |
| ------ | --------------------------------------------------------------------- | ------------------------------------ | ---------------- |
| `update` | Updates the Credits contract with new installment information       | `{ installments: string }`           | `Promise<boolean>` |

#### Usage with Credits Controller:

```javascript
// Update the contract to show different installment options
const updateResult = await creditsController.update({
  installments: '12', // Number of installments as string
});

if (updateResult) {
  console.log('Credits contract updated successfully');
} else {
  console.log('Failed to update Credits contract');
}
```

#### Error Handling:

The method may reject with the following error types:
- `missing_container_id`: The specified container element was not found
- `invalid_fast_payment_token`: The provided token is invalid or expired
- `missing_pricing_id`: The pricing ID is required but not provided
- `credits_contract_initialization_failed`: Failed to initialize the Credits contract component

<br />

---

<br />
