import Controller from '@ember/controller';
// import { Observer } from '@ember/object';

export default Controller.extend({

    init() {
        this._super(...arguments);
        // this.JSRSA()
        this.BusinessLogic()
        // this.get('logger').log(this.get('cookie').write('ad', 'dasdsa'))
        // this.get('cookie').write('aa', 'bb', { path: '/' })
    },
    actions: {
        next(data) {
            this.get('logger').log(`===>1 ${data}`)
            this.get('cookie').clean('aa', 'token')()
        },
        next2(data) {
            this.get('logger').log(`===> ${data}`)
        },
        current(data) {
            this.get('logger').log(`===> ${data}`)
        }


    },
    JSRSA() {
        let PublicKey = ``
        let PrivateKey = ``
        let RSA = this.get('pmController').get('RSA');
        RSA.setPublicKey(PublicKey)

        // const params = {
        //     'cash_amount_to':1,
        //     'pick_all': 'false',
        //     'withdraw_type':'CHANNEL_EMONEY',
        //     'third_account_channel': '大萨达撒撒',
        //     'third_account': '15900000000',
        //     'third_account_name':'name',
        //     'client_ip':'127.0.0.1',
        //     'password':'ed40beecde2036df41a6a7c907fee1'
        // };
        // let encryptString = RSA.encryptLong(JSON.stringify(params));
        let encryptString = RSA.encryptLong("富强、民主、文明、和谐、自由、平等、公正、法治、爱国、敬业、诚信、友善,{},\ndasdasdkjnfdsljk\ndasda\t");
        this.get('logger').log(encryptString);

        RSA.setPrivateKey(PrivateKey);
        let uncrypted = RSA.decryptLong(encryptString)
        this.get('logger').log(uncrypted);
    },
    BusinessLogic() {
        function Func(name, age) {
            this.get('logger').log(`Say Hi ${name}，I‘am Age ${age}`)
        }
        this.get('pmController').get('BusinessLogic').funcInjection(Func)
        this.get('pmController').get('BusinessLogic').getFuncInstance('Func', 'Alex', 24)
    }
});
