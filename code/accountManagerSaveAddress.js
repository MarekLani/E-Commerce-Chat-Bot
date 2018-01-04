var rp = require('request-promise');
...
saveAddress: function(address, token)
{
	 var postOptions = {
		method: 'POST',
		uri: ac.BackendUrl + '/address',
		body: {
			address: address,
			token: token
		},
		json: true
	};
	rp(postOptions);
}