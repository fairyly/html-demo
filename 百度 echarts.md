# 百度 echarts

1.使用

```
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport"
    content="width=device-width,initial-scale=1,user-scalable=no"
    id="viewport">
<meta name="format-detection" content="telephone=no" />
<title>分析表</title>
</head>
<body>
    
<div class="member-analysis_chart" id="member_info_chart_AGE" style="height:220px;"></div>

<script src="./js/jquery.min.js"></script>
<script src="./js/echarts.min.js"></script>
<script>
$(function() {
    var myChart = echarts.init(document.getElementById('member_info_chart_AGE'));
    var colors = ['#5793f3', '#d14a61', '#675bba'];
    var option_age = {
         title : {//标题
            text: '雨量流量关系图',
            subtext: '数据来自西安兰特水电测控技术有限公司',
            x: 'center',//显示位置
            align: 'right'
        },
        legend: {//图例组件展现了不同系列的标记(symbol)，颜色和名字
            data:['流量','降雨量'],
             x: 'left'//显示位置
         }, 
        grid : {//直角坐标系内绘图网格/网格显示
            left : '15%',
            right : '12%',
            top : '15%',
            bottom : '20%'
        },
        toolbox: {//显示工具栏组件,内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            show: true,//显示提示框
            trigger: 'axis',
            
            axisPointer: {//坐标轴指示器
                type: 'cross',
                animation: false,
                // label: {
                //     backgroundColor: '#ccc',
                //     borderColor: '#aaa',
                //     borderWidth: 1,
                //     shadowBlur: 0,
                //     shadowOffsetX: 0,
                //     shadowOffsetY: 0,
                //     textStyle: {
                //         color: '#222'
                //     }
                // }
            },
            formatter: function (params) {
                console.log(params);
                return '';
            }
        },
        xAxis : {//直角坐标系 grid 中的 x 轴
            name : '',
            type : 'value',
            min : 'dataMin',
            max : 'dataMax',
            top: 0,
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[0]
                }
            },
            axisPointer: {显示X轴提示信息
                triggerOn: 'none',
                label: {
                    formatter: function (params) {
                        console.log(params);
                        return '占比  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis : {直角坐标系 grid 中的 y 轴
            top: 0,
            min : 'dataMin',
            max : 'dataMax',
            axisLabel : {
                formatter : '{value}%'
            },
            axisLine: {
                show: false,
                onZero: false,
                lineStyle: {
                    color: colors[0]
                }
            },
            axisPointer: {
                show: false,//不显示Y轴提示信息
                label: {
                    formatter: function (params) {
                        console.log(params);
                        return '百分比  ' + params.value.toFixed(2)
                            + (params.seriesData.length ? '：' + params.seriesData[0].data.toFixed(2) : '');
                    }
                }
            },
        },
        series : [ {
            type : 'line',
            symbol : 'none',
            smooth: true,
            itemStyle : {
                normal : {
                    label : {show: true},//每个折点都显示数值，显示坐标的数值
                    color : '#2fb7a3'
                }
            },
            data : [[0, 0],[2, 25],[3, 25],[4, 15],[5, 30],[20, 50],[25, 25],[30, 25],[54, 15],[65, 30][100, 0]],
            // encode: {
            //     x: [1, 2],
            //     y: 0,
            //     // 表示『维度2』和『维度3』要显示到 tooltip 中。
            //     tooltip: [2, 3]
            // },
            // // 表示给『维度2』和『维度3』分别取名为『年龄』和『满意度』，显示到 tooltip 中。
            // dimensions: [null, null, '年龄', '满意度']
        } ]
    };

     myChart.setOption(option_age);
})
</script>
</body>
</html>

```
