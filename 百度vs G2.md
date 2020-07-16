# G2使用


## 认识结构

- 坐标轴 Axis
- 图例 Legend
- 几何标记 Geometry
- 提示信息 Tooltip
- 图形标记 Annotation



##  1.坐标轴 Axis title  问题

```
this.chart.axis('avgVisitTime', {
        grid: null,
        title: {
          offset: 50,
          fontSize: 12, // 文本大小
          textAlign: 'center', // 文本对齐方式
          fill: '#303133', // 文本颜色
          position: 'end', 
          rotate: 0
        }
      });
      
      
 这个有点问题就是，不能设置 标题距离 坐标轴刻度线顶端的间距
 
 offset: {number}, // 数值，设置坐标轴标题距离坐标轴线的距离，这是水平偏移值
```

- 解决

```
// 前提需要设置padding
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: [80,60,60,60]
});

// 坐标轴标题设置 null
this.chart.axis('avgVisitTime', {
        title: null
      });


chart.guide().text({
  top: true,
  position:['10%', '-1%'], // 位置信息
  content: '最大值',
  offsetX: 0, // x 方向的偏移量
  offsetY: 0 // y 方向偏移量
});

```


## 2. tooltip 内数据格式化问题

```
import { Chart } from '@antv/g2';

const data = [
  { time: '2019-0909',  waiting:100, people: 88 },
  { time: '2019-09-10', waiting: 6, people: 3 },
  { time: '2019-09-11',  waiting: 2, people: 5 },
  { time: '2019-09-12', waiting: 9, people: 1 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding:[60, 60 ,60,60]

chart.tooltip({
  shared: true,
  itemTpl: '<li  style="padding-bottom:10px;"><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{name}: {value}</li>'
});
chart.interval()
  .position('time*waiting').size(20)
  .color('#3182bd');
chart.line()
  .position('time*people')
  .color('#fdae6b')
  .tooltip('time*people', (time, people) => {
          return {
            name: '人均访问时长',
            value: people
          };
        });

```

- 3.柱状图宽度问题

```
一般 化柱状图的时候默认自适应，如果屏幕宽度很宽，那么柱状图宽度也会变宽，反之，越窄
chart.interval().position('type*value');

# 解决可以设置柱状图宽度 size
chart.interval().position('type*value').size(30)

可是设置 size 后固定了宽度，很多数据的时候就会不行，最好判断一下
const size = data.length >7 ? 15 : 20
```



## 参考
- https://g.yuque.com/antv/g2-docs/tutorial-g2-chart-composition
