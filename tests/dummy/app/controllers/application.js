import Controller from '@ember/controller';
// import { Observer } from '@ember/object';

export default Controller.extend({

    init() {
        this._super(...arguments);
        this.JSRSA()
        // this.BusinessLogic()

    },
    actions: {
        next(data) {
            this.get('logger').log(`===> ${data}`)
        },
        next2(data) {
            this.get('logger').log(`===> ${data}`)
        },
        current(data) {
            this.get('logger').log(`===> ${data}`)
        }

        
    },
    JSRSA() {
        let PublicKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAK9L5z4lVKzUdffDqndr78I+ovAZ9W/AOTf9AYqOWgw1ZzJuHSHZL8iCtkfSR9KMsLC/wxsNHigUFyKsaTWFIi8CAwEAAQ==`;
        let PrivateKey = `MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAr0vnPiVUrNR198Oqd2vvwj6i8Bn1b8A5N/0Bio5aDDVnMm4dIdkvyIK2R9JH0oywsL/DGw0eKBQXIqxpNYUiLwIDAQABAkAex1ID3GQgsHFCHo3ox//h+EN9quEoTPT++qJxpIr1B4T6DAUOzuI68/eZy5MGpUvi4vhtmYn9mrbVeqZnrcDBAiEA2hUHPCoDjSibsp1o5IMhgIXlnKsz7+9UgC+FW6vDgOECIQDNxnWaq53Q27LmFP6mM/sHDN2uMx0nvphKhqQ9vaI1DwIhANIHgIFMAUGYg2LhQJ0bQU+zJLDfHVUNzPbrTWc9JDthAiAHlSuaQn6zRpVGEzn7B+lVLi0xESMe5tAX1vRQbh9/EwIgf2TdQUtdoCDGHQA6NrEZ8jqMX4opbwa8WqqNewuBXPw=`;
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
