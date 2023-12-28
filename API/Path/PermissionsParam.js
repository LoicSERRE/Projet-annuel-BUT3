const permissions = {
    admin: 'all',
    user: {
        '/zones': {
            'GET': true,
            'PUT': true,
            'DELETE': true,
            'POST': true
        },
        '/roles': {
            'GET': true,
            'PUT': false,
            'DELETE': false,
            'POST': false
        },
        '/users': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': false
        },
        '/logout': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': true
        },
        '/refreshToken': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': true
        },
        '/login': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': true
        }
    },
    guest: {
        '/zones': {
            'GET': true,
            'PUT': false,
            'DELETE': false,
            'POST': false
        },
        '/roles': {
            'GET': true,
            'PUT': false,
            'DELETE': false,
            'POST': false
        },
        '/users': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': false
        },
        '/logout': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': true
        },
        '/refreshToken': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': true
        },
        '/login': {
            'GET': false,
            'PUT': false,
            'DELETE': false,
            'POST': true
        }
    }
};

export default permissions;