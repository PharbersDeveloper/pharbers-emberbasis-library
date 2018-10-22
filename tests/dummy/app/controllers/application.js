import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { JSEncrypt} from 'jsencrypt';

export default Controller.extend({
    phservice: inject(),
    init() {
        this._super(...arguments);

        // this.NodeRSA()
        this.JSRSA()

    },
    JSRSA() {
        // this.get('logger').log(JSEncrypt);
        let encrypt = new JSEncrypt();
        // let pubkey = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB-----END PUBLIC KEY-----"
        let pubkey = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMShq/Oe/YL0/XA//N70oXmCVHDTeKfdIVJPEYSQ2pcxCm9GZ9ysZVgNkdAei7tpLFRhjmyeexX+0U8Js0AWn80CAwEAAQ=="
        encrypt.setPublicKey(pubkey);
        let encrypted = encrypt.encrypt('你好RSA');
        this.get('logger').log(encrypted);

        // let prikey = "-----BEGIN RSA PRIVATE KEY-----MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQABAoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fvxTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeHm7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAFz/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIMV7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATeaTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5AzilpsLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Ozuku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876-----END RSA PRIVATE KEY-----"
        let prikey = "MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAxKGr8579gvT9cD/83vSheYJUcNN4p90hUk8RhJDalzEKb0Zn3KxlWA2R0B6Lu2ksVGGObJ57Ff7RTwmzQBafzQIDAQABAkAoYNLAuntwswKAVIOG/VFTdHIGoUZ7ois/jcEZKe3ZcfpxRVjcbsMwaZoY+hYRIbjHQJW+ybkmPhgwWjWyLTl5AiEA6DGj8cbsHTkOml00iQcGe0Yir2u5JhlaQvpZciIsfS8CIQDYyqF4ODn0XP476ub8NsRt2dUqRFvD2TzqRn2KWEHLwwIhAJ9zP19QOGLVBNcyfFpBLc1H25fVhP7J2Dc4jmYXW6/XAiAeOKEp0SzDE/OdBrIMltXrOmKs8bqZIr+LKSh3ELabYQIgAU4feMPdRH8ot/T8esKN+6kI0Z/JEuavk8PgMbRasPU="
        let decrypt = new JSEncrypt();
        decrypt.setPrivateKey(prikey);
        var uncrypted = decrypt.decrypt(encrypted);
        this.get('logger').log(uncrypted);
    }
});
