# logrocket

* logrocket:https://logrocket.com/
* doc: https://docs.logrocket.com/

use info
```
1. Install thelogrocketmodule via NPM:

npm i --save logrocket

2. Import LogRocket and callLogRocket.initlike so:

import LogRocket from 'logrocket';
LogRocket.init('mi3vvo/my-app');

```

or js

```
Add LogRocket.min.js from our CDN to the <head> tag before your other code:

<script src="https://cdn.logrocket.io/LogRocket.min.js" crossorigin="anonymous"></script>
<script>window.LogRocket && window.LogRocket.init('mi3vvo/my-app');</script>
```

### UseLogRocket.identifyto distinguish and describe your users. 
This will allow you to search for specific user sessions by name, email and id.   
It will make a major difference in your happiness! Learn more.  
// This is an example script - don't forget to change it!
```
LogRocket.identify('THE_USER_ID_IN_YOUR_APP', {
  name: 'James Morrison',
  email: 'jamesmorrison@example.com',

  // Add your own custom user variables here, ie:
  subscriptionType: 'pro'
});
```
