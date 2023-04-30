# Excel Transformation Tool

A Chrome Plugin to bring JavaScript functionalities to spreasheets.

Create a the ``src/extensions/excel-transformation-tool/.env`` file containing the
environment variables:

````bash
echo "VITE_EXTENSIONPAY_ID=<myextensionid>" > .env
````

### Develop

1. ``npm run dev`` and load the unpacked extension on [chrome://extensions/](chrome://extensions/)

### Build
1. ``npm run build``

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