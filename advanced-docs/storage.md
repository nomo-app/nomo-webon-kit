# WebOn Storage

If a WebOn is deployed as a tar.gz, then it will be stored locally on the device upon the user's consent for installation. 
Upon launch, a local server will be initiated using different ports for each tar.gz-WebOn, ensuring a seamless and pleasant user experience.  
If a WebOn is deployed as a regular website, then it will only store small parts locally (like the nomo_manifest.json and the icon).  
Furthermore, during every launch or refresh, Nomo will check if there exists a remote-manifest with a higher webon_version.  

## Directories for Different Platforms

### *Android:*
On Android, the path for the application's documents directory typically looks like this:
`/data/data/<package_name>/files`

### *iOS:*
On iOS, the path is generally within the app's sandboxed environment:
`<app_home>/Documents/`

### *macOS:*
For macOS:
`/Users/<username>/Library/Containers/com.zeniq.app/Data/`

### *Linux:*
On Linux:
`/home/<username>/.local/share/<app_name>/`

### *Windows:*
And for Windows:
`C:\Users\<username>\AppData\Roaming\<app_name>\`

For more details and usage, refer to the [path_provider package](https://pub.dev/packages/path_provider).

Please note that the paths mentioned are general representations. 
Actual paths might differ based on specific user configurations and device settings.
