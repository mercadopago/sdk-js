const SDK_MERCADOPAGO_URL = 'https://sdk.mercadopago.com/js/v2';
const SDK_MERCADOPAGO_URL_REGEX =
  /^https:\/\/sdk\.mercadopago\.com\/js\/v2\/?(\?.*)?$/;
const EXISTING_SCRIPT_MESSAGE_INITIALIZED =
  'MercadoPago has already been initialized in your window, please remove the duplicate import';
const EXISTING_SCRIPT_MESSAGE_NOT_AVAILABLE =
  'MercadoPago.js not available';
const EXISTING_SCRIPT_MESSAGE_FAILED_TO_LOAD =
  'Failed to load MercadoPago.js';

const findScript = () => {
  var scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll(
    'script[src^="'.concat(SDK_MERCADOPAGO_URL, '"]')
  );

  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];

    if (!SDK_MERCADOPAGO_URL_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};

const injectScript = () => {
  const script = document.createElement('script');
  script.src = SDK_MERCADOPAGO_URL;
  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error(
      'Expected document.body or document.head not to be null. MercadoPago requires a <body> or a <head> element, please add on your project.'
    );
  }

  headOrBody.appendChild(script);
  return script;
};

let LoadPromise: null | Promise<unknown> = null;
const loadMercadoPago = () => {
  if (LoadPromise !== null) {
    return LoadPromise;
  }

  LoadPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if (window.MercadoPago) {
      console.warn(EXISTING_SCRIPT_MESSAGE_INITIALIZED);
      resolve(window.MercadoPago);
      return;
    }

    try {
      let script = findScript();

      if (script) {
        console.warn(EXISTING_SCRIPT_MESSAGE_INITIALIZED);
      } else if (!script) {
        script = injectScript();
      }

      script.addEventListener('load', () => {
        if (window.MercadoPago) {
          resolve(window.MercadoPago);
        } else {
          reject(new Error(EXISTING_SCRIPT_MESSAGE_NOT_AVAILABLE));
        }
      });

      script.addEventListener('error', () => {
        reject(new Error(EXISTING_SCRIPT_MESSAGE_FAILED_TO_LOAD));
      });

    } catch (error) {
      reject(error);
      return;
    }
  });
  return LoadPromise;
};

export { loadMercadoPago };
