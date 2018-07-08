# 天气 API

var apiLocalWeatherUrl = 'https://open.onebox.so.com/Dataapi?&query=%E5%A4%A9%E6%B0%94&type=weather&ip=&src=soindex&d=pc&url=weather';
var apiCityWeatherUrl = 'https://open.onebox.so.com/Dataapi?callback=&query=%E5%8C%97%E4%BA%AC%E5%B8%82%E5%8C%97%E4%BA%AC%E6%B5%B7%E6%B7%80%E5%A4%A9%E6%B0%94&type=weather&ip=&src=soindex&d=pc&url=http%253A%252F%252Fcdn.weather.hao.360.cn%252Fsed_api_weather_info.php%253Fapp%253DguideEngine%2526fmt%253Djson%2526code%253D';

```
1. 国家气象局
实时接口：
实时天气1：http://www.weather.com.cn/data/sk/101190408.html
实时天气2：http://www.weather.com.cn/data/cityinfo/101190408.html
实时天气3（带时间戳）：http://mobile.weather.com.cn/data/sk/101010100.html?_=1381891661455

一周天气预报接口
7天预报数据 URL： http://mobile.weather.com.cn/data/forecast/101010100.html?_=1381891660081
该接口来源气象局移动版网站，json数据格式如下

获取全国所有城市代码列表
方法一：XML接口根节点： http://flash.weather.com.cn/wmaps/xml/china.xmlXML接口主要作用是递归获取全国几千个县以上单位的城市代码，如：江苏的XML地址为：http://flash.weather.com.cn/wmaps/xml/shanghai.xml 苏州的XML地址为：http://flash.weather.com.cn/wmaps/xml/jiangsu.xml上面页面获得太仓city code：101190408合成太仓天气信息地址：http://m.weather.com.cn/data/101190408.html
下面贴一段PHP代码实现的，通过XML接口根节点递归获得全国几千个县以上城市cide code的代码，供参考(可直接在终端下运行）：
方法二：一次性获取全国+国外主要城市，8763个城市列表信息。URL：http://mobile.weather.com.cn/js/citylist.xml
2. 中国天气SmartWeatherAPI(http://smart.weather.com.cn/wzfw/smart/weatherapi.shtml)
SmartWeatherAPI接口(简称”SWA”接口)是中国气象局面向网络媒体、手机厂商、第三方气象服务机构等用户，通过web方式提供数据气象服务的官方载体。该数据主要包括预警、实况、指数、常规预报(24小时)等数据内容。
接口文档：http://download.weather.com.cn/creative/SmartWeatherAPI_Lite_WebAPI_3.0.1.rar
使用须申请，详见官网http://smart.weather.com.cn/wzfw/smart/weatherapi.shtml
3. 和风天气
数据主要包含：实时天气，3天内天气预报，生活指数，空气质量。
访问流量：4000次/天。
访问频率：200次/分钟。
URL：https://free-api.heweather.com/v5/forecast?city=yourcity&key=yourkey
city：城市名称，city可通过城市中英文名称、ID、IP和经纬度进行查询，经纬度查询格式为：经度,纬度。例：city=北京，city=beijing，city=CN101010100，city= 60.194.130.1
key：用户认证key
注册页面：https://www.heweather.com/products
接口文档：https://www.heweather.com/documents/api/v5
4. 心知天气（免费版只提供地级市数据）
包含数据：中国地级城市、天气实况、天气预报（3天）、生活指数（基础）。
访问频率限制：400次/小时
api详述：https://www.seniverse.com/doc
使用需注册。
注册地址：https://www.seniverse.com/signup
5. 彩云天气
数据包含：实时天气数据（天气、温度、湿度、风向、网速、云量、降雨量、PM2.5、空气质量指数）。
API详述：http://wiki.swarma.net/index.php/%E5%BD%A9%E4%BA%91%E5%A4%A9%E6%B0%94API/v2
url示例：https://api.caiyunapp.com/v2/TAkhjf8d1nlSlspN/121.6544,25.1552/realtime.json
https://api.caiyunapp.com/v2/TAkhjf8d1nlSlspN/121.6544,25.1552/realtime.jsonp?callback=MYCALLBACK
使用需注册
产品详单：http://labs.swarma.net/api/caiyun_api_service_price.pdf
注册页面：https://www.caiyunapp.com/dev_center/regist.html

6. 中央天气预报
url：http://tj.nineton.cn/Heart/index/all
参数如下：
  city：城市码
  language：固定值 zh-chs
  unit：温度单位固定值 c。可不填。也可省略该参数
  aqi：固定值 city。可不填。也可省略该参数
  alarm：固定值 1。可不填。也可省略该参数
  key：秘钥，固定值 78928e706123c1a8f1766f062bc8676b。可不填。也可省略该参数
url 示例：http://tj.nineton.cn/Heart/index/all?city=CHSH000000&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b 或 http://tj.nineton.cn/Heart/index/all?city=CHSH000000&language=&unit=&aqi=&alarm=&key= 或 http://tj.nineton.cn/Heart/index/all?city=CHSH000000


24小时天气预报
url：http://tj.nineton.cn/Heart/index/future24h/
拼接参数：
  city：城市
  language：语言
  key：秘钥，固定值 78928e706123c1a8f1766f062bc8676b。可不填。也可省略该参数
url 示例：http://tj.nineton.cn/Heart/index/future24h/?city=CHSH000000&language=zh-chs&key=36bdd59658111bc23ff2bf9aaf6e345c
或 http://tj.nineton.cn/Heart/index/future24h/?city=CHSH000000&language=&key=
或 http://tj.nineton.cn/Heart/index/future24h/?city=CHSH000000


```


