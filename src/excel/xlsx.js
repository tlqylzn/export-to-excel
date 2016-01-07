import XLSX from 'xlsx';
import { isArray } from 'lodash';
import moment from 'moment';

function getChangeDisplayField (key, value, title){
    var str;

    title.forEach((obj) => {
        
        if(key === obj.fieldName) {

            if(obj.type){
                switch(obj.type) {
                    case 'bool':
                        // 1:是  0:否
                        if(value === 1) {
                            str = "是";
                        } else {
                            str = "否";
                        }

                        break;
                    case 'sex':
                        // 性别(1: 男  0:女)
                        if(value === 1) {
                            str = "男";
                        } else {
                            str = "女";
                        }

                        break;
                    case 'datetime':
                        // 时间
                        
                        //str = value;
                        str = moment(value * 1000).format('YYYY-MM-DD HH:mm:ss');

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


    src.forEach((row, rowIndex) => {
        // Iterate through array (rows)

        
        Object.keys(row).forEach((key, cellIndex) => {
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

                cellRef = XLSX.utils.encode_cell({
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
        ws['!ref'] = XLSX.utils.encode_range(range);
    }
    // 设置列宽（字符数）
    var wscols = [];
    title.forEach((obj) => {
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
        SheetNames: [
            opts.sheetname
        ],
        Sheets: {}
    };

    let formatData = [];
    if (isArray(opts.title)) {
        // 格式化列的顺序
        let titleKeys = [];
        opts.title.forEach((f) => {
            titleKeys.push(f.fieldName);
        });
        
        // body 数据
        opts.data.forEach((obj) => {
            let rowObj = {};

            // 头部数据
            titleKeys.forEach((t) => {
                rowObj[t] = obj[t];
            });
            formatData.push(rowObj);
        });

        // 取表格title
        opts.title.forEach((obj) => {
            title[obj.fieldName] = obj.displayName;
        });

        formatData.unshift(title);
        
    } else {
        return 'title必须为array';
    }

    if (!opts.filename) {
        return 'filename不能为空';
    }
    if (!opts.sheetname) {
        return 'sheetname不能为空';
    }

    if (formatData.length === 1) {
        return '没有' + opts.sheetname + '数据';
    }


    workbook.Sheets[opts.sheetname] = fromJSONArray(formatData, opts.title);

    XLSX.writeFile(workbook, opts.filename + '.xlsx');

    return opts.filename + '.xlsx';
}


export {
    exportXLSX
};