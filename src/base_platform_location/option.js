/*
 * @Description:
 * @Version: 1.0
 * @Author: OriX
 * @Date: 2021-01-22 15:45:26
 * @LastEditors: OriX
 * @LastEditTime: 2021-01-22 15:45:27
 * @Copyright (C) 2021 OriX. All rights reserved.
 */
// 成功部分配置
const success_btn_text_options = [
  {
    btn_title: '客户端通过',
    edit_area_text: `测网通过，客户端,  摄像头，扬声器，麦克风，设备正常。`,
    select_value: 0,
  },
  {
    btn_title: '浏览器通过',
    edit_area_text: ` 测网通过，浏览器,  摄像头，扬声器，麦克风，设备正常。`,
    select_value: 0,
  },
  {
    btn_title: '监课通过',
    edit_area_text: '监课显示 师生已上课，摄像头、麦克风、扬声器，设备正常 ',
    select_value: 0,
  },
];
// 无法调试部分配置
const unable_btn_title_options = [
  {
    btn_title: '取消',
    edit_area_text: '课程已取消  无法调试，测网工单取消，如需测网请重新预约 ',
    select_value: 23,
  },
  {
    btn_title: '改约',
    edit_area_text: '课程已改约  无法调试，测网工单取消，如需测网请重新预约 ',
    select_value: 23,
  },
  {
    btn_title: '未接',
    edit_area_text: '无人接听 / 通话中 无法调试，测网工单取消，如需测网请重新预约',
    select_value: 24,
  },
  {
    btn_title: '拒接',
    edit_area_text: '电话拒接，无法调试，测网工单取消，如需测网请重新预约',
    select_value: 25,
  },
  {
    btn_title: '生病',
    edit_area_text: '小朋友或家里人生病了，无法参加 无法调试，测网工单取消，如需测网请重新预约',
    select_value: 26,
  },
  {
    btn_title: '有事',
    edit_area_text: '临时有事，无法参加 无法调试，测网工单取消，如需测网请重新预约',
    select_value: 26,
  },
  {
    btn_title: '在外面',
    edit_area_text: '现在还在外面，赶不回去,无法参加 无法调试，测网工单取消，如需测网请重新预约',
    select_value: 26,
  },
  {
    btn_title: '拒调',
    edit_area_text: '不需要 / 自己调试，不需要我们调试，无法调试，测网工单取消，如需测网请重新预约 ',
    select_value: 27,
  },
  {
    btn_title: 'cc调试',
    edit_area_text: '家长说CC调试设备 ，无法调试，测网工单取消，如需测网请重新预约 ',
    select_value: 28,
  },
  // {
  //   btn_title: '未通过尾',
  //   edit_area_text: '无法调试，测网工单取消，如需测网请重新预约 ',
  //   select_value: 0,
  // },
];
