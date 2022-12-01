const nav_btt_click = event => {
    let _bId = 2;
    switch(event.currentTarget.title) {
        case 'Security': _bId = 0; break; 
        case 'Terabox': _bId = 1; break;
        case 'Google Drive': _bId = 2; break;
        case 'Web Applications': _bId = 3; break;
        case 'Tips': _bId = 4; break;
        default: _bId = 2;
    }
    let _btts = document.getElementsByClassName('nav_btt');
    for(i=0; i<_btts.length; i++) {
        _btts[i].style.marginTop = '0px';
        _btts[i].style.backgroundColor = '#333333';
        _btts[i].children[1].style.opacity = '0';
    }
    _btts[_bId].style.marginTop = '-14px';
    _btts[_bId].style.backgroundColor = '#191919';
    _btts[_bId].children[1].style.opacity = '1';
    switch(_bId) {
        case 0: 
            document.getElementById('body_page').src = './accounts/index.html';
            break;
        case 1: 
            document.getElementById('body_page').src = './t/index.html';
            break;
        case 2: 
            document.getElementById('body_page').src = './g/index.html';
            break;
        case 3:
            document.getElementById('body_page').src = './webapps/index.html';
            break;
        case 4:
                document.getElementById('body_page').src = 'https://mplotus.github.io/tips';
                break;
        default: ;
    }
}