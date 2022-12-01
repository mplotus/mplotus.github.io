var page_load = () => {
    fetch('./code/accounts.xml').then(res => {
        res.text().then(xml => {
            let _parser = new DOMParser();
            let _accs = _parser.parseFromString(xml, 'application/xml').querySelectorAll('name');
            let _body = document.getElementById('body_page');
            for(i=0;i<_accs.length;i++) {
                let _accSpace = document.createElement('div');
                _accSpace.style.margin = '0';
                _accSpace.style.padding = '0';
                let _accLabel = document.createElement('div');
                _accLabel.classList.add('table_cover');
                _accLabel.classList.add('account_name');
                // Accounts
                let _accName = document.createElement('div');
                _accName.innerHTML = _accs[i].id;
                _accName.style.fontSize = '80%';
                _accLabel.appendChild(_accName);
                // Keycode
                let _accCode = document.createElement('div');
                _accCode.innerHTML = _accs[i].className;
                _accCode.style.fontSize = '80%';
                _accCode.style.textAlign = 'center';
                _accLabel.appendChild(_accCode);
                // Expand Collapse
                let _accExp = document.createElement('div');
                _accSpace.appendChild(_accLabel);
                if(_accs[i].children.length != 0) {
                    // Expand button
                    _accExp.innerHTML = '&times;';
                    _accExp.style.fontSize = '80%';
                    _accExp.style.textAlign = 'center';
                    _accExp.style.cursor = 'pointer';
                    _accExp.classList.add('expand_normal');
                    _accExp.id = 'bttExp' + i.toString();
                    _accExp.addEventListener('click', expand_click);
                    // Expand page
                    let _expPanel = document.createElement('div');
                    _expPanel.id = 'exp' + i.toString();
                    _expPanel.classList.add('exp_normal');
                    for(j=0;j<_accs[i].children.length;j++) {
                        let _expFile = document.createElement('div');
                        _expFile.innerHTML = _accs[i].children[j].innerHTML;
                        _expFile.style.padding = '2px';
                        _expFile.style.overflow = 'hidden';
                        _expFile.style.textOverflow = 'ellipsis';
                        if(_accs[i].children[j].nodeName == 'folder') {
                            _expFile.style.paddingLeft = '15px';
                            _expFile.style.fontWeight = 'bold';
                        }
                        else if(_accs[i].children[j].nodeName == 'volume') {
                            _expFile.style.paddingLeft = '15px';
                            _expFile.style.fontWeight = 'bold';
                            _expFile.style.fontStyle = 'italic';
                            _expFile.style.color = 'black';
                            let fCap = parseFloat(_expFile.innerHTML.substring(0,_expFile.innerHTML.length - 2));
                            if(!isNaN(fCap)) {
                                if(fCap <= 10.0) _accLabel.style.backgroundColor = '#000040';
                                else if(fCap <= 12.0) _accLabel.style.backgroundColor = '#004000';
                                else if(fCap <= 13.5) _accLabel.style.backgroundColor = '#404000';
                                else _accLabel.style.backgroundColor = '#400000';
                            }
                        }
                        else {
                            _expFile.style.paddingLeft = '30px';
                            _expFile.style.fontStyle = 'italic';
                        }
                        _expFile.style.fontSize = '96%';
                        _expPanel.appendChild(_expFile);
                    }
                    _accSpace.appendChild(_expPanel);
                }
                _accLabel.appendChild(_accExp);
                _body.appendChild(_accSpace);
            }
        })
    });
}
var expand_click = e => {
    let meBtt = document.getElementById(e.currentTarget.id);
    meBtt.classList.toggle('expand_click');
    meBtt.title = 'Click to collapse all its content file';
    let meExp = document.getElementById('exp' + e.currentTarget.id.substring(6, e.currentTarget.id.length));
    meExp.classList.toggle('exp_click');
}
let _pass = '';
var pass_enter = () => {
    let _pass = document.getElementById('login_text').value;
    if(_pass == '000111000') {
        document.getElementById('black_screen').style.display = 'none';
    }
    else document.getElementById('login_text').focus();
}