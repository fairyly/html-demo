# 根据id和父id整合


原数组结构

```
dataObj: [
            {
              "menuCode": "m06",
              "menuName": "企业管理",
              "project": "gic-web",
              "menuUrl": "",
              "target": 0,
              "iconUrl": "",
              "parentCode": "0",
              "isRouter": 1,
              "level": 1,
              "level4List": null
          },
          {
              "menuCode": "xcx_01",
              "menuName": "小程序配置",
              "project": "gic-web",
              "menuUrl": "themeSetting",
              "target": 0,
              "iconUrl": "",
              "parentCode": "m08",
              "isRouter": 1,
              "level": 2,
              "level4List": null
          },
          {
              "menuCode": "m10",
              "menuName": "好办后台",
              "project": "gic-web",
              "menuUrl": "",
              "target": 0,
              "iconUrl": "",
              "parentCode": "0",
              "isRouter": 1,
              "level": 1,
              "level4List": null
          },
          {
              "menuCode": "m08",
              "menuName": "配置中心",
              "project": "gic-web",
              "menuUrl": "",
              "target": 0,
              "iconUrl": "",
              "parentCode": "0",
              "isRouter": 1,
              "level": 1,
              "level4List": null
          },
          {
              "menuCode": "m07",
              "menuName": "商品管理",
              "project": "gic-web",
              "menuUrl": "",
              "target": 0,
              "iconUrl": "",
              "parentCode": "0",
              "isRouter": 1,
              "level": 1,
              "level4List": null
          },
          {
              "menuCode": "m05",
              "menuName": "积分商城",
              "project": "gic-web",
              "menuUrl": "",
              "target": 0,
              "iconUrl": "",
              "parentCode": "0",
              "isRouter": 1,
              "level": 1,
              "level4List": null
          },
          {
              "menuCode": "m04",
              "menuName": "营销管理",
              "project": "gic-web",
              "menuUrl": "",
              "target": 0,
              "iconUrl": "",
              "parentCode": "0",
              "isRouter": 1,
              "level": 1,
              "level4List": null
          },
          {
              "menuCode": "m03",
              "menuName": "福利中心",
              "project": "gic-web",
              "menuUrl": "",
              "target": 0,
              "iconUrl": "",
              "parentCode": "0",
              "isRouter": 1,
              "level": 1,
              "level4List": null
          },
          {
              "menuCode": "m02",
              "menuName": "会员管理",
              "project": "gic-web",
              "menuUrl": "",
              "target": 0,
              "iconUrl": "",
              "parentCode": "0",
              "isRouter": 1,
              "level": 1,
              "level4List": null
          },
          {
              "menuCode": "m01",
              "menuName": "数据分析",
              "project": "gic-web",
              "menuUrl": "",
              "target": 0,
              "iconUrl": "",
              "parentCode": "0",
              "isRouter": 1,
              "level": 1,
              "level4List": null
          },
          {
              "menuCode": "goods_brand",
              "menuName": "商品字段管理",
              "project": "goods",
              "menuUrl": "/goods/#/goodsBrand",
              "target": 0,
              "iconUrl": "",
              "parentCode": "m07",
              "isRouter": 0,
              "level": 2,
              "level4List": null
          },
          {
              "menuCode": "ewm_2",
              "menuName": "二维码管理",
              "project": "gic-web",
              "menuUrl": "erweima",
              "target": 0,
              "iconUrl": "icon-icon-Qrcode",
              "parentCode": "m08",
              "isRouter": 1,
              "level": 2,
              "level4List": null
          }
          ]
```


 // 把父级和子级分离
        dataObj.forEach(function(ele,index){
          if(ele.parentCode == 0){
            list.push(ele)
          }else {
            lists.push(ele)
          }
        })
        // 把子级添加到父级中
        // console.log("list:",list,lists)
        list.forEach(function(ele,index){
          // if(ele.parentCode == 0){
          //   ele.children = [];
          // }
          ele.children = []
          // console.log(index)
          lists.forEach(function(el,ind) {
              if(el.parentCode == ele.menuCode ){
                // console.log(index,ind)
                ele.children.push(el)
              }
          })
        })
        console.log("处理后的菜单 list:",list)
