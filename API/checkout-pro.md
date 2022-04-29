## Checkout PRO

### Initializing the Checkout
To initialize the checkout you need to call the `.checkout` function from the SDK along with some options.

#### Checkout

```javascript
mercadopago.checkout(checkoutParams)
```

##### Params

|Option name|Type|Attributes|Description||
|-|-|-|-|-|
|`preference` | *object* | `id`: *string* | Payment Preference | **REQUIRED** |


##### Additional configurations 
You can pass some other configurations as params to the `.checkout()` function: 

`theme` | *object* | **OPTIONAL** : Visual customization data.

|Option name|Type|Description|
|-|-|-|
|`elementsColor` | *string* | Checkout elements color (e.g., buttons, labels)|
|`headerColor` | *string* | Color for the checkout header|

`autoOpen` | *boolean* | **OPTIONAL** : If the value is set to `true`, it will trigger the checkout to automatically open as soon as the page loads.

`render` | *object* | **OPTIONAL** : Set the render options right away without needing to call the rendering functions later.
|Option name|Type|Description|
|-|-|-|
|`container` | *string* | Checkout elements color (e.g., buttons, labels)|
|`label`|*string*|Label for the checkout trigger button|
|`type`|*string*|Type for the checkout trigger button|

#### Rendering the Checkout 

##### mercadopago.checkout.`render()`
Renders the Payment Button on a given container. This button has the trigger to open the checkout.

**Params**
|Option name|Type|Description||
|-|-|-|-|
|`container`|*string*|Selector (id, class) for the container element||
|`label`|*string*|Label for the checkout trigger button||
|`type`|*string*|Type for the checkout trigger button||

##### mercadopago.checkout.`open()`
Manually triggers the opening of an iframe element with the checkout.
