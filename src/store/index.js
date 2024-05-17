import { create } from 'zustand'

const useStore = create((set, get) => ({
  // states
  project: {},
  platformOptions: [],

  /**
   * 修改项目信息
   */
  setProject: (newProject) => {
    // 修改项目信息
    set({ project: newProject });

    // 修改platformOptions
    const plat = (newProject?.platforms || []).filter(v => v !== "m");
    const options = [];
    for (let i = 0; i < plat.length; i++) {
      const value = plat[i];
      if (!value) {
        continue;
      }
      let label = value;
      switch (value) {
        case "android":
          label = "Android";
          break;
        case "ios":
          label = "iOS";
          break;
        case "web":
          label = "Web";
          break;
        case "linux":
          label = "Linux";
          break;
        case "wx_miniapp":
          label = "微信小程序";
          break;
        case "baidu_miniapp":
          label = "百度小程序";
          break;
        case "gaode_miniapp":
          label = "高德小程序";
          break;
        case "m":
          label = "内嵌H5";
          break;
        case "node":
          label = "前端组件";
          break;
      }
      options.push({
        value,
        label,
      });
    }
    set({ platformOptions: options });
  },

  /**
   * 获取平台选项
   */
  getPlatformOptions: () => {
    return get()?.platformOptions
  },

  /**
  * 判断是否是移动端项目
  */
  isAppProject: () => {
    const project = get().project;
    return project?.platforms?.includes("android") || project?.platforms?.includes("ios");
  },

  /**
   * 判断是否是移动端项目
   */
  isWebProject: () => {
    const project = get().project;
    return project?.platforms?.includes("web");
  },

  /**
   * 是否是小程序项目
   */
  isMiniAppProject: () => {
    const project = get().project;
    return (
      project?.platforms?.includes("wx_miniapp") ||
      project?.platforms?.includes("ali_miniapp")
    );
  },
}))

/**
 * 如何在组件中获取store中的状态：
 *
 * 1. 在组件中引入useStore hook
 * import useStore from '../stores'
 *
 * 2. 调用钩子， 结构获取状态管理中的状态和方法
 *const { project, setProject } = useStore();
 */

export default useStore
