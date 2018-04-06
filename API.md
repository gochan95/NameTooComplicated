# GET

```
Description: check if there is a user logged in (persistent logged in counts)
Request: GET /checklogin/
Response: 
	200 
	content-type: application/json
	body: message of logged in
	
	401
	content-type: application/json
	body: message of not authenticated
```

```
Description: get scenes’ names for a user
Request: GET /scenes/names/:owner/
Response:
	200
	content-type: application/json
	body: list of strings for scene’s name
	
	401 (if not logged in)
	content-type: application/json
	body: user not authenticated
	
	401 (if not the same user)
	content-type: application/json
	body: user not authorized
```

```
Description: get a scene owned by a user
Request: GET /scenes/:owner/:scenename/
Response:
	200
	content-type: application/json
	body: (object) scene object
	
	401 (if not logged in)
	content-type: application/json
	body: user not authenticated
	
	401 (if not the same user)
	content-type: application/json
	body: user not authorized
```

```
Description: get all scenes for a user
Request: GET /scenes/:owner/
Response:
	200
	content-type: application/json
	body: list of (Object) scene object
	
	401 (if not logged in)
	content-type: application/json
	body: user not authenticated
	
	401 (if not the same user)
	content-type: application/json
	body: user not authorized
```

# POST

```
Description: sign up a new account
Request: POST /auth/signup/
	content-type: application/json
	body:
		username: (string) name of the user
		password: (string)  password of the user
Response:
	200
	content-type: application/json
	body: (string) name of the user
	401
	content-type: application/json
	body: error Unauthorized
```

```
Description: sign in as a user
Request: POST /auth/signin/
	content-type: application/json
	body:
		username: (string) name of the user
		password: (string)  password of the user
Response:
	200
	content-type: application/json
	body: (string) name of the user
	401
	content-type: application/json
	body: error Unauthorized
```

```
Description: save a scene
Request: POST /scenes/
	content-type: application/json
	body:
		id: (string) unique string of combination of camera UUID and scene UUID
		timestamp: (string) time of saving the scene
		name: (string) name of the scene
		camera: (object) camera of the scene
		scene: (object) scene
Response:
	200
	content-type: application/json
	body: (string) success post message
	401
	content-type: application/json
	body: User not authenticated
```

