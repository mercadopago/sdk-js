## Bricks module

## `mp instance`.bricks(`Style`)
Bricks builder class instantiation

<br />

### Params:

<br/>

`Style` | _object_, **OPTIONAL**

Options:

| Field                  | Type   | Values                                                |
|------------------------|--------|-------------------------------------------------------|
| `theme`                | string | `default` <br/> `dark` <br/> `bootstrap` <br/> `flat` |

<br />

### Returns: `BricksBuilder`

<br/>

|||
|-|-|
|isInitialized | **METHOD** |
|create | **METHOD** |

<br/>

## `BricksBuilder`.isInitialized()

Method that returns whether the Bricks class is initialized or not

### Params

None.

### Returns: `boolean`

<br />

## `BricksBuilder`.create(`brick`, `target`, `settings`)

This methods creates and renders the brick on the screen.

<br />

>Note: The Brick loads in the HTML of the client's page. Therefore, the font applied to the containing element will be applied to the Brick.

>Note: The Brick will occupy all the available space in the containing element. Never being bigger than it's container, and is totally responsive without additional configuration.

<br />
Refer to the specific Brick API refence for parameters and methods specifications.

||
|-|
| [`cardPayment`](./card-payment.md) |
| [`payment`](./payment.md) |
| [`statusScreen`](./status-screen.md) |