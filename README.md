# Live PHP extension for VS Code

Live PHP is an extension that helps you automatically refresh UI or designs in PHP projects, which are not included by default. Additionally, it allows you to manage routes without having to manually type them into the browser, with simple configuration in your VS Code.

## Features

- Hot Reload for the UI being developed with PHP.
- Default handling of routes without manual browser input.
- Supports PHP, JavaScript (js), TypeScript (ts), CSS, and HTML files by default.
- Create default folders route (views and root file with small example code).
- Folder naming configuration for routes.
- Terminal configuration for visibility.
- Cleaning files created after closing the extension.

## Requirements

Before installing the extension, ensure that the following are installed on your operating system:

- Node.js
- PHP -- It can be (xammp, laragon or any but php must work in your vscode).
- Updated browser (Chrome, Brave, Firefox, or Microsoft Edge).

To verify installation, execute the following commands in your PowerShell or integrated terminal of VS Code:

```
node -v   // for Node.js
php -v   // for PHP
```

Make necessary configurations to ensure proper functionality in your VS Code. Visit official pages or tutorials if you encounter any issues.

## Installation

- Open Visual Studio Code.
- Go to the Extensions view (Ctrl+Shift+X).
- Search for "Live PHP".
- Click on "Install".

## Usage

Once you've verified the requirements and installed the extension, you can do the following.

- Start - Go to your VS Code command palette, search for or execute Start Live PHP this will open the browser on an available port on your computer.

- Stop - Go to your VS Code command palette, search for or execute Stop Live PHP or open your terminal where running then close the Live PHP (PHP) terminal.

- Change the name of the folder route handler for the browser - Go to your VS Code settings open json and write live-php.folderRouteWtach change its default value to custom name, then it will automatically change the watcher.

- Browser Refresh - To refresh just save the file or change the file with the command `Ctrl + S` or `Cmd + S`, then it will automatically refresh the browser.

## Configuration

You can configure the following:

```bash
  {
    "files.autoSave": "onFocusChange",   // recomended config your vscode
    "live-php.showTerminal": "off",  //  "on"
    "live-php.folderRouteWatch": "views"  // "custom-name"
  }
```

The showTerminal setting allows you to open the integrated terminal of VS Code when executing the start of the extension, it may be necessary to see what PHP is doing.

The folderRouteWatch (folder) setting is very important because it will handle routes in the browser. Any file within pages or custom name configuration will be considered a route.

The folder "views" or "custom-name" can be within other folders or files no matter only that folder will be observed as routes.

If it does not reflect the changes made in your configuration please restart the extension first stop the extension with Stop Live PHP and then run Start Live PHP. It should solve any existing problem.

## License

This project is licensed under the [MIT Licence](https://opensource.org/licenses/MIT).

---
