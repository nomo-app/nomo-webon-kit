# Nomo API Guidelines

To improve the developer experience, the Nomo Packages follow a set of API guidelines that are described in this document.
Please consider the following guidelines before adding any new APIs.
The guidelines apply for both JavaScript/TypeScript and Dart.

## Named Arguments

Almost all Nomo APIs should use *named arguments* instead of positional arguments.
See the following example to understand why named arguments are needed:

````
await nomoDoSomething(es6Arg, ”eth“, “eth”, ”gwei”); // Bad API design: What the hell is the meaning of those arguments?

await nomoDoSomething({ // Good API design: The arguments are self-explaining
    es6Arg,  
    asset: ”eth“,  
    nativeAsset: ”eth“,  
    feeUnit: “gwei“,  
});
````

Named arguments do not only improve readability, but also help to avoid bugs and make it easier to expand Nomo APIs later on.
Thanks to ES6 Object Property Shorthands, named arguments are feasible with minimal effort.

## Highly Opinionated, Highly Customizable

Nomo APIs should be opinionated in a way that they choose sensible default values.
However, API users should be able to customize those values or even bypass an API by calling underlying packages directly.
Customizable APIs play well with named arguments, since named arguments can be easily made optional.

## Error Handling

Unless noted otherwise, it is assumed that async APIs can throw an error.
In most cases, it is the API-user's responsibility to try/catch errors.
Nomo APIs must not silent-catch errors unless they have a meaningful way of handling them!
Furthermore, Nomo APIs should distinguish between *"known errors"* and *"unknown errors"*.

### Known Errors

*Known errors* are the types of errors that have been predicted by the Nomo developers.
For example, a user refusing to approve a transaction would be a "known error".
For known errors, Nomo APIs should throw a short and helpful error message.
In some situations, those error messages can be used as a replacement for reading the docs.

### Unknown Errors

*Unknown errors* are unpredictable and can happen due to a malfunctioning of packages or the Nomo App itself.
If an unknown error happens, then the Nomo App returns a whole Dart-Stacktrace back to JavaScript.
Please copy-paste this Dart-Stacktrace into a GitHub-issue if you see an unknown error.

### Input Validation

If possible, Nomo API inputs should be validated to ensure correct operation.
Do not assume that Nomo developers read any docs!
Many developers will rely on error messages instead of docs.
Hence, if an API input is wrong, then we should better throw a useful error message instead of letting the code fail at random places.

## Autogenerating Docs

Beside of a general introduction, Nomo APIs should come with automatically generated docs for every public function.
Most public functions should have a comment, but the comment should not repeat the information that is already in the function-signature.
To generate reliable docs, it is important to use TypeScript instead of Vanilla JavaScript.

We use the following packages for generating documentation:

- TypeScript: [typedoc](https://www.npmjs.com/package/typedoc)
- Dart: [dartdoc](https://pub.dev/packages/dartdoc)

## Executable Docs

For many Nomo APIs, it is useful to link Unit tests or sample apps as an "executable documentation".
This is especially true for crypto-functions that are difficult to explain without a test.
Most Unit tests should follow a simple three-part structure:

- Step 1: Generate or hardcode test inputs
- Step 2: Call Nomo APIs
- Step 3: Assert the expected results

## API Stability

Please do not break production-APIs unless you have a strong reason for it!
Nomo APIs are used across many WebOns and operating systems.
We will not refactor dozens of projects just because you think that a function could be named better.
Try to think about how many developer hours you would waste before making a breaking change.
As a general guideline, breaking changes should be only made for highly severe API-problems or a 10x-improvement of the developer experience.

## Avoid Broken Abstractions

Make APIs as abstract as possible, but not too abstract.
If we are hiding too much complexity, then there is a risk of higher level code breaking in unpredictable ways.
For example, since EVM chains and UTXO chains have a radically different architecture, it is often needed to make different APIs for them.

## Avoid Hidden State

If a Nomo API depends on the result of previous API calls, then this should be made visible in the function signature.
If needed, Nomo APIs can be put into an object that holds associated state.

## Lightweight Dependencies

Since Nomo packages are included in a large number of projects, it is important that Nomo packages are not bloated with heavyweight dependencies.
If a feature can be implemented with only a few lines of code, then we prefer to code it ourselves instead of adding yet another dependency.

For npm packages, dependencies that are only needed for local development and testing must be put into the *devDependencies* in the package.json.
