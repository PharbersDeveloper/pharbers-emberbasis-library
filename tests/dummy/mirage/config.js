export default function () {
    this.post('/api/v1/login/0', (/*schema, request*/) => {
        // window.console.warn(request.requestBody);
        return {
            "data": [{
                "type": "auth",
                "id": "5b7e454a8fb8076c3c3304l0",
                "attributes": {
                    "token": "Test 01"
                },
                "relationships": {
                    "mult_data": {
                        "data": [{
                            "type": "multdata",
                            "id": "001",
                        }]
					}
                }
            }, {
                "type": "auth",
                "id": "5b7e454a8fb8076c3c3304l1",
                "attributes": {
                    "token": "Test 02"
                },
                "relationships": {
                    "mult_data": {
                        "data": [{
                            "type": "multdata", //multdatum
                            "id": "002",
                        }]
                    }
                }
            }],
            "included": [{
                "type": "multdata",
                "id": "001",
                "attributes": {
                    "name": "alex"
				},
				"relationships": {
					"people": {
						"data": [
							{
								"type":"people",
								"id": "001"
							},
							{
								"type":"people",
								"id": "002"
							}
						]
					}
				}
            },{
                "type": "multdata",
                "id": "002",
                "attributes": {
                    "name": "fuck"
				},
				"relationships": {
					"people": {
						"data": [
							{
								"type":"people",
								"id": "003"
							}
						]
					}
				}
            },{
				"type": "people",
				"id": "001",
				"attributes": {
					"name": "哎哇",
                },
				"relationships": {
					"regions": {
						"data": [
							{
								"type": "region",
								"id": "001"
							},
							{
								"type": "region",
								"id": "002"
							}
						]
					}
				}
			},{
				"type": "people",
				"id": "002",
				"attributes": {
					"name": "哎哇2",
                },
				"relationships": {
					"regions": {
						"data": [
							{
								"type": "region",
								"id": "003"
							}
						]
					}
				}
			},{
				"type": "people",
				"id": "003",
				"attributes": {
					"name": "哎哇3",
                },
				"relationships": {
					"regions": {
						"data": [
							{
								"type": "region",
								"id": "004"
							}
						]
					}
				}
			},{
				"type": "region",
				"id": "001",
				"relationships": {
					"province": {
						"data": {
							"type": "provinces",
							"id": "001"
						}
					}
				}
			},{
				"type": "region",
				"id": "002",
				"relationships": {
					"province": {
						"data": {
							"type": "provinces",
							"id": "002"
						}
					}
				}
			},{
				"type": "region",
				"id": "003",
				"relationships": {
					"province": {
						"data": {
							"type": "provinces",
							"id": "003"
						}
					}
				}
			},{
				"type": "region",
				"id": "004",
				"relationships": {
					"province": {
						"data": {
							"type": "provinces",
							"id": "004"
						}
					}
				}
			},{
				"type": "provinces",
				"id": "001",
				"attributes": {
					"name": "北京1"
                },
			},{
				"type": "provinces",
				"id": "002",
				"attributes": {
					"name": "北京2"
                },
			},{
				"type": "provinces",
				"id": "003",
				"attributes": {
					"name": "北京3"
                },
			},{
				"type": "provinces",
				"id": "004",
				"attributes": {
					"name": "北京4"
                },
			}
		]
        }
	});

	this.post('/api/v1/login/1', (/*schema, request*/) => {
        // window.console.warn(request.requestBody);
        return {
            "data": [{
                "type": "auth",
                "id": "5b7e454a8fb8076c3c3304l0",
                "attributes": {
                    "token": "Test 01"
                },
                "relationships": {
                    "mult_data": {
                        "data": [{
                            "type": "multdata",
                            "id": "001",
                        }]
                    }
                }
            }, {
                "type": "auth",
                "id": "5b7e454a8fb8076c3c3304l1",
                "attributes": {
                    "token": "Test 020000000"
                },
                "relationships": {
                    "mult_data": {
                        "data": [{
                            "type": "multdata", //multdatum
                            "id": "001",
                        }]
                    }
                }
            }],
            "included": [{
                "type": "multdata",
                "id": "001",
                "attributes": {
                    "name": "alex0000"
                }
            }]
        }
	});

	this.post('/api/v1/login/2', (/*schema, request*/) => {
        // window.console.warn(request.requestBody);
        return {
            "data": {
                "type": "auth",
                "id": "5b7e454a8fb8076c3c3304l0",
                "attributes": {
                    "token": "Test 01"
                },
                "relationships": {
                    "mult_data": {
                        "data": [{
                            "type": "multdata",
                            "id": "001",
                        },{
                            "type": "multdata",
                            "id": "002",
                        }]
                    }
                }
            },
            "included": [{
                "type": "multdata",
                "id": "001",
                "attributes": {
                    "name": "alex0000"
                }
            }, {
                "type": "multdata",
                "id": "002",
                "attributes": {
                    "name": "日你妈"
                }
            }]
        }
    });

    this.post('/api/v1/save/0', (/*schema, request*/) => {
        // window.console.warn(request.requestBody);
        // return {
        //     "data": {
        //         "type": "success",
        //         "id": "5b7e454a8fb8076c3c3304l0",
        //         "attributes": {
        //             "token": "sdasdasdasd"
        //         }
        //     }
        // }
        return { "errors": [{ "id": "500", "status": "error", "code": "-301", "title": "user email has been use", "detail": "用户邮箱已被使用" }] }
    });
}
