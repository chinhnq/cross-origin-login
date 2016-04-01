## Implementation
This is a sample implementation of flow 2 and 3 shown in the Web Authentication Flow proposal
https://docs.google.com/document/d/1bo7JsETJPbrveoh5Kksgn5JF2_fBMFx_TQocvbvdeXo
Web client uses user ID/Secret pair to request an ephemeral, one-time login token. 
## Server Setup
The asset (index.html) has to be served via a server running on port 3000 localhost, or it will *NOT* work.

There are multiple options for running a server on localhost. For instance with Python
```bash
> cd cross-origin-login
> python -m SimpleHTTPServer 3000
```
