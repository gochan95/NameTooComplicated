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
Example: curl -b cookie.txt http://drawsquad.me:3000/checklogin/
```

```
Description: get scenes’ names for a user
Request: GET /scenes/names/:owner/
Response:
	200
	content-type: application/json
	body: list of object {"name": "scene's name"} for scene’s name

	401 (if not logged in)
	content-type: application/json
	body: user not authenticated

	401 (if not the same user)
	content-type: application/json
	body: user not authorized
Example: curl -b cookie.txt http://drawsquad.me:3000/scenes/names/alice/
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
Example: curl -b cookie.txt http://drawsquad.me:3000/scenes/alice/scene1/
```

```
Description: get all scenes for a user
Request: GET /scenes/:owner/
Response:
	200
	content-type: application/json
	body: list of (Object) scene object (e.g. {"id": "123123123", "lastSaved": "2013-06-01", "name": "scene1", "owner": "alice", "camera": "scenecamera", "scene": "thescene"})

	401 (if not logged in)
	content-type: application/json
	body: user not authenticated

	401 (if not the same user)
	content-type: application/json
	body: user not authorized
Example: curl -b cookie.txt http://drawsquad.me:3000/scenes/alice/
```

```
Description: sign out the current user
Request: GET /signout/
Response:
	200
	content-type: application/json
	body: (string) message of success signing out
Example: curl http://drawsquad.me:3000/signout/
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
Example: curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alicealice"}' -c cookie.txt drawsquad.me:3000/auth/signup/
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
Example:
curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alicealice"}' -c cookie.txt drawsquad.me:3000/auth/signin/
```

```
Description: save a scene
Request: POST /scenes/
	content-type: application/json
	body:
		id: (string) unique string of combination of camera UUID and scene UUID
		timestamp: (string) time of saving the scene
		name: (string) name of the scene
		owner: (string) owner of the scene
		camera: (object) camera of the scene
		scene: (object) scene
Response:
	200
	content-type: application/json
	body: (string) success post message
	401
	content-type: application/json
	body: User not authenticated
Example: curl -b cookie.txt -X POST -H 'Content-Type: application/json' -d '{"id": "123123123", "lastSaved": "2013-06-01", "name": "scene1", "owner": "alice", "camera": "scenecamera", "scene": "thescene"}' http://drawsquad.me:3000/scenes/
```
