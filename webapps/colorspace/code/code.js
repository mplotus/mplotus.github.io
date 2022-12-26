const page_load = () => {
    var cls = document.getElementsByClassName('colVal');
    for(i=0;i<cls.length;i++) {
        cls[i].disabled = true;
    }
    document.getElementById('cl_selector').disabled = false;
    info = document.getElementById('get-info');
}
var info;
var radioIndex = 0;
const radio_change = () => {
    var cls = document.getElementsByClassName('colVal');
    for(i=0;i<cls.length;i++) {
        cls[i].disabled = true;
    }
    var rds = document.getElementsByClassName('rd_space');
    var rdCheck = -1;
    for(i=0;i<rds.length;i++) {
        if(rds[i].checked) { rdCheck = i; radioIndex = i; break; }
    }
    if(rdCheck == 0) {
        document.getElementById('cl_selector').disabled = false;
    }
    else if(rdCheck == 1) {
        document.getElementById('tx_hexcode').disabled = false;
    }
    else {
        var txts = document.getElementsByClassName('nb_' + rdCheck.toString());
        for(i=0;i<txts.length;i++) {
            txts[i].disabled = false;
        }
    }
}
const lb_space_click = sender => {
    var rd_spaces = document.getElementsByClassName('rd_space');
    rd_spaces[sender].checked = true;
    radio_change();
}
const roundTo = (number, digit) => {
    return (isNaN(new Number(number)))?NaN:(Math.round(number * Math.pow(10, digit)) / Math.pow(10, digit));
}
const selector_change = () => {
    if(radioIndex == 0) {
        var selValue = document.getElementById('cl_selector').value;
        selValue = selValue.toString().substring(1,7);
        document.getElementById('tx_hexcode').value = selValue;
        var hexCode = new Hexcode(selValue);
        for(i=2;i<7;i++) {
            var ctrls = document.getElementsByClassName('nb_' + i.toString());
            var ctrlCode;
            if(i==2) ctrlCode = hexCode.toRGB();
            else if(i==3) ctrlCode = hexCode.toHSL();
            else if(i==4) ctrlCode = hexCode.toHSV();
            else if(i==5) ctrlCode = hexCode.toHSI();
            else  ctrlCode = hexCode.toCMYK();
            for(j=0;j<ctrls.length;j++) {
                ctrls[j].value = roundTo(ctrlCode.item(j), 3);
            }
        }
    }
}
var hexcode_def = '';
const hexcode_focus = () => {
    hexcode_def = document.getElementById('tx_hexcode').value;
}
const hexcode_blur = () => {
    var hexCode = document.getElementById('tx_hexcode').value;
    if(hexCode == '') {
        hexCode = hexcode_def;
    }
    hexCode = trueHexcode(hexCode);
    loadFromHex(hexCode);
    var hex = new Hexcode(hexCode);
    document.getElementById('tx_hexcode').value = hex.toString();
}
const hexcode_keyup = () => {
    var hexCode = document.getElementById('tx_hexcode').value;
    var tHex = trueHexcode(hexCode);
    loadFromHex(tHex);
}
const trueHexcode = str => {
    var hexStr = '';
    for(i=0;i<str.length;i++) {
        if(!isNaN(parseInt(str[i],16))) hexStr += str[i];
    }
    return hexStr;
}
const loadFromHex = _hex => {
    if(radioIndex == 1) {
        var hexCode = new Hexcode(_hex);
        document.getElementById('cl_selector').value = '#' + hexCode.toString();
        for(i=2;i<7;i++) {
            var ctrls = document.getElementsByClassName('nb_' + i.toString());
            var ctrlCode;
            if(i==2) ctrlCode = hexCode.toRGB();
            else if(i==3) ctrlCode = hexCode.toHSL();
            else if(i==4) ctrlCode = hexCode.toHSV();
            else if(i==5) ctrlCode = hexCode.toHSI();
            else  ctrlCode = hexCode.toCMYK();
            for(j=0;j<ctrls.length;j++) {
                ctrls[j].value = roundTo(ctrlCode.item(j), 3);
            }
        }
    }
}
const number_change = () => {
    var cols = document.getElementsByClassName('nb_' + radioIndex.toString());
    if(cols.length>4 || cols.length<3) alert('Error when select color space!');
    else {
        for(i=0;i<cols.length;i++) {
            var cVal = cols[i].value;
            if(isNaN(parseFloat(cVal))) cols[i].value = 0;
            else {
                if(radioIndex==2) {
                    if(cVal<0) cols[i].value = 0;
                    if(cVal>255) cols[i].value = 255;
                }
                else {
                    if(cVal<0) cols[i].value = 0;
                    if(cVal>1) cols[i].value = 1;
                }
            }
        }
        var colorPt;
        switch (radioIndex) {
            case 2:
                colorPt = new RGB(cols[0].value, cols[1].value, cols[2].value);
                break;
            case 3:
                colorPt = new HSL(cols[0].value, cols[1].value, cols[2].value);
                break;
            case 4:
                colorPt = new HSV(cols[0].value, cols[1].value, cols[2].value);
                break;
            case 5:
                colorPt = new HSI(cols[0].value, cols[1].value, cols[2].value);
                break;
            case 6:
                colorPt = new CMYK(cols[0].value, cols[1].value, cols[2].value, cols[3].value);
                break;
            default:
                alert('Error when select color space!');
        }
        for(i=2;i<7;i++) {
            if(i==radioIndex) break;
            var ctrls = document.getElementsByClassName('nb_' + i.toString());
            var ctrlCode;
            if(i==2) ctrlCode = colorPt.toRGB();
            else if(i==3) ctrlCode = colorPt.toHSL();
            else if(i==4) ctrlCode = colorPt.toHSV();
            else if(i==5) ctrlCode = colorPt.toHSI();
            else  ctrlCode = colorPt.toCMYK();
            for(j=0;j<ctrls.length;j++) {
                ctrls[j].value = roundTo(ctrlCode.item(j), 3);
            }
        }
        document.getElementById('tx_hexcode').value = colorPt.toHexcode();
        document.getElementById('cl_selector').value = '#' + colorPt.toHexcode();
    }
}