class Matrix{
    constructor(_array){
        var i = 0;
        var _arr = new Array();
        while(i<_array.length) {
            var sArr = new Array();
            if(isNaN(_array[i].length)) {
                sArr.push(_array[i]);
            }
            else {
                var j = 0;
                // _array[i] as string ???
                while(j<_array[i].length) {
                    sArr.push(_array[i][j]);
                    j++;
                }
            }
            _arr.push(sArr);
            i++;
        }
        this.arr=_arr;
    }
    // Get number of element in array
    size() {
        var mSize = 0;
        var i=0;
        while(i<this.arr.length) {
            if(isNaN(this.arr[i].length)) mSize++;
            else mSize+=this.arr[i].length;
            i++;
        }
        return mSize; 
    }
    // Check array is or not matrix (number)
    isMatrix() {
        var _isMat = true;
        if(this.arr.length==0) _isMat = false;
        else {
            var nCnt = 0;
            var i=0;
            while(i<this.arr.length) {
                if(isNaN(this.arr[i].length)) {
                    nCnt+=(!isNaN(parseFloat(this.arr[i])))?1:0;
                }
                else {
                    if(this.arr[i].length==0) return false;
                    var j=0;
                    while(j<this.arr[i].length) {
                        nCnt+=(!isNaN(parseFloat(this.arr[i][j])))?1:0;
                        j++;
                    }
                }
                i++;
            }
            var mSize = this.size();
            if(mSize==nCnt) {
                if(mSize==this.arr.length) _isMat = true;
                else _isMat = (mSize % this.arr.length == 0);
            }
            else _isMat = false;
        }
        return _isMat;
    }
    // Get number of row of matrix
    row() {
        if(!this.isMatrix()) return NaN;
        else return this.arr.length;
    }
    // Get number of column of matrix
    column() {
        if(!this.isMatrix()) return NaN;
        else return this.size()/this.arr.length;
    }
    // Get item of matrix
    item(_i,_j) {
        if((_i>=this.row())||(_j>=this.column())) return NaN;
        else return this.arr[_i][_j];
    }
    // Check array is square matrix
    isSquare() {
        var _isSqr = true;
        if(!this.isMatrix()) _isSqr = false;
        else _isSqr = ((this.size() % this.arr.length == 0) && (this.size() / this.arr.length == this.arr.length));
        return _isSqr;
    }
    // Convert matrix to string
    toString() {
        if(!this.isMatrix()) return NaN;
        else {
            var mStr = '';
            var i = 0;
            while(i<this.row()){
                var j = 0;
                while(j<this.column()){
                    mStr += this.arr[i][j] + ';';
                    j++;
                }
                mStr += '\n';
                i++;
            }
            return mStr;
        }
    }
    // Make unit matrix with same level
    unit() {
        var lev = Math.min(this.row(),this.column());
        var _arr = new Array();
        var i = 0;
        while(i<lev){
            var sArr = new Array();
            var j = 0;
            while(j<lev){
                if(i!=j) sArr.push(0);
                else sArr.push(1);
                j++;
            }
            _arr.push(sArr);
            i++;
        }
        return new Matrix(_arr);
    }
    // Transpose matrix
    transpose() {
        var _arr = new Array();
        if(this.isMatrix()) {
            var i = 0;
            while(i<this.column()) {
                var sArr = new Array();
                var j = 0;
                while(j<this.row()) {
                    sArr.push(this.arr[j][i]);
                    j++;
                }
                _arr.push(sArr);
                i++;
            }
        }
        return new Matrix(_arr);
    }
    // Multiply factor to every element (scale)
    scale(_factor) {
        var _arr = new Array();
        if(this.isMatrix()) {
            var i = 0;
            while(i<this.row()) {
                var sArr = new Array();
                var j = 0;
                while(j<this.column()) {
                    sArr.push(_factor * this.arr[i][j]);
                    j++;
                }
                _arr.push(sArr);
                i++;
            }
        }
        return new Matrix(_arr);
    }
    // Plus matrix with matrixB
    plus(_matrixB) {
        var pArr = new Array();
        if(this.isMatrix() && _matrixB.isMatrix()) {
            if((this.row() == _matrixB.row()) && (this.column() == _matrixB.column())) {
                var i = 0;
                while(i<this.row()) {
                    var j = 0;
                    var sArr = new Array();
                    while(j<this.column()) {
                        sArr.push(this.arr[i][j] + _matrixB.item(i,j));
                        j++;
                    }
                    pArr.push(sArr);
                    i++;
                }
            }
        }
        return new Matrix(pArr);
    }
    // Multiply this matrix with matrixB
    multiply(_matrixB) {
        var mArr = new Array();
        if(this.isMatrix() && _matrixB.isMatrix()) {
            if(this.column() == _matrixB.row()) {
                var i = 0;
                while(i<this.row()) {
                    var sArr = new Array();
                    var j = 0;
                    while(j<_matrixB.column()) {
                        var sEle = 0;
                        var t = 0;
                        while(t<this.column()) {
                            sEle += this.arr[i][t] * _matrixB.item(t,j);
                            t++;
                        }
                        sArr.push(sEle);
                        j++;
                    }
                    mArr.push(sArr);
                    i++;
                }
            }
        }
        return new Matrix(mArr);
    }
    // Matrix inverse of this matrix
    inverse() {
        if(this.isSquare()) {
            var arrMat = new Array(); var factS = new Array(); var factA = new Array();
            arrMat.push(this);
            var i = 0; var sumS = 0;
            while(i<this.row()) {
                sumS += this.item(i,i);
                i++;
            }
            factS.push(sumS); factA.push(-sumS);
            i = 1;
            while(i<this.row()) {
                var capMat = this.multiply(arrMat[i-1]);
                arrMat.push(capMat);
                var j = 0; sumS = 0;
                while(j<this.row()) {
                    sumS += capMat.item(j,j);
                    j++;
                }
                factS.push(sumS);
                var sumA = 0; j = 0;
                while(j<i) {
                    sumA += factS[j] * factA[i-j-1];
                    j++;
                }
                factA.push(-(sumA + factS[i])/(i+1));
                i++;
            }
            if(factA[factA.length-1] == 0) return NaN;
            else {
                var maxMat = arrMat[arrMat.length-2];
                var minMat = maxMat.plus(maxMat.unit().scale(factA[factA.length-2]));
                var i = 0;
                while(i<(this.row()-2)) {
                    minMat = minMat.plus(arrMat[arrMat.length-3-i].scale(factA[i]));
                    i++;
                }
                var iMat = minMat.scale(-1/factA[factA.length-1]);
                return iMat;
            }
        }
        else return NaN;
    }
    // Determination of matrix
    determ() {
        if(!this.isSquare()) return NaN;
        else {
            var detMat = 0;
            if(this.row() == 1) return this.arr[0][0];
            else {
                var tempMat = new Array();
                var tempI = this.row() - 2;
                var i = tempI;
                while(i<this.row()) {
                    var j = tempI;
                    var tempSMat = new Array();
                    while(j<this.row()) {
                        tempSMat.push(this.arr[i][j]);
                        j++;
                    }
                    tempMat.push(tempSMat);
                    i++;
                }
                detMat = tempMat[0][0] * tempMat[1][1] - tempMat[0][1] * tempMat[1][0];
                while(tempI - 1 >= 0) {
                    tempI--;
                    var i = tempI;
                    tempMat = new Array();
                    while(i<this.row()) {
                        var j = tempI;
                        var tempSMat = new Array();
                        while(j<this.row()) {
                            tempSMat.push(this.arr[i][j]);
                            j++;
                        }
                        tempMat.push(tempSMat);
                        i++;
                    }
                    var tempInv = (new Matrix(tempMat)).inverse();
                    detMat = detMat/tempInv.item(0,0);
                }
                return (Math.round(detMat * Math.pow(10,8))/Math.pow(10,8));
            }
        }
    }
    // Cofactor matrix of matrix
    cofactor() {
        var adjMat = this.adjugate();
        return adjMat.transpose();
    }
    // Adjoint (adjugate) matrix
    adjugate() {
        var invMat = this.inverse();
        var detMat = this.determ();
        return invMat.scale(detMat);
    }
}