## 心知天气

mgmtn8zv1ide8vuf
id：U98F382FB7

## 中央天气
- [中央天气预报](#weather)
- [中央天气预报细节](#weather_details)
- [code 细节](#code_details)

<h2 id="weather">中央天气预报</h2>

url：http://tj.nineton.cn/Heart/index/all

拼接参数：

- `city`：城市码，查看数据库文件中的 `townId`，[戳我查看数据库文件](https://github.com/jokermonn/-Api/blob/master/CenterWeatherCityCode.db)，另外我也转换了一份 json 文件，也是同样可以的，[戳我查看](https://github.com/jokermonn/-Api/blob/master/CenterWeatherCityCode.json)
- `language`：固定值 `zh-chs`
- `unit`：温度单位固定值 `c`。可不填。也可省略该参数
- `aqi`：固定值 `city`。可不填。也可省略该参数
- `alarm`：固定值 `1`。可不填。也可省略该参数
- `key`：秘钥，固定值 `78928e706123c1a8f1766f062bc8676b`。可不填。也可省略该参数

url 示例：[`http://tj.nineton.cn/Heart/index/all?city=CHSH000000&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b`](http://tj.nineton.cn/Heart/index/all?city=CHSH000000&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b) 或 [`http://tj.nineton.cn/Heart/index/all?city=CHSH000000&language=&unit=&aqi=&alarm=&key=`](http://tj.nineton.cn/Heart/index/all?city=CHSH000000&language=&unit=&aqi=&alarm=&key=) 或 [`http://tj.nineton.cn/Heart/index/all?city=CHSH000000`](http://tj.nineton.cn/Heart/index/all?city=CHSH000000&language=&unit=&aqi=&alarm=&key=)

json 示例：

	{
      "status": "OK",
      "weather": [
        {
          "city_name": "佛山",
          "city_id": "CHGD070000",
          "last_update": "2017-02-19T12:15:00+08:00",
          "now": {
            "text": "阴",
            "code": "9",
            "temperature": "21",
            "feels_like": "21",
            "wind_direction": "南",
            "wind_speed": "10.44",
            "wind_scale": "2",
            "humidity": "58",
            "visibility": "13.8",
            "pressure": "1014",
            "pressure_rising": "未知",
            "air_quality": {
              "city": {
                "aqi": "64",
                "pm25": "46",
                "pm10": "74",
                "so2": "9",
                "no2": "28",
                "co": "0.575",
                "o3": "108",
                "last_update": "2017-02-19T12:00:00+08:00",
                "quality": "良"
              },
              "stations": null
            }
          },
          "today": {
            "sunrise": "06:58 AM",
            "sunset": "6:27 PM",
            "suggestion": {
              "dressing": {
                "brief": "单衣类",
                "details": "建议着长袖T恤、衬衫加单裤等服装。年老体弱者宜着针织长袖衬衫、马甲和长裤。"
              },
              "uv": {
                "brief": "最弱",
                "details": "属弱紫外线辐射天气，无需特别防护。若长期在户外，建议涂擦SPF在8-12之间的防晒护肤品。"
              },
              "car_washing": {
                "brief": "不适宜",
                "details": "不宜洗车，未来24小时内有雨，如果在此期间洗车，雨水和路上的泥水可能会再次弄脏您的爱车。"
              },
              "travel": {
                "brief": "适宜",
                "details": "天气较好，温度适宜，总体来说还是好天气哦，这样的天气适宜旅游，您可以尽情地享受大自然的风光。"
              },
              "flu": {
                "brief": "易发期",
                "details": "相对今天出现了较大幅度降温，较易发生感冒，体质较弱的朋友请注意适当防护。"
              },
              "sport": {
                "brief": "比较适宜",
                "details": "阴天，较适宜进行各种户内外运动。"
              }
            }
          },
          "future": [
            {
              "date": "2017-02-19",
              "day": "周日",
              "text": "阴/小雨",
              "code1": "9",
              "code2": "13",
              "high": "24",
              "low": "18",
              "cop": "",
              "wind": "微风3级"
            },
            {
              "date": "2017-02-20",
              "day": "周一",
              "text": "阴",
              "code1": "9",
              "code2": "9",
              "high": "23",
              "low": "18",
              "cop": "",
              "wind": "微风3级"
            },
            {
              "date": "2017-02-21",
              "day": "周二",
              "text": "阵雨",
              "code1": "10",
              "code2": "10",
              "high": "22",
              "low": "18",
              "cop": "",
              "wind": "微风3级"
            },
            {
              "date": "2017-02-22",
              "day": "周三",
              "text": "小雨",
              "code1": "13",
              "code2": "13",
              "high": "23",
              "low": "13",
              "cop": "",
              "wind": "微风3级"
            },
            {
              "date": "2017-02-23",
              "day": "周四",
              "text": "小雨",
              "code1": "13",
              "code2": "13",
              "high": "20",
              "low": "10",
              "cop": "",
              "wind": "北风4级"
            },
            {
              "date": "2017-02-24",
              "day": "周五",
              "text": "小雨",
              "code1": "13",
              "code2": "13",
              "high": "14",
              "low": "10",
              "cop": "",
              "wind": "北风4级"
            },
            {
              "date": "2017-02-25",
              "day": "周六",
              "text": "小雨",
              "code1": "13",
              "code2": "13",
              "high": "15",
              "low": "10",
              "cop": "",
              "wind": "微风3级"
            },
            {
              "date": "2017-02-26",
              "day": "周日",
              "text": "小雨",
              "code1": "13",
              "code2": "13",
              "high": "15",
              "low": "10",
              "cop": "",
              "wind": "北风3级"
            },
            {
              "date": "2017-02-27",
              "day": "周一",
              "text": "小雨/多云",
              "code1": "13",
              "code2": "4",
              "high": "21",
              "low": "11",
              "cop": "",
              "wind": "北风3级"
            },
            {
              "date": "2017-02-28",
              "day": "周二",
              "text": "多云",
              "code1": "4",
              "code2": "4",
              "high": "24",
              "low": "14",
              "cop": "",
              "wind": "北风3级"
            }
          ]
        }
      ]
    }

解析：

- `status`：成功时返回 `OK`
- `weather`：天气信息
	- `city_name`：城市名
	- `city_id`：城市 id
	- `last_update`：上次更新时间
	- `now`：现在天气状况
		- `text`：天气状况
		- `code`：???
		- `temperature`：温度
		- `feels_like`：体感温度
		- `wind_direction`：风向
		- `wind_speed`：风速
		- `wind_scale`：风力大小
		- `humidity`：空气湿度
		- `visibility`：能见度，单位为 km
		- `pressure`：气压，单位为 hPa
		- `air_quality`：具体空气质量指数
			- `aqi`：空气质量指数
			- `pm25`：pm2.5指数
			- `pm10`：pm10指数
			- `so2`：二氧化硫指数
			- `no2`：二氧化氮指数
			- `co`：一氧化碳指数
			- `o3`：臭氧指数
			- `last_update`：上次更新时间
			- `quality`：空气质量
	- `today`：今日天气状况
		- `sunrise`：日出时间
		- `sunset`：日落时间
		- `suggestion`：建议列表
			- `dressing`：穿衣信息
			- `uv`：紫外线建议
			- `car_washing`：洗车信息
			- `travel`：旅游信息
			- `flu`：流感信息
			- `sport`：运动信息
				- `brief`：建议、说明
				- `details`：具体信息				
	- `future`：未来天气状况列表
		- `date`：日期
		- `day`：周几
		- `text`：天气状况
		- `code1`：???
		- `code2`：???
		- `high`：当日最高气温
		- `low`：当日最低气温
		- `cop`：???
		- `wind`：风力信息

<h2 id="weather_details">中央天气预报细节</h2>

url：http://tj.nineton.cn/Heart/index/future24h/

拼接参数：

- `city`：略，同[中央天气预报](#weather)
- `language`：略，同[中央天气预报](#weather)
- `key`：略，同[中央天气预报](#weather)

url 示例：[`http://tj.nineton.cn/Heart/index/future24h/?city=CHSH000000&language=zh-chs&key=36bdd59658111bc23ff2bf9aaf6e345c`](http://tj.nineton.cn/Heart/index/future24h/?city=CHSH000000&language=zh-chs&key=36bdd59658111bc23ff2bf9aaf6e345c) 或 [`http://tj.nineton.cn/Heart/index/future24h/?city=CHSH000000&language=&key=`](http://tj.nineton.cn/Heart/index/future24h/?city=CHSH000000&language=&key=) 或 [`http://tj.nineton.cn/Heart/index/future24h/?city=CHSH000000`](http://tj.nineton.cn/Heart/index/future24h/?city=CHSH000000)

json 示例：

	{
      "status": "OK",
      "hourly": [
        {
          "text": "多云",
          "code": "4",
          "temperature": "16",
          "time": "2017-02-19T13:00:00+08:00"
        },
        {
          "text": "多云",
          "code": "4",
          "temperature": "18",
          "time": "2017-02-19T14:00:00+08:00"
        },
        {
          "text": "多云",
          "code": "4",
          "temperature": "17",
          "time": "2017-02-19T15:00:00+08:00"
        },
        {
          "text": "多云",
          "code": "4",
          "temperature": "16",
          "time": "2017-02-19T16:00:00+08:00"
        },
        {
          "text": "多云",
          "code": "4",
          "temperature": "16",
          "time": "2017-02-19T17:00:00+08:00"
        },
        {
          "text": "多云",
          "code": "4",
          "temperature": "16",
          "time": "2017-02-19T18:00:00+08:00"
        },
        {
          "text": "多云",
          "code": "4",
          "temperature": "15",
          "time": "2017-02-19T19:00:00+08:00"
        },
        {
          "text": "多云",
          "code": "4",
          "temperature": "15",
          "time": "2017-02-19T20:00:00+08:00"
        },
        {
          "text": "多云",
          "code": "4",
          "temperature": "15",
          "time": "2017-02-19T21:00:00+08:00"
        },
        {
          "text": "多云",
          "code": "4",
          "temperature": "14",
          "time": "2017-02-19T22:00:00+08:00"
        },
        {
          "text": "多云",
          "code": "4",
          "temperature": "14",
          "time": "2017-02-19T23:00:00+08:00"
        },
        {
          "text": "多云",
          "code": "4",
          "temperature": "14",
          "time": "2017-02-20T00:00:00+08:00"
        },
        {
          "text": "多云",
          "code": "4",
          "temperature": "15",
          "time": "2017-02-20T01:00:00+08:00"
        },
        {
          "text": "小雨",
          "code": "13",
          "temperature": "15",
          "time": "2017-02-20T02:00:00+08:00"
        },
        {
          "text": "小雨",
          "code": "13",
          "temperature": "15",
          "time": "2017-02-20T03:00:00+08:00"
        },
        {
          "text": "小雨",
          "code": "13",
          "temperature": "15",
          "time": "2017-02-20T04:00:00+08:00"
        },
        {
          "text": "中雨",
          "code": "14",
          "temperature": "15",
          "time": "2017-02-20T05:00:00+08:00"
        },
        {
          "text": "中雨",
          "code": "14",
          "temperature": "13",
          "time": "2017-02-20T06:00:00+08:00"
        },
        {
          "text": "中雨",
          "code": "14",
          "temperature": "10",
          "time": "2017-02-20T07:00:00+08:00"
        },
        {
          "text": "小雨",
          "code": "13",
          "temperature": "8",
          "time": "2017-02-20T08:00:00+08:00"
        },
        {
          "text": "小雨",
          "code": "13",
          "temperature": "6",
          "time": "2017-02-20T09:00:00+08:00"
        },
        {
          "text": "小雨",
          "code": "13",
          "temperature": "5",
          "time": "2017-02-20T10:00:00+08:00"
        },
        {
          "text": "小雨",
          "code": "13",
          "temperature": "5",
          "time": "2017-02-20T11:00:00+08:00"
        },
        {
          "text": "小雨",
          "code": "13",
          "temperature": "6",
          "time": "2017-02-20T12:00:00+08:00"
        }
      ]
    }

解析：

- `status`：成功时返回 `OK`
- `hourly`：具体小时天气信息列表
	- `text`：天气状况
	- `code`：请参考 [code 细节]
	- `temperature`：温度
	- `time`：时间

<h2 id="code_details">code 细节</h2>

感谢 [@Zane6w](https://github.com/Zane6w) 整理 [#19](https://github.com/jokermonn/-Api/issues/19)

	/// 晴
    case sunny = 0
    /// 晴
    case clear = 1
    /// 晴
    case fair1 = 2
    /// 晴
    case fair2 = 3
    
    /// 多云
    case cloudy = 4
    /// 晴间多云
    case partlyCloudy1 = 5
    /// 晴间多云
    case partlyCloudy2 = 6
    /// 大部多云
    case mostlyCloudy1 = 7
    /// 大部多云
    case mostlyCloudy2 = 8
    
    /// 阴
    case overcast = 9
    /// 阵雨
    case shower = 10
    /// 雷阵雨
    case thundershower = 11
    /// 雷阵雨伴有冰雹
    case thundershowerWithHail = 12
    /// 小雨
    case lightRain = 13
    /// 中雨
    case moderateRain = 14
    /// 大雨
    case heavyRain = 15
    /// 暴雨
    case storm = 16
    /// 大暴雨
    case heavyStorm = 17
    /// 特大暴雨
    case severeStorm = 18
    
    /// 冻雨
    case iceRain = 19
    /// 雨夹雪
    case sleet = 20
    /// 阵雪
    case snowFlurry = 21
    /// 小雪
    case lightSnow = 22
    /// 中雪
    case moderateSnow = 23
    /// 大雪
    case heavySnow = 24
    /// 暴雪
    case snowstorm = 25
    
    /// 浮尘
    case dust = 26
    /// 扬沙
    case sand = 27
    /// 沙尘暴
    case duststorm = 28
    /// 强沙尘暴
    case sandstorm = 29
    /// 雾
    case foggy = 30
    /// 霾
    case haze = 31
    /// 风
    case windy = 32
    /// 大风
    case blustery = 33
    /// 飓风
    case hurricane = 34
    /// 热带风暴
    case tropicalStorm = 35
    /// 龙卷风
    case tornado = 36
    
    /// 冷
    case cold = 37
    /// 热
    case hot = 38
    
    /// 未知
    case unknown = 99
```


## 参考资料
- https://www.jianshu.com/p/e3e04cf3fc0f
