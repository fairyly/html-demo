# API-ApplicationCache本地缓存

window.applicationCache 对象是对浏览器的应用缓存的编程访问方式。其 status 属性可用于查看缓存的当前状态：
```
var appCache = window.applicationCache;

switch (appCache.status) {
  case appCache.UNCACHED: // UNCACHED == 0
    return 'UNCACHED';
    break;
  case appCache.IDLE: // IDLE == 1
    return 'IDLE';
    break;
  case appCache.CHECKING: // CHECKING == 2
    return 'CHECKING';
    break;
  case appCache.DOWNLOADING: // DOWNLOADING == 3
    return 'DOWNLOADING';
    break;
  case appCache.UPDATEREADY:  // UPDATEREADY == 4
    return 'UPDATEREADY';
    break;
  case appCache.OBSOLETE: // OBSOLETE == 5
    return 'OBSOLETE';
    break;
  default:
    return 'UKNOWN CACHE STATUS';
    break;
};


```

要以编程方式更新缓存，请先调用 applicationCache.update()。此操作将尝试更新用户的缓存（前提是已更改清单文件）。  
最后，当 applicationCache.status 处于 UPDATEREADY 状态时，调用 applicationCache.swapCache() 即可将原缓存换成新缓存。
```
var appCache = window.applicationCache;

appCache.update(); // Attempt to update the user's cache.

...

if (appCache.status == window.applicationCache.UPDATEREADY) {
  appCache.swapCache();  // The fetch was successful, swap in the new cache.
}
```
请注意：以这种方式使用 update() 和 swapCache() 不会向用户提供更新的资源。此流程只是让浏览器检查是否有新的清单、
下载指定的更新内容以及重新填充应用缓存。

因此，还需要对网页进行两次重新加载才能向用户提供新的内容，其中第一次是获得新的应用缓存，第二次是刷新网页内容。

要使用户更新到最新版网站，可设置监听器，以监听网页加载时的 updateready 事件：
```
// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {

  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      // Swap it in and reload the page to get the new hotness.
      window.applicationCache.swapCache();
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false);
```
