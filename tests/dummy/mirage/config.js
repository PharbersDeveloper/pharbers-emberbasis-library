export default function() {
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
            },{
                "type": "auth",
                "id": "5b7e454a8fb8076c3c3304l1",
                "attributes": {
                    "token": "Test 02"
                },
                "relationships": {
                    "mult_data": {
                        "data": [{
                            "type": "multdata",
                            "id": "001",
                        }]
                    }
                }
            }],
            "included": [{
                "type": "multdata",
                "id": "001",
                "attributes": {
                    "name": "alex"
                }
            }]
        }
    });


    this.post('/api/v1/save/0', (/*schema, request*/) => {
        // window.console.warn(request.requestBody);
        return {
            "data": {
                "type": "success",
                "id": "5b7e454a8fb8076c3c3304l0",
                "attributes": {
                    "token": "sdasdasdasd"
                }
            }
        }
    });
}
