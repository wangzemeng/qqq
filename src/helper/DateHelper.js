import dayjs from "dayjs";

export function getDatePresets() {
  return [
    {
      label: '昨天',
      value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')],
    },
    {
      label: '本周',
      value: [dayjs().add(-1, 'd').startOf('week'), dayjs().add(-1, 'd')],
    },
    {
      label: '本月',
      value: [dayjs().add(-1, 'd').startOf('month'), dayjs().add(-1, 'd')],
    },
    {
      label: '过去7天',
      value: [dayjs().add(-7, 'd'), dayjs().add(-1, 'd')],
    },
    {
      label: '过去10天',
      value: [dayjs().add(-10, 'd'), dayjs().add(-1, 'd')],
    },
    {
      label: '过去30天',
      value: [dayjs().add(-30, 'd'), dayjs().add(-1, 'd')],
    }
  ]
}
