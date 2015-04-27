exports.addNewAdmin = function (name, password,callback) {
	AV.Cloud.httpRequest({
		url: 'http://apicn.faceplusplus.com/v2/detection/detect',
		params: {
			api_key: 'c825e4c426ac446588a97efcc8023261',
			api_secret: 'V8ewWd3ZsEaUzGhE45zpcMZj6FeTEEB3',
			url: picURL,
		},
		success: function(httpResponse) {
			o = JSON.parse(httpResponse.text);
			f = o.face[0];
			AV.Cloud.httpRequest({
				url: 'https://apicn.faceplusplus.com/v2/faceset/add_face',
				params: {
					api_key: 'c825e4c426ac446588a97efcc8023261',
					api_secret: 'V8ewWd3ZsEaUzGhE45zpcMZj6FeTEEB3',
					face_id: f.face_id,
					faceset_name: 'eyes',
				},
				success: function(httpResponse) {
					AV.Cloud.httpRequest({
						url: 'https://apicn.faceplusplus.com/v2/train/search',
						params: {
							api_key: 'c825e4c426ac446588a97efcc8023261',
							api_secret: 'V8ewWd3ZsEaUzGhE45zpcMZj6FeTEEB3',
							faceset_name: 'eyes',
						},
					});
					callback(
						null,
						{face_id: f.face_id,
						 age: f.attribute.age.value,
						 gender: f.attribute.gender.value}
					);
				}
			});
		}
	});
}

exports.getLogs = function (callback) {
	AV.Cloud.httpRequest({
		url: 'https://apicn.faceplusplus.com/v2/recognition/search',
		params: {
			api_key: 'c825e4c426ac446588a97efcc8023261',
			api_secret: 'V8ewWd3ZsEaUzGhE45zpcMZj6FeTEEB3',
			count: 100,
		},
		success: function(httpResponse) {
			o = JSON.parse(httpResponse.text);
			callback(null, o.candidate);
		},
		error: function(err){
			callback(err);
		}
	});
}
