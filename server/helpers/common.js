function createUuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
}

function error(status,message,code) {
	var error = new Error();
	error.status = status||404;
	error.message = message||'Error en el servidor';
	error.code= code||"NOT_FOUND";
	return error;
};

module.exports.createUuid = createUuid;
module.exports.error = error;