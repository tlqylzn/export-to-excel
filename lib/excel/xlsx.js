'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exportXLSX = undefined;

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getChangeDisplayField(key, value, title) {
    var str;

    title.forEach(function (obj) {

        if (key === obj.fieldName) {

            if (obj.type) {
                switch (obj.type) {
                    case 'bool':
                        // 1:是  0:否
                        if (value === 1) {
                            str = "是";
                        } else {
                            str = "否";
                        }

                        break;
                    case 'sex':
                        // 性别(1: 男  0:女)
                        if (value === 1) {
                            str = "男";
                        } else {
                            str = "女";
                        }

                        break;
                    case 'datetime':
                        // 时间

                        //str = value;
                        str = (0, _moment2.default)(value * 1000).format('YYYY-MM-DD HH:mm:ss');

                        break;
                    case 'string':
                        str = value;

                        break;
                }
            } else {
                str = value;
            }
        }
    });

    return str;
}

function fromJSONArray(src, title) {
    let ws = {};
    let range = {
        // First Cell
        s: {
            // Cell address index
            c: 10000000,
            // Row address index
            r: 10000000
        },

        // Last Cell
        e: {
            // Cell address index
            c: 0,
            // Row address index
            r: 0
        }
    };

    src.forEach(function (row, rowIndex) {
        // Iterate through array (rows)


        Object.keys(row).forEach(function (key, cellIndex) {
            //let value = row[key];
            let value = rowIndex ? getChangeDisplayField(key, row[key], title) : row[key];
            let cell, cellRef;

            if (range.s.r > rowIndex) {
                range.s.r = rowIndex;
            }

            if (range.s.c > cellIndex) {
                range.s.c = cellIndex;
            }

            if (range.e.r < rowIndex) {
                range.e.r = rowIndex;
            }

            if (range.e.c < cellIndex) {
                range.e.c = cellIndex;
            }

            cell = {
                k: key,
                v: value
            };

            //console.log(cell);

            if (cell.v !== null) {

                cellRef = _xlsx2.default.utils.encode_cell({
                    c: cellIndex,
                    r: rowIndex
                });

                // Types
                switch (typeof value) {
                    case 'number':
                        cell.t = 'd';
                        break;
                    case 'boolean':
                        cell.t = 'b';
                        break;
                    default:
                        cell.t = 's';
                        break;
                }
                if (typeof value === 'number') {
                    cell.t = 'n';
                }

                ws[cellRef] = cell;
            }
        });
    });

    if (range.s.c < 10000000) {
        ws['!ref'] = _xlsx2.default.utils.encode_range(range);
    }
    // 设置列宽（字符数）
    var wscols = [];
    title.forEach(function (obj) {
        wscols.push({
            wch: obj.cellWidth || 20
        });
    });
    ws['!cols'] = wscols;

    return ws;
}

function exportXLSX(opts) {
    let title = {};
    let workbook = {
        SheetNames: [opts.sheetname],
        Sheets: {}
    };

    let formatData = [];
    if (Object.prototype.toString.call(opts.title) === '[object Array]') {
        // 格式化列的顺序
        let titleKeys = [];
        opts.title.forEach(function (f) {
            titleKeys.push(f.fieldName);
        });

        // body 数据
        opts.data.forEach(function (obj) {
            let rowObj = {};

            // 头部数据
            titleKeys.forEach(function (t) {
                rowObj[t] = obj[t];
            });
            formatData.push(rowObj);
        });

        // 取表格title
        opts.title.forEach(function (obj) {
            title[obj.fieldName] = obj.displayName;
        });

        formatData.unshift(title);
    } else {
        _debug2.default.log('title必须为array');

        return 'title必须为array';
    }

    if (!opts.filename) {
        _debug2.default.log('filename不能为空');

        return 'filename不能为空';
    }
    if (!opts.sheetname) {
        _debug2.default.log('sheetname不能为空');

        return 'sheetname不能为空';
    }

    if (formatData.length === 1) {
        _debug2.default.log('没有' + opts.sheetname + '数据');

        return '没有' + opts.sheetname + '数据';
    }

    workbook.Sheets[opts.sheetname] = fromJSONArray(formatData, opts.title);

    _xlsx2.default.writeFile(workbook, opts.filename + '.xlsx');

    return opts.filename + '.xlsx';
}

exports.exportXLSX = exportXLSX;