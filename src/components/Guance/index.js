import {
  Button,
  Select,
  Input,
  DatePicker,
  Table,
  Flex,
  Drawer,
  Card,
  Tooltip,
  Radio,
  Empty,
  Modal,
  message,
  Spin
} from "antd-next";
import { RedoOutlined, ExpandOutlined, RollbackOutlined, QuestionCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import ReactECharts from "echarts-for-react";
import "../../styles/output.css";
import _ from "lodash";
import axios from "axios";
import * as echarts from 'echarts';

const getJSON = async (adcode) => {
  const result = await axios.get(
    `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}_full`
  );
  return result.data;
}

const { useEffect, useState, useRef } = window.React;

const getTrend = () => {
  if (1) {
    return <ArrowDownOutlined style={{ color: 'rgb(219,74,74)' }} />;
  } else if (2) {
    return <ArrowUpOutlined style={{ color: 'rgb(30,157,52)' }} />;
  } else if (3) {
    return <ArrowUpOutlined style={{ color: 'rgb(219,74,74)' }} />
  } else {
    return <ArrowDownOutlined style={{ color: 'rgb(30,157,52)' }} />;
  }
}

const System = props => {
  const [visibile, setVisibile] = useState(false);
  const [visibile2, setVisibile2] = useState(false);
  const [mapVisibile, setMapVisibile] = useState(false);

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      y: 'bottom'
    },
    grid: {
      left: '0%',
      right: 16,
      bottom: 24,
      top: 16,
      containLabel: true,
      show: true,
      borderWidth: 0
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['a', 'b', 'c', 'd']
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '今日',
        data: [2, 3, 4, 5],
        type: 'line',
        smooth: true,
        symbolSize: 5,
        color: "#62B3AA",
      },
      {
        name: '昨日',
        data: [1, 2, 3, 4],
        type: 'line',
        smooth: true,
        symbolSize: 5,
        color: "#BDA573",
      },
    ]
  };
  const option2 = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      y: 'bottom'
    },
    grid: {
      left: '0%',
      right: 16,
      bottom: 24,
      top: 16,
      containLabel: true,
      show: true,
      borderWidth: 0
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['a', 'b', 'c', 'd']
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '今日',
        data: [2, 3, 4, 5],
        type: 'line',
        smooth: true,
        symbolSize: 5,
        color: "#62B3AA",
      },
      {
        name: '昨日',
        data: [3, 2, 1, 0],
        type: 'line',
        smooth: true,
        symbolSize: 5,
        color: "#BDA573",
      },
    ]
  };
  const [mapType, setMapType] = useState('map');
  const [areaLoading, setAreaLoading] = useState(false);
  const [areaName, setAreaName] = useState('china');

  const [areaParentCode, setAreaParentCode] = useState('100000');
  const [areaParentName, setAreaParentName] = useState('china');
  const areaRef = useRef(null);

  const areaWebPagePerformancePercentOption = {
    toolbox: {
      show: true,
      //orient: 'vertical',
      left: 'left',
      top: 'top',
      feature: {
        myRestore: {
          show: true,
          icon: 'path://M477 746q-13 0-24-5.5T428 723L146 457q-18-18-18-38.5t18-38.5l282-263q18-15 25-19 11-7 23-7 19 0 31 13t12 31v135h10q187 0 280 115 88 109 88 313 0 22-10.5 35t-25 13q-14.5 0-23.5-5-13-6-21-22-31-57-71-90t-95-48q-50-13-122-13h-10v136q0 18-12 30t-30 12z',
          title: '返回上一级',
          onclick: () => {
            if (areaName === 'china') return;
            setAreaAdcode(areaParentCode);
            setAreaName(areaParentName);
            setAreaParentCode('100000')
            setAreaParentName('china')
          }
        },
        dataView: {
          title: '数据视图',
          lang: [' ', '关闭'],
          readOnly: true,
          buttonColor: '#00665f',
          // optionToContent: function () {
          //   let series = []
          //   // let series = []?.map(({ area, p50, p75, p90 }) => ({ area, p50: p50.toFixed(0), p75: p75.toFixed(0), p90: p90.toFixed(0) }));
          //   let thead = `
          //   <tr>
          //     <th style = "padding: 0 10px">地区</th>
          //     <th style = "padding: 0 10px">p50(ms)</th>
          //     <th style = "padding: 0 10px">p75(ms)</th>
          //     <th style = "padding: 0 10px">p90(ms)</th>
          //   </tr>
          // `
          //   let tbody = '';
          //   series.forEach(item => {
          //     tbody += `
          //       <tr>
          //         <td style = "padding: 0 10px">${item.area}</th>
          //         <td style = "padding: 0 10px">${item.p50}</th>
          //         <td style = "padding: 0 10px">${item.p75}</th>
          //         <td style = "padding: 0 10px">${item.p90}</th>
          //       </tr>
          //   `
          //   })
          //   let table = `
          //     <table border="1" style="">
          //     ${thead}${tbody}</table>
          //   `;
          //   return table;
          // }
        },
      }
    },
    tooltip: {
      triggerOn: "mousemove",
      position: [20, 20],
      padding: 8,
      borderWidth: 1,
      borderColor: '#409eff',
      backgroundColor: 'rgba(255,255,255,0.7)',
      textStyle: {
        color: '#000000',
        fontSize: 13
      },
    },
    visualMap: {
      top: '20',
      right: '0',
      // min: areaMin,
      // max: areaMax,
      min: 0,
      max: 100,
      inRange: {
        color: [
          'rgb(79,161,72)',
          'rgb(87,173,79)',
          'rgb(107,186,96)',
          'rgb(142,194,119)',
          'rgb(222,203,89)',
          'rgb(243,156,70)',
          'rgb(236,108,58)',
          'rgb(234,68,59)',
        ]
      },
      text: ['High', 'Low'],
      calculable: true
    },
    geo: {
      top: 120,
      map: areaName,
      roam: true,
      show: true,
      aspectScale: 0.8,
      scaleLimit: {
        min: 0.8,
      },
      zoom: 1.4,
      label: {
        normal: {
          fontSize: 20,
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#323c48',
          borderColor: '#505a69',
        },
        emphasis: {
          areaColor: 'rgb(255,223,51)'
        }
      }
    },
    series: [
      {
        name: "世界大屏",
        type: "map",
        geoIndex: 0,
        // data: areaWebPagePerformancePercentData?.map(_ => ({ name: _.area, value: _[areaQuantile].toFixed(0) }))
        data: []
      }]
  };
  const areaWebPagePerformancePercentBarOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      y: 'bottom'
    },
    grid: {
      left: '0%',
      right: 16,
      bottom: '10%',
      top: 22,
      containLabel: true,
      show: true,
      borderWidth: 0
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: []?.map(_ => _.area),
      // data: areaWebPagePerformancePercentData?.map(_ => _.area),
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        // formatter: function (value) {
        //   return value * 100 + '%'
        // }

      },
    },
    series: [
      {
        // data: areaWebPagePerformancePercentData?.map(_ => _[areaQuantile].toFixed(0)),
        data: [1, 2, 3, 41, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3,],
        type: 'bar',
        smooth: true,
        symbolSize: 5,
        color: '#73BFB6',
      },
    ]
  };
  const [areaAdcode, setAreaAdcode] = useState('100000');
  const [chartClickFn, setChartClickFn] = useState();

  const mapOption = async () => {
    try {
      const result = await getJSON(areaAdcode);
      const { features } = result;
      const cityList = features.map(i => ({ adcode: i.properties.adcode, name: i.properties.name, parent: i.properties.parent?.adcode }))
      echarts.registerMap(areaName, result);
      const chart = echarts.init(areaRef.current)
      chart.setOption(areaWebPagePerformancePercentOption, true);

      chart.getZr().on('click', (params) => {
        if (params.target) {
          chart.off('click') //卸载之前的click
          const fn = _.debounce(async (param) => {
            if (!param) return;  // 卸载之前的param会变成undefined防止重复触发
            const { name: clickName } = param;
            const city = cityList.filter(i => i.name === clickName);
            if (city.length) {
              setAreaParentCode(city[0]?.parent)
              setAreaParentName(areaName)
              setAreaAdcode(city[0].adcode)
              setAreaName(clickName)
            }
          }, 1000);
          setChartClickFn(fn)
          chart.on('click', fn);
        }
      })
    } catch {
      console.log('没有更详细的地图了！')
    }
  }

  useEffect(() => {
    mapOption(areaName, areaAdcode);
  }, [areaName])

  return (
    <div className="px-4 py-4 w-full h-full bg-white system overflow-y-scroll">
      {/* <Breadcrumb /> */}
      <Flex gap={16}>
        <Card
          size="small"
          title={false}
          className="mb-4 flex-1"
          style={{ border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
        >
          <div className="mb-8 text-[rgba(20,21,21,0.56)]" style={{ fontSize: 14, fontFamily: 'lixiang', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'rgb(15,15,15)' }}>活跃用户</span>
            <Tooltip title={'asd'}>
              <QuestionCircleOutlined style={{ marginLeft: 4.5, color: "rgba(20,21,21,0.56)" }} />
            </Tooltip>
            <div className="text-xs">2024-04-18</div>
          </div>

          <div className="mb-10 text-3xl font-bold">14,905,302<span className="text-xs ml-2">次</span></div>
          <div style={{ color: 'rgba(20,21,21,0.56)', fontSize: 12 }}>
            较环比
            <span style={{ marginRight: 4, marginLeft: 8 }}>{getTrend()}
            </span>
            <span>{(Math.abs(213213 / 23122) * 100).toFixed(2)}%</span>
          </div>
        </Card>
        <Card
          size="small"
          title={false}
          className="mb-4 flex-1"
          style={{ border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
        >
          <div className="mb-8 text-[rgba(20,21,21,0.56)]" style={{ fontSize: 14, fontFamily: 'lixiang', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'rgb(15,15,15)' }}>新增用户</span>
            <Tooltip title={'asd'}>
              <QuestionCircleOutlined style={{ marginLeft: 4.5, color: "rgba(20,21,21,0.56)" }} />
            </Tooltip>
            <div className="text-xs">2024-04-18</div>
          </div>

          <div className="mb-10 text-3xl font-bold">14,905,302<span className="text-xs ml-2">次</span></div>
          <div style={{ color: 'rgba(20,21,21,0.56)', fontSize: 12 }}>
            较环比
            <span style={{ marginRight: 4, marginLeft: 8 }}>{getTrend()}
            </span>
            <span>{(Math.abs(213213 / 23122) * 100).toFixed(2)}%</span>
          </div>
        </Card>

        <Card
          size="small"
          title={false}
          className="mb-4 flex-1"
          style={{ border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
        >
          <div className="mb-8 text-[rgba(20,21,21,0.56)]" style={{ fontSize: 14, fontFamily: 'lixiang', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'rgb(15,15,15)' }}>人均拨打电话次数</span>
            <Tooltip title={'asd'}>
              <QuestionCircleOutlined style={{ marginLeft: 4.5, color: "rgba(20,21,21,0.56)" }} />
            </Tooltip>
            <div className="text-xs">2024-04-18</div>
          </div>

          <div className="mb-10 text-3xl font-bold">14,905,302<span className="text-xs ml-2">次</span></div>
          <div style={{ color: 'rgba(20,21,21,0.56)', fontSize: 12 }}>
            较环比
            <span style={{ marginRight: 4, marginLeft: 8 }}>{getTrend()}
            </span>
            <span>{(Math.abs(213213 / 23122) * 100).toFixed(2)}%</span>
          </div>
        </Card>

        <Card
          size="small"
          title={false}
          className="mb-4 flex-1"
          style={{ border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
        >
          <div className="mb-8 text-[rgba(20,21,21,0.56)]" style={{ fontSize: 14, fontFamily: 'lixiang', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'rgb(15,15,15)' }}>定制机人均使用时长</span>
            <Tooltip title={'asd'}>
              <QuestionCircleOutlined style={{ marginLeft: 4.5, color: "rgba(20,21,21,0.56)" }} />
            </Tooltip>
            <div className="text-xs">2024-04-18</div>
          </div>

          <div className="mb-10 text-3xl font-bold">14,905,302<span className="text-xs ml-2">次</span></div>
          <div style={{ color: 'rgba(20,21,21,0.56)', fontSize: 12 }}>
            较环比
            <span style={{ marginRight: 4, marginLeft: 8 }}>{getTrend()}
            </span>
            <span>{(Math.abs(213213 / 23122) * 100).toFixed(2)}%</span>
          </div>
        </Card>
      </Flex>

      <Flex gap={16}>
        <Card
          size="small"
          title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>活跃用户</span>

            <Button type="text" onClick={() => {
              setVisibile(true)
            }}>
              <ExpandOutlined />
            </Button>
          </div>}
          style={{ flex: 1, height: 286, border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
          bodyStyle={{ padding: 8, minHeight: 240 }}
        >
          {
            false
              ?
              <div style={{ height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
                <Button onClick={() => {
                  // getRenderingTimeIntervalChart()
                }} className="mt-1" type="primary" icon={<RedoOutlined />} >重试</Button>
              </div>
              :
              <ReactECharts
                option={option}
                style={{ height: 240, width: '100%' }}
              />
          }
        </Card>
        <Card
          size="small"
          title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>新增用户</span>

            <Button type="text" onClick={() => {
              setVisibile2(true)
            }}>
              <ExpandOutlined />
            </Button>
          </div>}
          style={{ flex: 1, height: 286, border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
          bodyStyle={{ padding: 8, minHeight: 240 }}
        >
          {
            false
              ?
              <div style={{ height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
                <Button onClick={() => {
                  // getRenderingTimeIntervalChart()
                }} className="mt-1" type="primary" icon={<RedoOutlined />} >重试</Button>
              </div>
              :
              <ReactECharts
                option={option2}
                style={{ height: 240, width: '100%' }}
              />
          }
        </Card>
      </Flex>

      <Flex gap={16}>
        <Card
          size="small"
          title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>人均拨打电话次数</span>

            <Button type="text" onClick={() => {
              setVisibile(true)
            }}>
              <ExpandOutlined />
            </Button>
          </div>}
          style={{ flex: 1, height: 286, border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
          bodyStyle={{ padding: 8, minHeight: 240 }}
        >
          {
            false
              ?
              <div style={{ height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
                <Button onClick={() => {
                  // getRenderingTimeIntervalChart()
                }} className="mt-1" type="primary" icon={<RedoOutlined />} >重试</Button>
              </div>
              :
              <ReactECharts
                option={option}
                style={{ height: 240, width: '100%' }}
              />
          }
        </Card>
        <Card
          size="small"
          title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>定制机人均使用时长</span>

            <Button type="text" onClick={() => {
              setVisibile2(true)
            }}>
              <ExpandOutlined />
            </Button>
          </div>}
          style={{ flex: 1, height: 286, border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
          bodyStyle={{ padding: 8, minHeight: 240 }}
        >
          {
            false
              ?
              <div style={{ height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
                <Button onClick={() => {
                  // getRenderingTimeIntervalChart()
                }} className="mt-1" type="primary" icon={<RedoOutlined />} >重试</Button>
              </div>
              :
              <ReactECharts
                option={option2}
                style={{ height: 240, width: '100%' }}
              />
          }
        </Card>
      </Flex>


      <Flex gap={16} className="py-4">
        <Card
          size="small"
          title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>应用使用频率</span>

            <Button type="text" onClick={() => {
              setVisibile(true)
            }}>
              <ExpandOutlined />
            </Button>
          </div>}
          style={{ flex: 1, height: 286, border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
          bodyStyle={{ padding: 8, minHeight: 240 }}
        >
          {
            false
              ?
              <div style={{ height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
                <Button onClick={() => {
                  // getRenderingTimeIntervalChart()
                }} className="mt-1" type="primary" icon={<RedoOutlined />} >重试</Button>
              </div>
              :
              <ReactECharts
                option={option}
                style={{ height: 240, width: '100%' }}
              />
          }
        </Card>
        <Card
          size="small"
          title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>应用使用时长</span>

            <Button type="text" onClick={() => {
              setVisibile2(true)
            }}>
              <ExpandOutlined />
            </Button>
          </div>}
          style={{ flex: 1, height: 286, border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
          bodyStyle={{ padding: 8, minHeight: 240 }}
        >
          {
            false
              ?
              <div style={{ height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
                <Button onClick={() => {
                  // getRenderingTimeIntervalChart()
                }} className="mt-1" type="primary" icon={<RedoOutlined />} >重试</Button>
              </div>
              :
              <ReactECharts
                option={option2}
                style={{ height: 240, width: '100%' }}
              />
          }
        </Card>
      </Flex>



      <div className="w-full rounded-lg">
      {
        false
          ?
          <div className="flex flex-col justify-center items-center py-6 bg-white rounded-lg boxShadow">
            <Empty />
            <Button
              className="mt-1"
              type="primary"
              onClick={() => {
                // TAB_TO_DATA[tab].listRequest(TAB_TO_DATA[tab].requestTime);
              }} icon={<RedoOutlined />} >重试</Button>
          </div>
          :
          <Flex
            style={{
              border: '0.5px solid rgba(121,124,123,0.18)',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
              borderRadius: 9,
              padding: 4
            }}
          >

            <Table
              tableLayout="fixed"
              rowKey={'url'}
              // onRow={(record) => {
              //   return {
              //     onClick: () => {
              //       const appid = window.APP_SDK_DATA.store.id;
              //       const menuId = window.APP_SDK_DATA.store.menuDatas.find(item => item.name === "请求异常详情").id
              //       window.open(`?appid=${appid}&menuId=${menuId}&id=${APP_ID}&requestTime=${TAB_TO_DATA[tab].requestTime}&requestUrl=${record.url}&type=${tab}`)
              //     }
              //   }
              // }}
              loading={false}
              size="small"
              // pagination={{
              //   pageSize: 10,
              //   current: TAB_TO_DATA[tab].current,
              //   showSizeChanger: false,
              //   // showQuickJumper: total > 100 ? true : false
              //   onChange: (v) => {
              //     TAB_TO_DATA[tab].setCurrent(v)
              //   }
              // }}
              columns={[
                {
                  title: '请求URL',
                  dataIndex: 'url',
                  key: 'url',
                  render: (text) => <div
                    style={{ color: 'rgb(22, 119, 255)' }}
                    className="cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis"
                  >{text}</div>,
                },
                {
                  title: '报错数',
                  key: 'errorCount',
                  dataIndex: 'errorCount',
                  fixed: 'right',
                  width: 100,
                  render: (text) => Number(text).toLocaleString()
                },
                {
                  title: '错误率',
                  dataIndex: 'rate',
                  key: 'rate',
                  width: 100,
                  render: (rate) => `${(rate * 100).toFixed(2)}%`
                },
                {
                  title: 'pv',
                  dataIndex: 'pv',
                  key: 'pv',
                  fixed: 'right',
                  width: 100,
                  render: (text) => (Number(text).toLocaleString())
                },
              ]}
              dataSource={[{url:'www.www', errorCount: 122, pv: 4415, rate: 0.002441}]}
              scroll={{ x: '100%' }}
            />
          </Flex>
      }
    </div>


      <Card
        size="small"
        title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>地区</span>

          <div>
            <Radio.Group value={mapType} onChange={(e) => {
              setMapType(e.target.value)
            }}>
              <Radio.Button value="map">地图</Radio.Button>
              <Radio.Button value="bar">图表</Radio.Button>
            </Radio.Group>
            {/* <Button type="text" onClick={() => {
              setMapVisibile(true)
            }}>
              <ExpandOutlined />
            </Button> */}
          </div>

        </div>}
        style={{ flex: 1, marginTop: 16, flexShrink: 0, border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
        bodyStyle={{ padding: 8, height: 536, overflow: 'hidden' }}
      >
        {
          false
            ?
            <div style={{ height: 536, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Empty />
              <Button onClick={() => {
                // getAreaWebPagePerformancePercentDataChart();
              }} className="mt-1" type="primary" icon={<RedoOutlined />} >重试</Button>
            </div>
            :

            <div
              id="areaChart"
              ref={areaRef}
              // style={{ height: 350, display: areaWebPagePerformancePercentError || mapType !== 'map' ? 'none' : 'block' }}
              style={{ height: 520, display: false || mapType !== 'map' ? 'none' : 'block' }}
            />
        }
        {mapType !== 'map' &&
          <ReactECharts
            option={areaWebPagePerformancePercentBarOption}
            style={{ height: 530, width: '100%' }}
          />}
      </Card>


      {/* 设备列表&用户列表 */}



      <Flex gap={16} style={{marginTop:16}}>
        <Card
          size="small"
          title={false}
          className="mb-4 flex-1"
          style={{ border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
        >
          <div className="mb-8 text-[rgba(20,21,21,0.56)]" style={{ fontSize: 14, fontFamily: 'lixiang', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'rgb(15,15,15)' }}>定制机业务数据上传流量</span>
            <Tooltip title={'asd'}>
              <QuestionCircleOutlined style={{ marginLeft: 4.5, color: "rgba(20,21,21,0.56)" }} />
            </Tooltip>
            <div className="text-xs">2024-04-18</div>
          </div>

          <div className="mb-10 text-3xl font-bold">14,905,302<span className="text-xs ml-2">次</span></div>
          <div style={{ color: 'rgba(20,21,21,0.56)', fontSize: 12 }}>
            较环比
            <span style={{ marginRight: 4, marginLeft: 8 }}>{getTrend()}
            </span>
            <span>{(Math.abs(213213 / 23122) * 100).toFixed(2)}%</span>
          </div>
        </Card>
        <Card
          size="small"
          title={false}
          className="mb-4 flex-1"
          style={{ border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
        >
          <div className="mb-8 text-[rgba(20,21,21,0.56)]" style={{ fontSize: 14, fontFamily: 'lixiang', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'rgb(15,15,15)' }}>丢失率</span>
            <Tooltip title={'asd'}>
              <QuestionCircleOutlined style={{ marginLeft: 4.5, color: "rgba(20,21,21,0.56)" }} />
            </Tooltip>
            <div className="text-xs">2024-04-18</div>
          </div>

          <div className="mb-10 text-3xl font-bold">14,905,302<span className="text-xs ml-2">次</span></div>
          <div style={{ color: 'rgba(20,21,21,0.56)', fontSize: 12 }}>
            较环比
            <span style={{ marginRight: 4, marginLeft: 8 }}>{getTrend()}
            </span>
            <span>{(Math.abs(213213 / 23122) * 100).toFixed(2)}%</span>
          </div>
        </Card>
      </Flex>
      <Flex gap={16}>
        <Card
          size="small"
          title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>定制机业务数据上传流量</span>

            <Button type="text" onClick={() => {
              setVisibile(true)
            }}>
              <ExpandOutlined />
            </Button>
          </div>}
          style={{ flex: 1, height: 286, border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
          bodyStyle={{ padding: 8, minHeight: 240 }}
        >
          {
            false
              ?
              <div style={{ height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
                <Button onClick={() => {
                  // getRenderingTimeIntervalChart()
                }} className="mt-1" type="primary" icon={<RedoOutlined />} >重试</Button>
              </div>
              :
              <ReactECharts
                option={option}
                style={{ height: 240, width: '100%' }}
              />
          }
        </Card>
        <Card
          size="small"
          title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>丢失率</span>

            <Button type="text" onClick={() => {
              setVisibile2(true)
            }}>
              <ExpandOutlined />
            </Button>
          </div>}
          style={{ flex: 1, height: 286, border: '0.5px solid rgba(121,124,123,0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
          bodyStyle={{ padding: 8, minHeight: 240 }}
        >
          {
            false
              ?
              <div style={{ height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
                <Button onClick={() => {
                  // getRenderingTimeIntervalChart()
                }} className="mt-1" type="primary" icon={<RedoOutlined />} >重试</Button>
              </div>
              :
              <ReactECharts
                option={option2}
                style={{ height: 240, width: '100%' }}
              />
          }
        </Card>
      </Flex>


      <Modal footer={null} open={visibile || visibile2 || mapVisibile} centered width={810} title={''} onCancel={() => {
        setVisibile(false)
        setVisibile2(false)
        setMapVisibile(false)
      }} styles={{ mask: { backdropFilter: 'blur(5px)' } }} >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          {
            visibile &&
            <ReactECharts
              option={option}
              style={{ height: 525, width: 725 }}
            />
          }
          {
            visibile2 &&
            <ReactECharts
              option={option2}
              style={{ height: 525, width: 725 }}
            />
          }
          {/* {mapVisibile &&
            <ReactECharts
              option={areaWebPagePerformancePercentOption}
              style={{ height: 520, width: 725 }}
            />} */}
        </div>
      </Modal>
    </div >
  );
};

export default System;
