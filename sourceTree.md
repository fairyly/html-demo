# sourcetree

## SourceTree安装时跳过登录

安装之后，转到用户本地文件夹下的 SourceTree 目录，没有则新建：

- %LocalAppData%\Atlassian\SourceTree\

新建 accounts.json 文件

- %LocalAppData%\Atlassian\SourceTree\accounts.json

```
[
  {
    "$id": "1",
    "$type": "SourceTree.Api.Host.Identity.Model.IdentityAccount, SourceTree.Api.Host.Identity",
    "Authenticate": true,
    "HostInstance": {
      "$id": "2",
      "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountInstance, SourceTree.Host.AtlassianAccount",
      "Host": {
        "$id": "3",
        "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountHost, SourceTree.Host.AtlassianAccount",
        "Id": "atlassian account"
      },
      "BaseUrl": "https://id.atlassian.com/"
    },
    "Credentials": {
      "$id": "4",
      "$type": "SourceTree.Model.BasicAuthCredentials, SourceTree.Api.Account",
      "Username": "",
      "Email": null
    },
    "IsDefault": false
  }
]
```

## 安装

选择使用 被sourcetree 内嵌版 的

## 参考资料
- https://juejin.im/post/5b4d66125188251ace75ba27
