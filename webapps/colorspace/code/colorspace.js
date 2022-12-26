// ===== COLOR SPACE ALL CLASSES =====
// 1.RGB Color space
class RGB {
    constructor(_red, _green, _blue) {
        var tr, tg, tb;
        tr = parseInt(_red);
        tg = parseInt(_green);
        tb = parseInt(_blue);
        if(isNaN(tr) || isNaN(tg) || isNaN(tb)) {
            this.Red = NaN; this.Green = NaN; this.Blue = NaN;
        }
        else {
            this.Red = (tr<0)?0:((tr>255)?255:tr);
            this.Green = (tg<0)?0:((tg>255)?255:tg);
            this.Blue = (tb<0)?0:((tb>255)?255:tb);
        }
    }
    toString() {
        return this.Red + ';' + this.Green + ';' + this.Blue;
    }
    toHexcode() {
        return toHexcode(this);
    }
    toHSL() {
        return toHSL(this);
    }
    toHSV() {
        return toHSV(this);
    }
    toHSI() {
        return toHSI(this);
    }
    toCMYK() {
        return toCMYK(this);
    }
    item(_index) {
        return (_index==0)?this.Red:((_index==1)?this.Green:((_index==2)?this.Blue:NaN));
    }
}
// 2.Hexcode
class Hexcode {
    constructor(_hexcode) {
        if((_hexcode.length > 6) || (_hexcode.length < 0)) this.Hexcode = NaN;
        else {
            var iChr = 0;
            var i;
            for(i = 0; i < _hexcode.length; i++) {
                if(((_hexcode.charCodeAt(i) >= 0x30) && (_hexcode.charCodeAt(i) <= 0x39)) ||
                ((_hexcode.charCodeAt(i) >= 0x41) && (_hexcode.charCodeAt(i) <= 0x46)) ||
                ((_hexcode.charCodeAt(i) >= 0x61) && (_hexcode.charCodeAt(i) <= 0x66))) {
                    iChr++;
                }
            }
            if(iChr == _hexcode.length) {
                var strHex = '';
                for(i = 0; i < 6 - _hexcode.length; i++) {
                    strHex += '0';
                }
                strHex += _hexcode.toLowerCase();
                this.Hexcode = strHex;
            }
            else this.Hexcode = NaN;
        }
    }
    toString() {
        return this.Hexcode;
    }
    toRGB() {
        return fromHexcode(this.toString());
    }
    toHSL() {
        return toHSL(this.toRGB());
    }
    toHSV() {
        return toHSV(this.toRGB());
    }
    toHSI() {
        return toHSI(this.toRGB());
    }
    toCMYK() {
        return toCMYK(this.toRGB());
    }
}
const formatHex = _number => {
    return (_number<16)?('0' + _number.toString(16)):_number.toString(16);
}
const toHexcode = _rgb => {
    if(isNaN(_rgb.Red) || isNaN(_rgb.Green) || isNaN(_rgb.Blue)) return NaN;
    else return (formatHex(_rgb.Red) + formatHex(_rgb.Green) + formatHex(_rgb.Blue));
}
const fromHexcode = _hex => {
    var confHex = new Hexcode(_hex);
    if(confHex.toString().length == 6) {
        var rr = confHex.toString().substring(0,2);
        var gg = confHex.toString().substring(2,4);
        var bb = confHex.toString().substring(4,6);
        return new RGB(parseInt(rr,16),parseInt(gg,16),parseInt(bb,16));
    }
    else return NaN;
}
// 3.HSL Color space
class HSL {
    constructor(_hue,_sat,_lum) {
        var th = new Number(_hue);
        var ts = new Number(_sat);
        var tl = new Number(_lum);
        if(isNaN(th) || isNaN(ts) || isNaN(tl)) {
            this.Hue = NaN; this.Saturate = NaN; this.Luminate = NaN;
        }
        else {
            this.Hue = (th<0)?0:((th>1)?1:th);
            this.Saturate = (ts<0)?0:((ts>1)?1:ts);
            this.Luminate = (tl<0)?0:((tl>1)?1:tl);
        }
    }
    toString() {
        return this.Hue + ';' + this.Saturate + ';' + this.Luminate;
    }
    toRGB() {
        return fromHSL(this);
    }
    toHexcode() {
        return toHexcode(this.toRGB());
    }
    toHSV() {
        return toHSV(this.toRGB());
    }
    toHSI() {
        return toHSI(this.toRGB());
    }
    toCMYK() {
        return toCMYK(this.toRGB());
    }
    item(_index) {
        return (_index==0)?this.Hue:((_index==1)?this.Saturate:((_index==2)?this.Luminate:NaN));
    }
}
const toHSL = _rgb => {
    var _r = _rgb.Red;
    var _g = _rgb.Green;
    var _b = _rgb.Blue;
    var rp = _r / 255.0;
    var gp = _g / 255.0;
    var bp = _b / 255.0;
    var max = Math.max(rp, gp, bp);
    var min = Math.min(rp, gp, bp);
    var delta = max - min;
    var hue, sat, lum;
    if(delta==0) hue=0;
    else{
        if(max == rp){
            hue = 60 / 360.0 * (((gp - bp) / delta) % 6);
        }
        else if(max == gp){
            hue = 60 / 360.0 * (((bp - rp) / delta) + 2);
        }
        else{
            hue = 60 / 360.0 * (((rp - gp) / delta) + 4);
        }
    }
    if(hue < 0) hue = 1 + hue;
    lum = (max + min)/2;
    if(delta==0) sat=0;
    else sat = delta / (1 - Math.abs(2 * lum - 1));
    return new HSL(hue,sat,lum);
}
const fromHSL = _hsl => {
    var hue = _hsl.Hue;
    var sat = _hsl.Saturate;
    var lum = _hsl.Luminate;
    var _r, _g, _b;
    if(hue<0 || hue>1 || sat<0 || sat>1 || lum<0 || lum>1){ _r=0; _g=0; _b=0; }
    else{
        var th = hue * 360.0;
        var C = (1 - Math.abs(2 * lum - 1)) * sat;
        var X = C * (1 - Math.abs((th / 60.0) % 2 - 1));
        var m = lum - C / 2.0;
        var tr, tg, tb;
        if(th < 60.0){
            tr = C; tg = X; tb = 0;
        }
        else if(th < 120){ 
            tr = X; tg = C; tb = 0; 
        }
        else if(th < 180){ 
            tr = 0; tg = C; tb = X;
        }
        else if(th < 240){
            tr = 0; tg = X; tb = C;
        }
        else if(th < 300){ 
            tr = X; tg = 0; tb = C; 
        }
        else{ 
            tr = C; tg = 0; tb = X; 
        }
        _r = Math.round((tr + m) * 255);
        _g = Math.round((tg + m) * 255);
        _b = Math.round((tb + m) * 255);
    }
    return new RGB(_r,_g,_b);
}
// 4.HSV Color space
class HSV {
    constructor(_hue,_sat,_val) {
        var th = new Number(_hue);
        var ts = new Number(_sat);
        var tv = new Number(_val);
        if(isNaN(th) || isNaN(ts) || isNaN(tv)) {
            this.Hue = NaN; this.Saturate = NaN; this.Value = NaN;
        }
        else {
            this.Hue = (th<0)?0:((th>1)?1:th);
            this.Saturate = (ts<0)?0:((ts>1)?1:ts);
            this.Value = (tv<0)?0:((tv>1)?1:tv);
        }
    }
    toString() {
        return this.Hue + ';' + this.Saturate + ';' + this.Value;
    }
    toRGB() {
        return fromHSV(this);
    }
    toHexcode() {
        return toHexcode(this.toRGB());
    }
    toHSL() {
        return toHSL(this.toRGB());
    }
    toHSI() {
        return toHSI(this.toRGB());
    }
    toCMYK() {
        return toCMYK(this.toRGB());
    }
    item(_index) {
        return (_index==0)?this.Hue:((_index==1)?this.Saturate:((_index==2)?this.Value:NaN));
    }
}
const toHSV = _rgb => {
    var _r = _rgb.Red;
    var _g = _rgb.Green;
    var _b = _rgb.Blue;
    var rp = _r / 255;
    var gp = _g / 255;
    var bp = _b / 255;
    var max = Math.max(rp, gp, bp);
    var min = Math.min(rp, gp, bp);
    var delta = max - min;
    var hue, sat, val;
    if (delta == 0) hue = 0;
    else
    {
        if (max == rp)
        {
            hue = 60 / 360.0 * (((gp - bp) / delta) % 6);
        }
        else if (max == gp)
        {
            hue = 60 / 360.0 * (((bp - rp) / delta) + 2);
        }
        else
        {
            hue = 60 / 360.0 * (((rp - gp) / delta) + 4);
        }
    }
    if(hue < 0) hue = 1 + hue;
    if(max==0) sat=0;
    else sat = delta/max;
    val = max;
    return new HSV(hue,sat,val);
}
const fromHSV = _hsv => {
    var hue = _hsv.Hue;
    var sat = _hsv.Saturate;
    var val = _hsv.Value;
    var _r, _g, _b;
    if(hue<0||hue>1||sat<0||sat>1||val<0||val>1){
        _r = 0; _g = 0; _b = 0;
    }
    else{
        var th = hue * 360.0;
        var C = val *  sat;
        var X = C * (1 - Math.abs((th / 60.0) % 2 - 1));
        var m = val - C;
        var tr, tg, tb;
        if (th < 60.0){ 
            tr = C; tg = X; tb = 0;
        }
        else if (th < 120){
            tr = X; tg = C; tb = 0;
        }
        else if (th < 180){
            tr = 0; tg = C; tb = X;
        }
        else if (th < 240){
            tr = 0; tg = X; tb = C;
        }
        else if (th < 300){
            tr = X; tg = 0; tb = C;
        }
        else{
            tr = C; tg = 0; tb = X;
        }
        _r = Math.round((m + tr) * 255);
        _g = Math.round((m + tg) * 255);
        _b = Math.round((m + tb) * 255);
    }
    return new RGB(_r,_g,_b);
}
// 5.HSI Color space
class HSI {
    constructor(_hue,_sat,_int) {
        var th = new Number(_hue);
        var ts = new Number(_sat);
        var ti = new Number(_int);
        if(isNaN(th) || isNaN(ts) || isNaN(ti)) {
            this.Hue = NaN; this.Saturate = NaN; this.Intensity = NaN;
        }
        else {
            this.Hue = (th<0)?0:((th>1)?1:th);
            this.Saturate = (ts<0)?0:((ts>1)?1:ts);
            this.Intensity = (ti<0)?0:((ti>1)?1:ti);
        }
    }
    toString() {
        return this.Hue + ';' + this.Saturate + ';' + this.Intensity;
    }
    toRGB() {
        return fromHSI(this);
    }
    toHexcode() {
        return toHexcode(this.toRGB());
    }
    toHSL() {
        return toHSL(this.toRGB());
    }
    toHSV() {
        return toHSV(this.toRGB());
    }
    toCMYK() {
        return toCMYK(this.toRGB());
    }
    item(_index) {
        return (_index==0)?this.Hue:((_index==1)?this.Saturate:((_index==2)?this.Intensity:NaN));
    }
}
const toHSI = _rgb => {
    var _r = _rgb.Red;
    var _g = _rgb.Green;
    var _b = _rgb.Blue;
    var tr = _r/255; 
    var tg = _g/255; 
    var tb = _b/255;
    var max = Math.max(tr, tg, tb);
    var min = Math.min(tr, tg, tb);
    var delta = max - min;
    var hue, sat, ins;
    if (delta == 0) hue = 0;
    else
    {
        if (max == tr)
        {
            hue = 60 / 360.0 * (((tg - tb) / delta) % 6);
        }
        else if (max == tg)
        {
            hue = 60 / 360.0 * (((tb - tr) / delta) + 2);
        }
        else
        {
            hue = 60 / 360.0 * (((tr - tg) / delta) + 4);
        }
    }
    if(hue < 0) hue = 1 + hue;
    ins = (tr + tg + tb) / 3.0;
    if (max != 0) sat = 1 - min/ins;
    else sat = 0;
    return new HSI(hue,sat,ins);
}
const fromHSI = _hsi => {
    var hue = _hsi.Hue;
    var sat = _hsi.Saturate;
    var ins = _hsi.Intensity;
    var _r, _g, _b;
    if(hue<0||hue>1||sat<0||sat>1||ins<0||ins>1){
        _r=0; _g=0; _b=0;
    }
    else{
        var th = hue * 360.0;
        var Z = 1 - Math.abs((th / 60.0) % 2 - 1);
        var C = (3 * ins * sat) / (1 + Z);
        var X = C * Z;
        var m = ins * (1 - sat);
        var tr, tg, tb;
        if (th < 60.0) { tr = C; tg = X; tb = 0; }
        else if (th < 120) { tr = X; tg = C; tb = 0; }
        else if (th < 180) { tr = 0; tg = C; tb = X; }
        else if (th < 240) { tr = 0; tg = X; tb = C; }
        else if (th < 300) { tr = X; tg = 0; tb = C; }
        else { tr = C; tg = 0; tb = X; }
        _r = Math.round((m + tr) * 255);
        _g = Math.round((m + tg) * 255);
        _b = Math.round((m + tb) * 255);
    }
    return new RGB(_r,_g,_b);
}
// 6.CMYK Color space
class CMYK {
    constructor(_cy,_ma,_ye,_ke) {
        var tc = new Number(_cy);
        var tm = new Number(_ma);
        var ty = new Number(_ye);
        var tk = new Number(_ke);
        if(isNaN(tc) || isNaN(tm) || isNaN(ty) || isNaN(tk)) {
            this.Cyan = NaN; this.Magenta = NaN; this.Yellow = NaN; this.Key = NaN;
        }
        else {
            this.Cyan = (tc<0)?0:((tc>1)?1:tc);
            this.Magenta = (tm<0)?0:((tm>1)?1:tm);
            this.Yellow = (ty<0)?0:((ty>1)?1:ty);
            this.Key = (tk<0)?0:((tk>1)?1:tk);
        }
    }
    toString() {
        return this.Cyan + ';' + this.Magenta + ';' + this.Yellow + ';' + this.Key;
    }
    toRGB() {
        return fromCMYK(this);
    }
    toHexcode() {
        return toHexcode(this.toRGB());
    }
    toHSL() {
        return toHSL(this.toRGB());
    }
    toHSV() {
        return toHSV(this.toRGB());
    }
    toHSI() {
        return toHSI(this.toRGB());
    }
    item(_index) {
        return (_index==0)?this.Cyan:((_index==1)?this.Magenta:((_index==2)?this.Yellow:((_index==3)?this.Key:NaN)));
    }
}
const toCMYK = _rgb => {
    var rd = _rgb.Red/255;
    var gn = _rgb.Green/255;
    var be = _rgb.Blue/255;
    var bl = 1.0 - Math.max(rd, gn, be);
    if(bl!=1) {
        var cy = (1.0 - rd - bl)/(1.0 - bl);
        var ma = (1.0 - gn - bl)/(1.0 - bl);
        var ye = (1.0 - be - bl)/(1.0 - bl);
    }
    else {
        var cy = 0; var ma = 0; var ye = 0;
    }
    return new CMYK(cy, ma, ye, bl);
}
const fromCMYK = _cmyk => {
    var cy = _cmyk.Cyan;
    var ma = _cmyk.Magenta;
    var ye = _cmyk.Yellow;
    var ke = _cmyk.Key;
    var rd = Math.round(255 * (1 - cy) * (1 - ke));
    var gn = Math.round(255 * (1 - ma) * (1 - ke));
    var bl = Math.round(255 * (1 - ye) * (1 - ke));
    return new RGB(rd, gn, bl);
}