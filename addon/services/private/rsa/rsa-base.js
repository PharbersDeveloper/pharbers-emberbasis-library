import Mixin from '@ember/object/mixin';
import { JSEncrypt } from 'jsencrypt';

export default Mixin.create({
    b64map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    b64pad: "=",
    BI_RM: "0123456789abcdefghijklmnopqrstuvwxyz",
    initInstance() {
        if (!this.get('RSAInstance')) {
            this.set('RSAInstance', new JSEncrypt({ default_key_size: 512 }));
        }
    },
    int2char(n) {
        return this.get('BI_RM').charAt(n);
    },
    hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    },
    bytesToHex(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join("");
    },
    hex2b64(h) {
        let _this = this;
        let i;
        let c;
        let ret = "";
        for (i = 0; i + 3 <= h.length; i += 3) {
            c = parseInt(h.substring(i, i + 3), 16);
            ret += _this.get('b64map').charAt(c >> 6) + _this.get('b64map').charAt(c & 63);
        }
        if (i + 1 == h.length) {
            c = parseInt(h.substring(i, i + 1), 16);
            ret += _this.get('b64map').charAt(c << 2);
        }
        else if (i + 2 == h.length) {
            c = parseInt(h.substring(i, i + 2), 16);
            ret += _this.get('b64map').charAt(c >> 2) + _this.get('b64map').charAt((c & 3) << 4);
        }
        while ((ret.length & 3) > 0) {
            ret += _this.get('b64pad');
        }
        return ret;
    },
    b64tohex(s) {
        let _this = this;
        let ret = "";
        let i;
        let k = 0; // b64 state, 0-3
        let slop = 0;
        for (i = 0; i < s.length; ++i) {
            if (s.charAt(i) == _this.get('b64pad')) {
                break;
            }
            let v = _this.get('b64map').indexOf(s.charAt(i));
            if (v < 0) {
                continue;
            }
            if (k == 0) {
                ret += _this.get('int2char').call(_this, (v >> 2));
                slop = v & 3;
                k = 1;
            }
            else if (k == 1) {
                ret += _this.get('int2char').call(_this, ((slop << 2) | (v >> 4)));
                slop = v & 0xf;
                k = 2;
            }
            else if (k == 2) {
                ret += _this.get('int2char').call(_this, (slop));
                ret += _this.get('int2char').call(_this, (v >> 2));
                slop = v & 3;
                k = 3;
            }
            else {
                ret += _this.get('int2char').call(_this, ((slop << 2) | (v >> 4)));
                ret += _this.get('int2char').call(_this, (v & 0xf));
                k = 0;
            }
        }
        if (k == 1) {
            ret += _this.get('int2char').call(_this, (slop << 2));
        }
        return ret;
    },
    encryptLong2(content) {
        content = encodeURIComponent(content)
        let default_key_size = this.get('RSAInstance').default_key_size;
        const MAX_ENCRYPT_BLOCK = (default_key_size >> 3) - 11;
        let k = this.get('RSAInstance').getKey()
        try {
            var ct = "";

            var bytes = new Array();
            bytes.push(0);
            var byteNo = 0;
            var len, c;
            len = content.length;
            var temp = 0;
            for (let i = 0; i < len; i++) {
                c = content.charCodeAt(i);
                if (c >= 0x010000 && c <= 0x10FFFF) {  //特殊字符，如Ř，Ţ
                    byteNo += 4;
                } else if (c >= 0x000800 && c <= 0x00FFFF) { //中文以及标点符号
                    byteNo += 3;
                } else if (c >= 0x000080 && c <= 0x0007FF) { //特殊字符，如È，Ò
                    byteNo += 2;
                } else { // 英文以及标点符号
                    byteNo += 1;
                }
                if ((byteNo % MAX_ENCRYPT_BLOCK) >= MAX_ENCRYPT_BLOCK - 3 || (byteNo % MAX_ENCRYPT_BLOCK) == 0) {
                    if (byteNo - temp >= MAX_ENCRYPT_BLOCK - 3) {
                        bytes.push(i);
                        temp = byteNo;
                    }
                }
            }
            //截取字符串并分段加密
            if (bytes.length > 1) {
                for (let i = 0; i < bytes.length - 1; i++) {
                    var str;
                    if (i == 0) {
                        str = content.substring(0, bytes[i + 1] + 1);
                    } else {
                        str = content.substring(bytes[i] + 1, bytes[i + 1] + 1);
                    }
                    var t1 = k.encrypt(str);
                    ct += t1;
                }
                if (bytes[bytes.length - 1] != content.length - 1) {
                    var lastStr = content.substring(bytes[bytes.length - 1] + 1);
                    ct += k.encrypt(lastStr);
                }
                return this.get('hex2b64').call(this, ct);
            }
            var t = k.encrypt(content);
            var y = this.get('hex2b64').call(this, t);
            return y;
        } catch (ex) {
            this.get('logger').log(ex)
            return false;
        }
    },
    decryptLong2(encryptContent) {
        let default_key_size = this.get('RSAInstance').default_key_size;
        const MAX_ENCRYPT_BLOCK = (default_key_size >> 3);
        let k = this.get('RSAInstance').getKey()
        try {
            var string = this.get('b64tohex').call(this, encryptContent);
            var ct = "";
            if (string.length > MAX_ENCRYPT_BLOCK * 2) {
                let regex = new RegExp(`.{1,${MAX_ENCRYPT_BLOCK * 2}}`, 'g')
                var lt = string.match(regex);  //128位解密。取256位
                lt.forEach(function (entry) {
                    var t1 = k.decrypt(entry);
                    ct += t1;
                });
                return decodeURIComponent(ct);
            }
            var y = k.decrypt(string);
            return decodeURIComponent(y);
        } catch (ex) {
            this.get('logger').log(ex)
            return false;
        }
    }
});