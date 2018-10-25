import Route from '@ember/routing/route';


export default Route.extend({
    actions: {
        next(data) {
            this.get('logger').log(data)
        }
    },
    model() {

        // let post = this.get('pmController').get('Store').createRecord('post', {
        //     id: '1',
        //     name: 'Alex',
        //     age: 12,
        //     // comments: this.get('pmController').get('Store').createRecord('comment', {
        //     //     id: '1',
        //     //     title: 'Alex 好帅'
        //     // })
        // })
        // post.get('comments').pushObject(this.get('pmController').get('Store').createRecord('comment', {
        //     id: '1',
        //     title: 'Alex 好帅',
        //     post
        // }))
        // post.get('comments').pushObject(this.get('pmController').get('Store').createRecord('comment', {
        //     id: '2',
        //     title: 'alfred 好帅',
        //     post
        // }))
    
        // this.get('logger').log(this.get('pmController').get('Store').object2JsonApi(post, false))

        let req = this.get('pmController').get('Store').createRecord('request', {id: '1', res: 'bind_course_region_rep' });
        let eqValues = [
            { id: 1, type: 'eqcond', key: 'region_id', val: 'a' },
            { id: 2, type: 'eqcond', key: 'course_id', val: 12 },
        ]
        eqValues.forEach((elem) => {
            req.get(elem.type).pushObject(this.get('pmController').get('Store').createRecord(elem.type, {
                id: elem.id,
                key: elem.key,
                val: elem.val,
            }))
        });
        let conditions = this.get('pmController').get('Store').object2JsonApi(req);
        this.get('logger').log(conditions)

        this.get('pmController').get('Store').queryMultipleObject('/api/v1/login/0', 'auth', {}).then(data =>  this.get('logger').log(data.get('firstObject').get('token')))
        this.store.transaction('/api/v1/save/0', 'auth', {}).then(r => this.get('logger').log(r.get('token')))
    }
});
