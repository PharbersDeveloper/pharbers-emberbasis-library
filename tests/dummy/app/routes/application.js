import Route from '@ember/routing/route';
import { later } from '@ember/runloop';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Route.extend({
	application_route: service(),
	application_controller: service(),
	actions: {
		hi() {
			let auth = this.get('application_controller').queryModelByAll('auth');//queryModelByAll('auth')//queryModelByID('auth', '5b7e454a8fb8076c3c3304l0');
			this.get('logger').log(this.get('application_route').object2JsonApi(auth, false));

			this.get('logger').log(this.get('application_controller').resetChangedModelAttr(auth));
		},
		reload() {
			this.refresh()
		}
	},
	model() {
		// this.get('logger').log(this.get('phstore'))


		// let auth = this.get('phstore').createModel('bm-atuh', {
		// 	id: '001',
		//     name: "Alex",
		//     person: this.get('phstore').createModel('bm-person', {
		// 		id: '002',
		//         name: '0000'
		//     })
		// })

		// let json = this.get('phstore').object2JsonApi(auth);
		// this.get('logger').log(json)


		let req = this.get('application_controller').createModel('request', {
			id: '1',
			res: 'bind_course_region_rep',
			fmcond: this.get('application_controller').createModel('fmcond', {
				id: '1',
				skip: 0,
				take: 1000
			}),
			eqcond: A([
				this.get('application_controller').createModel('eqcond', {
					id: '1',
					key: 'region_id',
					val: 'a',
				}),
				this.get('application_controller').createModel('eqcond', {
					id: '2',
					key: 'course_id',
					val: 12,
				})]
			)
		});

		let conditions = this.get('application_route').object2JsonApi(req);
		this.get('logger').log(conditions)

		// return this.get('application_route').queryMultipleObject('api/v1/login/0', 'auth', {});
		// return this.get('application_route').queryObject('api/v1/login/2', 'auth', {});

		// ["北京", "上海", "广东"].forEach((name, index) => {
		//     this.get('pmController').get('Store').createModel('provinces', {
		//         id: (index + 1),
		//         name
		//     })
		// })

		// let user_01 = this.get('pmController').get('Store').createModel('users', {
		//     id: '1',
		//     name: 'Alex'
		// })
		// let user_02 = this.get('pmController').get('Store').createModel('users', {
		//     id: '2',
		//     name: 'Alfred'
		// })

		// let rg_01 = this.get('pmController').get('Store').createModel('region', {
		//     id: '1',
		//     province: this.get('pmController').get('Store').queryModelByID('provinces', '1')
		// })

		// let rg_02 = this.get('pmController').get('Store').createModel('region', {
		//     id: '2',
		//     province: this.get('pmController').get('Store').queryModelByID('provinces', '2')
		// })

		// user_01.set('region', rg_01)
		// user_02.set('region', rg_02)
		// this.get('logger').log(this.get('pmController').get('Store').object2JsonApi(user_01), false);
		// this.get('logger').log(this.get('pmController').get('Store').object2JsonApi(user_02, false))


		// let p_01 = this.get('pmController').get('Store').createModel('people', {
		//     id: '1',
		//     name: 'Alex'
		// })

		// let post = this.get('pmController').get('Store').createModel('post', {
		//     id: '1',
		//     name: 'Alex',
		//     age: 12,
		//     // comments: this.get('pmController').get('Store').createModel('comment', {
		//     //     id: '1',
		//     //     title: 'Alex 好帅'
		//     // })
		// })


		// post.get('comments').pushObject(this.get('pmController').get('Store').createModel('comment', {
		//     id: '1',
		//     title: 'Alex 好帅',
		//     post
		// }))
		// post.get('comments').pushObject(this.get('pmController').get('Store').createModel('comment', {
		//     id: '2',
		//     title: 'Alfred 好帅',
		//     post
		// }))

		// p_01.get('regions').pushObject(rg_01)
		// p_01.get('regions').pushObject(rg_02)
		// p_01.set('post', post)

		// this.get('logger').log(this.get('pmController').get('Store').object2JsonApi(p_01, false))



		// let post = this.get('pmController').get('Store').createModel('post', {
		//     id: '1',
		//     name: 'Alex',
		//     age: 12,
		//     comments: this.get('pmController').get('Store').createModel('comment', {
		//         id: '1',
		//         title: 'Alex 好帅'
		//     })
		// })

		// post.get('comments').pushObject(this.get('pmController').get('Store').createModel('comment', {
		//     id: '1',
		//     title: 'Alex 好帅',
		//     post
		// }))
		// post.get('comments').pushObject(this.get('pmController').get('Store').createModel('comment', {
		//     id: '2',
		//     title: 'Alfred 好帅',
		//     post
		// }))

		// this.get('logger').log(this.get('pmController').get('Store').object2JsonApi(post, false))

		// let req = this.get('pmController').get('Store').createModel('request', {
		//     id: '1',
		//     res: 'bind_course_region_rep',
		//     fmcond: this.get('pmController').get('Store').createModel('fmcond', {
		//         id: '1',
		//         skip: 0,
		//         take: 1000
		//     })
		// });
		// let eqValues = [
		//     { id: 1, type: 'eqcond', key: 'region_id', val: 'a' },
		//     { id: 2, type: 'eqcond', key: 'course_id', val: 12 },
		// ]
		// eqValues.forEach((elem) => {
		//     req.get(elem.type).pushObject(this.get('pmController').get('Store').createModel(elem.type, {
		//         id: elem.id,
		//         key: elem.key,
		//         val: elem.val,
		//     }))
		// });
		// let conditions = this.get('pmController').get('Store').object2JsonApi(req);
		// this.get('logger').log(conditions)

		// this.get('pmController').get('Store').queryMultipleObject('/api/v1/login/0', 'auth', {}).then(data =>  this.get('logger').log(data.get('firstObject').get('token')))

		// return this.get('pmController').get('Store').transaction('/api/v1/save/0', 'auth', {})
		// .then(() => { })
		// .catch(data => {
		//     this.get('logger').log(data)
		//     return data
		// })

		// later(this, function(){
		//     let temp = this.get('pmController').get('Store').queryModelByID('auth', '5b7e454a8fb8076c3c3304l0');
		//     let temp2 = this.get('pmController').get('Store').queryModelByAll('auth')
		//     this.get('pmController').get('Store').model2LocalStorge(temp2);

		//     let temp3 = this.get('pmController').get('Store').updataModelByID('auth', '5b7e454a8fb8076c3c3304l0', {
		//         token: '/*/dasdas1d2sa15dsd5asd1asdasdfas65das5'
		//     })
		//     let temp4 = this.get('pmController').get('Store').updataModelByID('multdata', '001', {
		//         name: '钱鹏'
		//     });

		// }, 1000)
	}

});
