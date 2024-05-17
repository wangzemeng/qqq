// 组件可派发事件
export const events = [
  {
    key: "click",
    name: "点击",
    payload: [
      {
        name: "值",
        key: "value",
        dataType: "string"
      }
    ]
  },
  {
    key: "mounted",
    name: "组件挂载完成",
    payload: []
  }
];
// 组件可接收动作
export const actions = [
  {
    key: "message",
    name: "提示",
    params: [
      {
        key: "value",
        name: "值",
        dataType: "string"
      }
    ],
    hasReturn: false,
    // hasReturn为false则不用写returns选项
    // returns: [
    //   {
    //     key: "value",
    //     name: "值",
    //     dataType: "string"
    //   }
    // ]
  }
];

export default {
  actions,
  events
};
