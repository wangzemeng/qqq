/**
 * 自定义定时器，将在执行指定次数之后结束
 * @param {Number} time 定时器执行的时间间隔，单位ms
 * @param {Number} maxTimes 定时器最大执行次数
 * @param {Function} callback 定时器回调函数,若需要提前结束，请返回false
 */
export const customInterval = (time, maxTimes, callback) => {
  if (time < 1 || maxTimes < 1 || Object.prototype.toString.call(callback) != "[object Function]") {
    return
  }
  let count = 0
  let timer = setInterval(() => {
    count++
    if (count === maxTimes || callback() === false) {
      clearInterval(timer)
    }
  }, time)
}
/**
 * 判断两个数组是否包含相同的元素（只能比较基础数据类型）
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Boolean}
 */
export const arrayContainsSame = (arr1, arr2) => {
  let result = [...arr1, ...arr2]
  let set = new Set(result)
  if (set.size === result.length) {
    return false
  }
  return true
}
/**
 * 生成UUID，形如1688990e-c49c-4439-a50c-51dc8017cb8f,c45e18b5-27ed-4cd2-93b5-7800243b5a02
 *
 */
export const generateUUID = () => {
  let d = new Date().getTime()
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16)
  })
}
export default {
  arrayContainsSame, generateUUID
}