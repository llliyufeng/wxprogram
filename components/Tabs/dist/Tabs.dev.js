"use strict";

// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接收父组件的传值
    tabs: {
      type: Array,
      value: []
    }
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
    tabsItemTap: function tabsItemTap(e) {
      var index = e.currentTarget.dataset.index; // 触发父组件的事件

      this.triggerEvent("tabsItemChange", {
        index: index
      });
    }
  }
});
//# sourceMappingURL=Tabs.dev.js.map
