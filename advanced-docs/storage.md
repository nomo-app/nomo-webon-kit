# WebOn Storage

WebOns will be stored locally on the device upon the User's consent for installation. 
Prior to installation, the Manifest will be retrieved in a unified stream to acquire essential details such as the app_id, URL, version, and other relevant information.

Additionally, a local server will be initiated using different ports for each WebOn, ensuring a seamless and pleasant user experience while interacting with the WebOns.

## Directories for Different Platforms

### *Android:*
On Android, the path for the application's documents directory typically looks like this:
`/data/data/<package_name>/files`

### *iOS:*
On iOS, the path is generally within the app's sandboxed environment:
`<app_home>/Documents/`

### *macOS:*
For macOS:
`/Users/<username>/Library/Containers/<bundle_identifier>/Data/Documents`

### *Linux:*
On Linux:
`/home/<username>/.local/share/<app_name>/`

### *Windows:*
And for Windows:
`C:\Users\<username>\AppData\Roaming\<app_name>\`

For more details and usage, refer to the [path_provider package](https://pub.dev/packages/path_provider).

Please note that the paths mentioned are general representations. 
Actual paths might differ based on specific user configurations and device settings.