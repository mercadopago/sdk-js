## Bricks module

## `mp instance`.bricks(`Style`)
Bricks class instanciaton

<br />

### Params:

<br/>

`Style` | _object_, **OPTIONAL**

Options:

| Field                  | Type   |
|------------------------|--------|
| `theme`                | string |

<br />

### Returns: `BricksBuilder`

<br/>

|||
|-|-|
|create | **METHOD** |
|isInitialized | **METHOD** |

<br/>

## `BricksBuilder`.isInitialized()

Method that returns wheather the Bricks class is initialized or not

### Params

None.

### Returns: `boolean`

<br />

## `BricksBuilder`.create(`brick`, `target`, `settings`)

This methods creates and renders the brick on the screen.

<br />

>Note: The Brick loads in the HTML of the client's page. Therefore, the font applied to the containing element will be applied to the Brick.

>Note: The Brick will occupy all the avaliable space in the containing element. Never being bigger than it's container, and is totally responsive without additional configuration.

<br />
Refer to the specific Brick API refence for parameters and methods specifications.

||
|-|
| [`cardPayment`](./card-payment.md) |