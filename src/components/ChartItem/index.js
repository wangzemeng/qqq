import EChartsReact from "echarts-for-react";
import dayjs from "dayjs";
import { Button, Card, Empty, Flex } from "antd-next";
import { RedoOutlined } from '@ant-design/icons';
import axios from 'axios';

import { useContext } from "../../../../../context";

let cancelToken;
const { memo, useState, useEffect } = window.React;

function numToLocalString(num, digits = 0) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'm';
  } else if (num >= 10000) {
    return (num / 1000).toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'k';
  } else {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

const ChartItem = ({ title, fn, valueName, params, moreJump, calculate = (v) => v }) => {
  // const { projectInfo, hasProjectInfo } = useContext();
  const [data, setData] = useState([[], []]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (!hasProjectInfo()) return;
    getData();
  }, [
    // projectInfo
  ]);

  /**
   * 获取数据
   */
  const getData = () => {
    // 检查是否已有正在进行的请求
    if (typeof cancelToken != typeof undefined) {
      // 如果有，在进行新请求之前取消前一次请求
      cancelToken.cancel("Cancelling the previous request");
    }
    // 创建新的取消令牌
    cancelToken = axios.CancelToken.source();
    setLoading(true);

    const requestOne = fn(params[0], undefined, cancelToken.token);
    const requestTwo = fn(params[1], undefined, cancelToken.token);

    Promise.all([requestOne, requestTwo]).then((responses) => {
      // 初始化最终的数据数组包含两个位置，一个为每一个请求准备
      const finalData = [];

      responses.forEach((res, index) => {
        if (!res) {
          finalData[index] = [];
        } else {
          const resultList = (Array.isArray(res)) ? res : res.resultList || [];
          resultList.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
          const result = resultList.map(item => ({ label: item.date.split(' ')[1], value: calculate(item[valueName]) || 0 }));
          finalData[index] = result;
        }
      });

      setData(finalData);
      setLoading(false);
    }).catch((err) => {
      if (axios.isCancel(err)) {
        console.error('Request was cancelled', err.message);
      } else {
        // 处理其他错误
        setData([[], []]); // 为保持数据结构的一致性，设置两个空数组
        console.error(err);
        setLoading(false);
      }
    });
  }

  /**
   * 渲染数据
   * @returns
   */
  const renderData = () => {
    return (data[0] && data[0].length > 0) ? (
      <EChartsReact
        style={{ height: '100%', width: '100%', paddingTop: 4 }}
        option={{
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
            data: data[0].map(item => item.label)
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: function (value) {
                return numToLocalString(value)
              }
            },
          },
          series: [
            {
              name: '今日',
              data: data[0].map(item => {
                if (item.label.substr(0, 2) > new Date().getHours()) {
                  return '-'
                }
                return item.value;
              }),
              type: 'line',
              smooth: true,
              symbolSize: 5,
              color: "#62B3AA",
            },
            {
              name: '昨日',
              data: data[1].map(item => (item.value)),
              type: 'line',
              smooth: true,
              symbolSize: 5,
              color: "#BDA573",
            },
          ]
        }}
      />
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} >
        <Button type="primary" onClick={getData}>
          <RedoOutlined />
          <span>重试</span>
        </Button>
      </Empty>
    )
  }

  return (
    <Card
      title={
        <Flex gap={8} align="center" justify="space-between">
          <span>{title}</span>
          {moreJump &&
            <span
              onClick={moreJump}
              style={{ cursor: 'pointer', fontSize: 14, fontWeight: 'normal', color: '#1677ff' }}>更多</span>
          }
        </Flex>}
      size="small"
      style={{ width: 'calc((100% - 16px) / 2)', marginBottom: 16, height: 320, border: '0.5px solid rgba(121, 124, 123, 0.18)', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}
      bodyStyle={{ height: 'calc(100% - 38px)' }}
      loading={loading}
    >

      <Flex justify="center" align="center" style={{ height: '100%' }}>
        {renderData()}
      </Flex>
    </Card>
  )
}

export default memo(ChartItem);
