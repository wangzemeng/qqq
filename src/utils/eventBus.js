import _ from "lodash";

class EventBus {
  /**
   * @constructor
   */
  constructor() {
    this.__listeners = {};
  }

  /**
   * register a Event
   * @param id 可选 唯一标识，通常传入config.json中的id字段
   * @param eventName  事件名
   * @param callback  事件回调
   */
  register(...args) {
    let eventName, callback
    if (args.length == 3) {
      eventName = `${args[0]}-${args[1]}`
      callback = args[2]
    } else {
      eventName = args[0]
      callback = args[1]
    }
    this.__listeners[eventName] = this.__listeners[eventName] || [];
    this.__listeners[eventName].push({
      callback
    });
  }

  /**
   * trigger a Event
   * @param id 可选 唯一标识，通常传入config.json中的id字段
   * @param eventName  事件名
   * @param context 事件传递参数
   */
  fireEvent(...args) {
    let eventName, context
    if (args.length == 3) {
      eventName = `${args[0]}-${args[1]}`
      context = args[2]
    } else {
      eventName = args[0]
      context = args[1]
    }
    let listeners = this.__listeners[eventName] || [];
    let result = true;
    _.forEach(listeners, l => {
      let callback = l.callback;
      let r = callback.call(null, context);
      if (r === false) {
        result = false;
        return false;
      }
    });
    return result;
  }

  /**
   * 注销一个事件
   * @param id 可选 唯一标识，通常传入config.json中的id字段
   * @param eventName 事件名
   * @param callback 事件回调
   */
  unregister(...args) {
    let eventName, callback
    if (args.length == 3) {
      eventName = `${args[0]}-${args[1]}`
      callback = args[2]
    } else {
      eventName = args[0]
      callback = args[1]
    }
    if (!_.isString(eventName) || _.isEmpty(this.__listeners[eventName])) {
      return;
    }
    _.remove(this.__listeners[eventName], k => {
      return k.callback === callback || callback === undefined;
    });
  }

  /**
   * 清除所有事件
   */
  clearAll() {
    this.__listeners = {};
  }

}

const eventBus = new EventBus();

export {EventBus};
export default eventBus;