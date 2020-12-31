// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接收父组件的传值
    tabs: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击处理事件
    tabsItemTap(e) {
      const { index } = e.currentTarget.dataset;
      // 触发父组件的事件
      this.triggerEvent("tabsItemChange", { index });
    },
  },
});
