# export-to-excel

导出数据到excel中

## Transpile

```bash
gulp
```

## Test

```bash
npm test
```

## Bump up version

```
npm version <version>
```


## 使用说明

```
var exportToExcel = require('export-to-excel');

var sampleData = [
  {
    "subscribe": 1,
    "openid": "o7Zv3s_F0N3-h09fLN3jOIM8WNwzsdsdsdo",
    "nickname": "name1",
    "sex": 1,
    "language": "zh_CN",
    "city": "杭州",
    "province": "浙江",
    "country": "中国",
    "headimgurl": "http://wx.qlogo.cn/mmopen/s3NiblUuUDR7y3s1DsZibAja25icOumEM4KM79w8pKB5g0o2KKvVDWAqtVuCNVicZIzcqWzOS32ueOvD7tjmRVj2zQ/0",
    "subscribe_time": 1439719607,
    "remark": "",
    "groupid": 0
  },
  {
    "subscribe": 1,
    "openid": "o7Zv3sz92svh2lv_mMg1wewejY0OpU3Q8",
    "nickname": "name2",
    "sex": 1,
    "language": "zh_CN",
    "city": "",
    "province": "",
    "country": "中国",
    "headimgurl": "http://wx.qlogo.cn/mmopen/PiajxSqBRaELAI1aEUyI3lwJdMwibicvlkF8ASmIhicSYg3n29v2yHibmum2ibmvedvuXnrziaBl46mnrZe6Cb4pSMaXw/0",
    "subscribe_time": 1431691451,
    "remark": "",
    "groupid": 101
  },
  {
    "subscribe": 0,
    "openid": "o7Zv3s5yjT2MDIICMZkcvcvcvLG71dyBDlg",
    "nickname": "name3",
    "sex": 1,
    "language": "zh_CN",
    "city": "浦东新区",
    "province": "上海",
    "country": "中国",
    "headimgurl": "http://wx.qlogo.cn/mmopen/PiajxSqBRaELt5V5lD4ficPFvT2Z0ZDOHKc26BHh43NXT41WKFQUzLcdtgvBWn1jcqDSac1ib8PpsezuicNVVcbcicA/0",
    "subscribe_time": 1442406029,
    "remark": "",
    "groupid": 0
  }
];


exportToExcel.exportXLSX({
    filename: '微信粉丝列表(2015-12-30)',
    sheetname: '微信粉丝列表',
    title: [
        {
            "fieldName": "subscribe",
            "displayName": "是否关注",
            "cellWidth": 8,
            "type": "bool"  // 1:是  0:否
        },
        {
            "fieldName": "openid",
            "displayName": "OpenID",
            "cellWidth": 30
        },
        {
            "fieldName": "nickname",
            "displayName": "昵称",
            "cellWidth": 15
        },
        {
            "fieldName": "sex",
            "displayName": "性别",
            "cellWidth": 6,
            "type": "sex"  // 1:男  0:女
        },
        {
            "fieldName": "language",
            "displayName": "语言",
            "cellWidth": 8
        },
        {
            "fieldName": "city",
            "displayName": "城市",
            "cellWidth": 12
        },
        {
            "fieldName": "province",
            "displayName": "省",
            "cellWidth": 10
        },
        {
            "fieldName": "country",
            "displayName": "国家",
            "cellWidth": 10
        },
        {
            "fieldName": "headimgurl",
            "displayName": "头像",
            "cellWidth": 20
        },
        {
            "fieldName": "subscribe_time",
            "displayName": "关注时间",
            "cellWidth": 20,
            "type": "datetime"   // 2015-12-12 10:00:00
        },
        {
            "fieldName": "remark",
            "displayName": "备注",
            "cellWidth": 10
        },
        {
            "fieldName": "groupid",
            "displayName": "组",
            "cellWidth": 8
        }
    ],
    data: sampleData
})
```