# Excel Transformation Tool

A Chrome Plugin to bring JavaScript functionalities to spreasheets. Modify each cell of your spreadsheet with
 easy JavaScript and perform complex tasks.

More infos on [https://excel-transformation-tool.com/](https://excel-transformation-tool.com/)

![alt text](src/extensions/excel-transformation-tool/src/assets/img/Logo-cropped-128.png)

### Getting strarted

Create a the ``src/extensions/excel-transformation-tool/.env`` file containing the
environment variables:

````bash
touch src/extensions/excel-transformation-tool/.env
````
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

#### Debugging Alternative

1. place this in the source code
````js
    // eslint-disable-next-line no-debugger
    debugger;
````
1. Right click on popup and open inspector.
2. ``window.location.reload(true)``