import Service, { inject } from '@ember/service';

export default Service.extend({
    RSA: inject('private.rsa.rsa'),
    XMPP: inject('private.xmpp.xmpp')
});
