# Nomo API Guidelines

To improve the developer experience, the Nomo Packages follow a set of API guidelines that are described in this document.
Please consider the following guidelines before adding any new APIs.
The guidelines apply for both JavaScript/TypeScript and Dart.

## Named Arguments

## Error Handling

Unless noted otherwise, it is assumed that async APIs can throw an error.
In most cases, it is the API-user's responsibility to try/catch errors.
Nomo APIs must not silent-catch errors unless they have a meaningful way of handling them!
Further, Nomo Packages should distinguish between *"known errors"* and *"unknown errors"*.

### Known Errors

*Known errors* are the types of errors that have been predicted by the Nomo developers.
For example, a user refusing to approve a transaction would be a "known error".
For known errors, Nomo APIs should throw a short and helpful error message.
In some situations, those error messages can be used as a replacement for reading the docs.

### Unknown Errors

*Unknown errors* are unpredictable and can happen due to a malfunctioning of packages or the Nomo App itself.
If an unknown error happens, then the Nomo App returns a whole Dart-Stacktrace back to JavaScript.
Please copy-paste those Dart-Stacktraces into a GitHub-issue if you see an unknown error.

## Autogenerating Docs

## API Stability

## Lightweight Dependencies
