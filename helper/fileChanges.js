const chokidar = require('chokidar');

const Ubuntu = chokidar.watch('./Output/Ubuntu',{
    ignored : /(^|[\/\\])\../, // ignore dotfiles
    persistent : true
})

const CentOS = chokidar.watch('./Output/CentOS',{
    ignored : /(^|[\/\\])\../, // ignore dotfiles
    persistent : true
})

const hpLinux = chokidar.watch('./Output/hpLinux',{
    ignored : /(^|[\/\\])\../, // ignore dotfiles
    persistent : true
})

const windows = chokidar.watch('./Output/windows',{
    ignored : /(^|[\/\\])\../, // ignore dotfiles
    persistent : true
})

module.exports = {
    Ubuntu : Ubuntu,
    CentOS : CentOS,
    hpLinux : hpLinux,
    windows : windows
};