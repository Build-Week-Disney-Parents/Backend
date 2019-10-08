# Backend

Disney Parents is a way for parents to post requests asking to swap stroller
and childcare passes.

# Authentication

Authentication is handled through [JSON Web Tokens](https://jwt.io). A token
is created whenever a user registers an account or logs into an already created
one. This token is passed to the API as an HTTP header titled `token`.

As of right now, all routes require authentication but that may change later.

## Register

### POST `/accounts/register`

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

### POST `/accounts/login`

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

## Request Schema

When retrieving requests from the database, user data (`user_id` and `full_name`)
is prepended to each request object to be utilized by the frontend application.

```json
{
  "id": "1",
  "user_id": "1",
  "full_name": "Spencer Summerville",
  "title": "Test request",
  "description": "Hello, world!",
  "meeting_time": "2019-10-05T14:30:00.000Z",
  "request_type": "stroller",
  "location": "California Adventure",
  "created_at": "2019-09-28T00:50:50.000Z"
}
```

## Requests List

### GET `/requests`

Returns all of the requests in the database. As of right now results are not
paginated.

### GET `/requests/{id}`

Returns a specific request specified by `id`. If the request does not exist
a 404 error will be returned.

### POST `/requests`

# Comments

When retrieving comments from the database,

## Comment Schema

```json
{
  "id": "1",
  "user_id": "1",
  "request_id": "1",
  "username": "grenuttag",
  "full_name": "Spencer Summerville",
  "body": "This is a test comment...",
  "created_at": "2019-09-30T12:30:00.000Z"
}
```

### POST `/comments`

### DELETE `/comments/{id}`

Deletes the comment with ID specified by `id`. If the comment does not exist
a 404 error will be returned. If a user tries to delete a comment that is not
their own, a 403 error will be returned.
