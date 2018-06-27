# 根据id和父id整合


原数组结构

```
leftMenuRouter: [
            {
                "menuCode": "xcx_02",
                "menuName": "主题设置",
                "project": "gic-web",
                "menuUrl": "public_num_defined",
                "target": 0,
                "iconUrl": "icon-shequ-zhutifenxiang",
                "parentCode": "xcx_01",
                "isRouter": 1,
                "level": 3,
                "level4List": []
            },
            {
                "menuCode": "xcx_03",
                "menuName": "导航设置",
                "project": "gic-web",
                "menuUrl": "navSetting",
                "target": 0,
                "iconUrl": "icon-daohang-",
                "parentCode": "xcx_01",
                "isRouter": 1,
                "level": 3,
                "level4List": []
            },
            {
                "menuCode": "xcx_04",
                "menuName": "自定义页面",
                "project": "gic-web",
                "menuUrl": "custom",
                "target": 0,
                "iconUrl": "icon-icon_zidingyiyemianshezhi",
                "parentCode": "xcx_01",
                "isRouter": 1,
                "level": 3,
                "level4List": []
            },
            {
                "menuCode": "xcx_05",
                "menuName": "会员功能页面",
                "project": "gic-web",
                "menuUrl": "",
                "target": 0,
                "iconUrl": "icon-huiyuan-",
                "parentCode": "xcx_01",
                "isRouter": 1,
                "level": 3,
                "level4List": [
                  {
                      "menuCode": "xcx_06",
                      "menuName": "会员体系",
                      "project": "gic-web",
                      "menuUrl": "member",
                      "target": 0,
                      "iconUrl": "",
                      "parentCode": "xcx_05",
                      "isRouter": 1,
                      "level": 4,
                      "level4List": null
                  },
                  {
                      "menuCode": "xcx_07",
                      "menuName": "会员中心",
                      "project": "gic-web",
                      "menuUrl": "membercenter",
                      "target": 0,
                      "iconUrl": "",
                      "parentCode": "xcx_05",
                      "isRouter": 1,
                      "level": 4,
                      "level4List": null
                  }
                ]
            }
          ]
```
