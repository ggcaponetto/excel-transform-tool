Create a the ``src/extensions/chrome-extension-boilerplate-react-vite-main/.env`` file containing the
environment variables:

````bash
echo "VITE_EXTENSIONPAY_ID=<myextensionid>" > .env
````

### Develop

1. ``npm run dev``

### Debug

1. Right click on popup and open inspector. Set breakpoints in source tab. 
2. ``window.location.reload(true)``

#### Alternative

1. place this in the source code
````js
    // eslint-disable-next-line no-debugger
    debugger;
````
1. Right click on popup and open inspector.
2. ``window.location.reload(true)``