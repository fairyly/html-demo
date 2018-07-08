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

## 参考资料
- https://www.jianshu.com/p/e3e04cf3fc0f
