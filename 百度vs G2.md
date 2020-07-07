# G2使用


## 认识结构

- 坐标轴 Axis
- 图例 Legend
- 几何标记 Geometry
- 提示信息 Tooltip
- 图形标记 Annotation



##  坐标轴 Axis title  问题

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


chart.guide().text({
  top: true,
  position:['10%', '-1%'], // 位置信息
  content: '最大值',
  offsetX: 0, // x 方向的偏移量
  offsetY: 0 // y 方向偏移量
});

```




## 参考
- https://g.yuque.com/antv/g2-docs/tutorial-g2-chart-composition
