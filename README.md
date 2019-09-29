# Backend

Disney Parents is a way for parents to post requests asking to swap stroller
and childcare passes.

# Authentication

Authentication is handled through [JSON Web Tokens](https://jwt.io). A token
is created whenever a user registers an account or logs into an already created
one. This token is passed to the API as an HTTP header titled `token`.

As of right now, all routes require authentication but that may change later.

## Register

### `POST /accounts/register`

Creates an account on the service. Passwords must be a minimum of 4 characters
long.

#### Example Request

```json
{
  "username": "grenuttag",
  "password": "test",
  "full_name": "Spencer Summerville"
}
```

Returns a JSON Web Token if successful. Returns a 500 error if there was a
problem creating an account.

## Login

### `POST /accounts/login`

Authenticates a user and generates a JSON Web Token for them. If the user
account doesn't exist or the password is incorrect a 401 error will be returned.

#### Example Request

```json
{
  "username": "grenuttag",
  "password": "test"
}
```

# Requests

## Requests List

### `GET /requests`

#### Response

```json
{
  "requests": [
    {
      "id": 1,
      "user_id": 1,
      "full_name": "Spencer Summerville",
      "title": "Test request",
      "description": "Hello, world!",
      "meeting_time": "2019-10-05T14:30:00.000Z",
      "request_type": "stroller",
      "location": "California Adventure",
      "created_at": "2019-09-28T00:50:50.000Z"
    }
    // ...
  ]
}
```

### `GET /requests/:id`

Returns a specific request
