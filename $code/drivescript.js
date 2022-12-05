const page_load = () => {
    let _address = window.location.pathname;
    _address = _address.replace('/index.html',''); // Trim file name
    _address = _address.substring(2,_address.length); // Trim root
    if(_address.length != 0) _address = _address.substring(1,_address.length); // Trim first splash
    if(_address[_address.length-1] == '/') _address = _address.substring(0,_address.length - 1); // Trim last splash
    let _temppath = _address.split('/');
    fetch('https://mplotus.github.io/-admin/googledrive/data.xml').then(res => {
        res.text().then(xml => {
            let _parser = new DOMParser();
            let _root = _parser.parseFromString(xml, 'application/xml').querySelector('root');
            let _cdir = _root;
            let _arrname = new Array(); _arrname.push('Google Cloud Drive');
            for(i=0;i<_temppath.length;i++) {
                for(j=0;j<_cdir.children.length;j++) {
                    if(_cdir.children[j].id == _temppath[i]) {
                        _arrname.push(_cdir.children[j].slot);
                        _cdir = _cdir.children[j];
                        break;
                    }
                }
            }
            document.title = _arrname[_arrname.length - 1];
            let _ul_navi = document.getElementById('ul_navi');
            if(_arrname.length == 1) {
                let _li = document.createElement('li');
                _li.classList.add('li_seldir');
                _li.style.fontSize = '150%';
                _li.innerText = 'Google Cloud Drive';
                _ul_navi.appendChild(_li);
            }
            else {
                for(i=0;i<_arrname.length - 1;i++) {
                    let _ali = document.createElement('li');
                    let _a = document.createElement('a');
                    _a.innerText = _arrname[i];
                    let _rootpath = window.location.protocol + '//' + window.location.hostname;
                    if(window.location.port != '') _rootpath += ':' + window.location.port;
                    _rootpath = _rootpath + '/g/';
                    if(i==0) _a.href = _rootpath;
                    else {
                        let _strdir = '';
                        for(j=0;j<i;j++) {
                            _strdir += _temppath[j] + '/';
                        }
                        _a.href = _rootpath + _strdir;
                    }
                    _ali.appendChild(_a);
                    _ul_navi.appendChild(_ali);
                }
                let _li = document.createElement('li');
                _li.innerText = _arrname[_arrname.length - 1];
                _ul_navi.appendChild(_li);
            }
            document.getElementById('m_icon').src = (_arrname.length == 1)?'https://mplotus.github.io/$imgs/igdrive.svg':'https://mplotus.github.io/$imgs/idir.svg';
            document.getElementById('m_type').innerText = (_arrname.length == 1)?'Drive':'Folder';
            document.getElementById('m_dirname').innerText = (_arrname.length == 1)?'Google Cloud':_arrname[_arrname.length - 1];
            let _body_page = document.getElementById('body_page');
            if(_cdir.children.length != 0) {
                for(i=0;i<_cdir.children.length;i++) {
                    let _ea = document.createElement('a');
                    if(_cdir.children[i].nodeName != 'dir') {
                        _ea.href = _cdir.children[i].innerHTML;
                        _ea.target = '_blank';
                    }
                    else {
                        let _rootpath = window.location.protocol + '//' + window.location.hostname;
                        if(window.location.port != '') _rootpath += ':' + window.location.port;
                        _rootpath = _rootpath + '/g/';
                        _ea.href = (_rootpath + _address + '/' + _cdir.children[i].id).replace('g//','g/');
                    }
                    // Icon
                    let _eicon = document.createElement('img');
                    _eicon.classList.add('icons');
                    let _itype = 'i' + _cdir.children[i].nodeName.replace('_','');
                    _eicon.src = 'https://mplotus.github.io/$imgs/' + _itype + '.svg';
                    _ea.appendChild(_eicon);
                    // Text name
                    let _ename = document.createElement('div');
                    _ename.classList.add('inames');
                    _ename.innerText = _cdir.children[i].slot;
                    _ea.appendChild(_ename);
                    _body_page.appendChild(_ea);
                }
            }
            else {
                let _ediv = document.createElement('div');
                _ediv.style.fontSize = '200%';
                _ediv.style.fontStyle = 'italic';
                _ediv.style.textAlign = 'center';
                _ediv.style.width = '100%';
                _ediv.style.color = '#cacaca';
                _ediv.innerText = 'Nothing here...';
                _body_page.style.display = 'block';
                _body_page.appendChild(_ediv);
            }
        })
    });
}