const page_load = () => {
    let _address = '/g/softback/graphics/adobe/index.html'; //window.location.pathname;
    _address = _address.replace('/index.html',''); // Trim file name
    _address = _address.substring(2,_address.length); // Trim root
    if(_address.length != 0) _address = _address.substring(1,_address.length);
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
        })
    });
}