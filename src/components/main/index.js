import { ConfigProvider } from "antd-next";
import zhCN from 'antd-next/locale/zh_CN';

import Guance from '../Guance';
import '../../styles/output.css';

const Main = (props) => {
  return (
    <ConfigProvider
      prefixCls="antd-next"
      locale={zhCN}
      theme={{
        components: {
          Radio: {
            colorPrimary: '#00665f',
            colorPrimaryHover: '#05766e',
            colorPrimaryActive: '#00524c',
            borderRadius: 7
          },
          Input: {
            controlHeight: 32,
            controlHeightLG: 32,
            controlHeightSM: 32,
            paddingInline: 9,
            borderRadius: 7,
            activeShadow: '',
            colorBorder: '#dfe0e0',
            activeBorderColor: '#00665f',
            hoverBorderColor: 'rgba(91,93,93,0.36)',
          },
          Button: {
            colorPrimary: '#00665f',
            colorPrimaryHover: '#05766e',
            colorPrimaryActive: '#00524c',
            borderRadius: 7
          },
          Select: {
            borderRadius: 7,
            controlHeight: 32,
            activeShadow: '',
            colorBorder: '#dfe0e0',
            colorPrimaryHover: '#00665f',
            colorPrimary: '#00665f',
            hoverBorderColor: 'rgba(91,93,93,0.36)',
          },
          Table: {
            rowHoverBg: 'lightgray'
          },
          DatePicker: {
            colorPrimaryHover: 'rgba(91,93,93,0.36)',
            activeBorderColor: '#00665f',
            activeShadow: '',
            colorPrimary: '#00665F',
            cellActiveWithRangeBg: '#ecf3f3',
            cellHoverWithRangeBg: '#b8d6d6'
          },
          Spin: {
            colorPrimary: "#00665f"
          },
          Pagination: {
            colorPrimary: "#00665f"
          }
        },
      }}
    >
      <Guance />
    </ConfigProvider>
  );
};

export default Main;
