import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
    phservice: inject(),
    init() {
        this._super(...arguments);
        let RSA = this.get('phservice').get('RSA');
        const public_key = '-----BEGIN PUBLIC KEY-----\n' +
            'MIIBYjANBgkqhkiG9w0BAQEFAAOCAU8AMIIBSgKCAUEAsE1edyfToZRv6cFOkB0t\n' +
            'AJ5qJor4YF5CccJAL0fS/o1Yk10VSXH4Xx4peSJgYQKkO0HqO1hAz6k9dFQB4U1C\n' +
            'nWtRjtNEcIfycqrZrhu6you5syb6ScV3Zu/9bm7/DyaLlx/gJhUPR1OxOzaqsEvl\n' +
            'u7hbDhNLIYo1zKFb/aUBbD6+UcaGxH2BfFNdzVAtVSVpc/s2Y3sboMN7rByUj793\n' +
            '7iQlaMINvVjyasynYuzHNw6ZRP9JP9fwxrCyaxnTPWxVl0qvVaQO2+TtFMtDXH2O\n' +
            'VZtWWeLHAL8cildw0G+u2qVqTqIGEwNyJlsAHykaPFAMW0xLueumrSlB+JUJPrRv\n' +
            'vw4nBCd4GOrNSlPCE/xlk1Cb8JaICTLvDUcYc3ZqL3jqAueBhkpw2uCz8xVJeOA1\n' +
            'KY4kQIIx8JEBsAYzgyP2iy0CAwEAAQ==\n' +
            '-----END PUBLIC KEY-----';
        RSA.importKey(public_key, 'public')
        const json = {
            account: 'Alex@qq.com',
            password: '123456'
        };
        const type = 'base64';

        let temp1 = RSA.encrypt(JSON.stringify(json), type);
        window.console.info(temp1);
    },
});
