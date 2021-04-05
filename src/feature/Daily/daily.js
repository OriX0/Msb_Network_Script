/*
 * @Description:
 * @Version: 1.0
 * @Author: OriX
 * @Date: 2021-04-05 15:46:47
 * @LastEditors: OriX
 * @LastEditTime: 2021-04-05 15:50:42
 */
// 初始化日报配置
const default_daily_obj = {
  tempDate: formate_Date_ori(),
  all_result_num: null,
  success_num: 0,
  cancel_num: 0,
  dont_num: 0,
  reject_num: 0,
  noAttend_num: 0,
  refused_num: 0,
  cc_num: 0,
  another_num: 0,
  changeTime_num: 0,
  total_page: 0,
};
// 是否正在获取日报
let isGetDaily = localStorage.getItem('isGetDaily');
// 当前的daily obj
let oriDailyObj = JSON.parse(localStorage.getItem('oriDaily'));
// 获取当前日期
let today_ori = formate_Date_ori();
// 格式化输出当前时间
function formate_Date_ori(needY = true) {
  let date = new Date();
  let dateY = date.getFullYear();
  let dateM = +date.getMonth() + 1;
  let dateD = date.getDate();
  return needY ? `${dateY}-${dateM}-${dateD}` : `${dateM}-${dateD}`;
}
//----------条件查询部分(*^▽^*)----------
let conditional_query_section = {
  // 仅有处理中的数字文本表示
  only_process_t: '0,1,0,0,0,0,0,0,0,0',
  dom: {
    // 条件查询部分
    // 全部结果状态的input元素集合
    checked_status_cboxs: document.getElementsByClassName('checked_status_checkbox'),
    // 全部任务状态的input元素集合
    task_status_cboxs: document.getElementsByClassName('task_status_checkbox'),
    // 选中全部任务状态的checkbox
    task_status_cbox: document.getElementById('task_status_all'),
    // 处理中
    processing_cbox: document.getElementById('task_status_1'),
    // 结果状态部分
    // 选中全部结果状态的checkbox
    checked_status_cbox: document.getElementById('checked_status_all'),
    // 通过
    checked_success_cbox: document.getElementById('checked_status_2'),
    // 无法调试
    checked_unable_cbox: document.getElementById('checked_status_4'),
    // 改约
    change_time_cbox: document.getElementById('checked_status_5'),
    // 条件输入框
    task_key_input: document.querySelector('#network_task > div:nth-child(4) > div > input'),
    // 查询按钮
    task_list_submit: document.getElementById('task_list_submit'),
    // 创建日报按钮
    generate_daily_btn: create_ori_btn('btn-info', '一键日报', '#015f5a'),
  },
  // 以 数字 0 1 形式返回所有状态文本
  get_all_status_text() {
    let status_arr = [];
    for (let status_one of this.dom.task_status_cboxs) {
      status_arr.push(+status_one.checked);
    }
    for (let status_one of this.dom.checked_status_cboxs) {
      status_arr.push(+status_one.checked);
    }
    return status_arr.toString();
  },
  // 重置所有条件
  reset_all_conditions() {
    this.dom.task_status_cbox.click();
    this.dom.checked_status_cbox.click();
    if (this.dom.task_status_cbox.checked) {
      this.dom.task_status_cbox.click();
    }
    if (this.dom.checked_status_cbox.checked) {
      this.dom.checked_status_cbox.click();
    }
    this.dom.task_key_input.value = null;
  },
  // 核对是否只选择了处理中
  checked_only_processing() {
    let flage = false;
    if (this.get_all_status_text() != conditional_query_section.only_process_t) {
      conditional_query_section.reset_all_conditions();
      this.dom.processing_cbox.click();
      console.log('由于checkBox 我刷新了页面');
      this.dom.task_list_submit.click();
    } else if (this.dom.task_key_input.value != '') {
      console.log('由于查询关键词 我刷新了页面');
      this.dom.task_key_input.value = '';
      this.dom.task_list_submit.click();
    } else {
      flage = true;
    }
    return flage;
  },
  // 点击今天处理的全部数量
  get_today_all_num() {
    // 重置所有条件
    this.reset_all_conditions();
    // 点击重置
    this.dom.checked_status_cbox.click();
    // 查询按钮
    this.dom.task_list_submit.click();
  },
  // 当前筛选条件结果
  get_screening_results() {
    // 4. 获取结果文本并返回
    let result_num_process_e = document.querySelector('#network > div > div.col-9 > div:nth-child(8) > div > span');
    // 剩余结果文本
    let result_num_process = result_num_process_e.innerText;
    let result_reg = /\d+/;
    residue_num = +result_num_process.match(result_reg)[0];
    console.log(residue_num);
    return residue_num;
  },
  // 获取所有结果的状态
  get_all_status_all_page(all_page_table_text) {
    const all_result_pattern = {
      success: /果：测网通过, 备注/g,
      cancel: /果：无法调试-取消课程/g,
      dont: /果：无法调试-无人接听/g,
      reject: /果：无法调试-家长拒接/g,
      noAttend: /果：无法调试-不能出席/g,
      refused: /果：无法调试-拒绝调试/g,
      cc: /果：无法调试-CC调试/g,
      another: /果：无法调试-其他/g,
      changeTime: /果：改约时间-/g,
    };
    const pattern_keys = Object.keys(all_result_pattern);
    pattern_keys.forEach(key => {
      let matchResult = all_page_table_text.match(all_result_pattern[key]);
      matchResult !== null ? (oriDailyObj[key + '_num'] += matchResult.length) : null;
    });
  },
  // 拼接所有的innerText
  joint_all_innerText() {
    console.log('this function is running');
    let all_page_table_text = document.getElementsByClassName('table')[0].innerText;
    console.log(oriDailyObj.all_url_path.length);
    oriDailyObj.all_innerText += all_page_table_text;
  },

  // 一键日报获取
  generate_daily() {
    // 获取总页数 和总接取数 并拼接url
    if (oriDailyObj.all_result_num == null) {
      let all_result_num = this.get_screening_results();
      oriDailyObj.all_result_num = all_result_num;
      oriDailyObj.total_page = Math.floor(all_result_num / 6);
      localStorage.setItem('baseUrl', window.location);
      let tempArr = [];
      for (let index = 0; index <= oriDailyObj.total_page; index++) {
        let temp_url = localStorage.getItem('baseUrl');
        tempArr.push(`${temp_url}&page=${index}`);
      }
      oriDailyObj.all_url_path = [...tempArr];
      oriDailyObj.all_innerText = '';
      let nextUrl = oriDailyObj.all_url_path.pop();
      localStorage.setItem('oriDaily', JSON.stringify(oriDailyObj));
      window.location.replace(nextUrl);
      return;
    }
    // 页面二次刷新后的获取
    this.joint_all_innerText();
    if (oriDailyObj.all_url_path.length > 0) {
      let nextUrl = oriDailyObj.all_url_path.pop();
      localStorage.setItem('oriDaily', JSON.stringify(oriDailyObj));
      window.location.replace(nextUrl);
    } else {
      // 删除正在读取日报标记
      localStorage.removeItem('isGetDaily');
      // 获取所有状态
      this.get_all_status_all_page(oriDailyObj.all_innerText);
      // 输出结果
      this.show_daily();
      // 显示在页面
    }
    //
  },
  // 一个输入框显示日报
  show_daily() {
    const userName = document.getElementById('select_member').innerText;
    const {
      success_num,
      cancel_num,
      dont_num,
      reject_num,
      noAttend_num,
      refused_num,
      cc_num,
      another_num,
      changeTime_num,
    } = oriDailyObj;
    const reuslt_text = `${userName},接取${oriDailyObj.all_result_num} 通过${success_num} 改约${changeTime_num}
    取消${cancel_num} 未接${dont_num} 拒接${reject_num} 不能出席${noAttend_num} 拒绝调试${refused_num} cc调试${cc_num} 其他${another_num}`;
    oriDailyObj.result_t = reuslt_text;
    localStorage.setItem('oriDaily', JSON.stringify(oriDailyObj));
    if (!document.getElementById('ori_daily_list')) {
      let tempD = document.createElement('div');
      tempD.innerHTML = `
        <ul class="list-group col-3" id='ori_daily_list' style="position:fixed;right:20px;top:75px;">
          <li class="list-group-item ">${reuslt_text}</li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            通过
            <span class="badge badge-primary ">${success_num}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            改约
            <span class="badge badge-primary ">${changeTime_num}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            取消
            <span class="badge badge-primary ">${cancel_num}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            未接
            <span class="badge badge-primary ">${dont_num}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            拒接
            <span class="badge badge-primary ">${reject_num}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            不能出席
            <span class="badge badge-primary ">${noAttend_num}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            拒绝调试
            <span class="badge badge-primary ">${refused_num}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            cc调试
            <span class="badge badge-primary ">${cc_num}</span>
          </li>  
          <li class="list-group-item d-flex justify-content-between align-items-center">
            其他
            <span class="badge badge-primary ">${another_num}</span>
          </li>           
        </ul>`;
      document.getElementById('network').append(tempD);
    }
  },
};
// 一键创建日报按钮功能 将正在获取改为true  将初始化obj置入
conditional_query_section.dom.generate_daily_btn.onclick = function () {
  localStorage.setItem('isGetDaily', true);
  localStorage.setItem('oriDaily', JSON.stringify(default_daily_obj));
  conditional_query_section.get_today_all_num();
};
// 如果正在获取日报 则重复执行日报获取
if (isGetDaily) {
  conditional_query_section.generate_daily();
}

let receive = document.getElementsByClassName('col-3')[0];
// 添加一键日报按钮
add_btn_to_parent(conditional_query_section.dom.generate_daily_btn, receive);
