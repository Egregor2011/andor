# andor

Small (<1kb) library for utilizing type safe and predictable methods to deal with conditional statements.

## Contents

- [Installation](#installation)
- [Methods](#methods)
- [Examples](#examples)

## Installation

- Using npm - `npm install @antivixen/andor`
- Using yarn - `yarn add @antivixen/andor`
- Using pnpm - `pnpm add @antivixen/andor`

## Methods

- `getEvaluation<T>`:

```ts
const result = getEvaluation({
  case: true,
  and: () => "True",
  or: () => "False",
});

console.log(result);
// result === "True"
```

Generic type is optional, however you might need to specify in case the return type is a union type,
otherwise you'll gent an error:

```ts
const result = getEvaluation<string | null>({
  case: false,
  and: () => "True",
  or: {
    case: true,
    and: () => "False",
    or: () => null,
  },
});

console.log(result);
// result === "False"
```

`and` / `or` method in the scheme might be either a function or another scheme object:

```ts
type Scheme = {
  case: boolean // any other types passing through will be converted to boolean
  and() {
    // either function or Scheme
  }
  or(){
    //either function or Scheme
  }
}
```

- `getCase<T, I>`:
  Functional alternative to JS `Switch Statement`

```ts
type Case = "True" | "False";
const value: Case = getValueFromSomewhere();

const result = getCase({
  switch: value,
  default: "It's unknown",
  cases: { True: "It's true", False: "It's false" },
});
```

Generics are optional, if you'd like to be more specific go ahead with `getCase<Options, Result>':

```ts
const result = getCase<"True" | "False", "It's true" | "It's false">({
  switch: value,
  default: "It's unknown",
  cases: { True: "It's true", False: "It's false" },
});
```

See some advanced use cases in [Examples](#examples)

## Examples

Here are some particular cases for using the methods

- `getEvaluation`:

```ts
type Status = "Guest" | "User" | "Editor" | "Admin";

let isUserAuthorised;
let isAdmin;
let isEditor;
```

If you need to get the user status, based on the provided variables you have the following options:

```ts
const userStatus: Status = isUserAuthorised
  ? isAdmin
    ? "Admin"
    : isEditor
    ? "Editor"
    : "User"
  : "Guest";
```

Not a great idea given it's not just super hard to follow the flow, but also should be forbidden in eslint

```ts
let userStatus: Status;
if (isUserAuthorised) {
  if (isAdmin) {
    userStatus = "Admin";
  } else if (isEditor) {
    userStatus = "Editor";
  } else {
    userStatus = "User";
  }
} else {
  userStatus = "Guest";
}
```

This case clearly needs a separate method, which is + 1 level of abstraction, additionally not a great choice flow / immutability wise

```ts
const userStatus = ((): Status => {
  if (isUserAuthorised) {
    if (isAdmin) {
      return "Admin";
    }
    if (isEditor) {
      return "Editor";
    }
    return "User";
  }
  return "Guest";
})();
```

You might recall the good old `IIFE` and come up with a much better construction. However, it can be a bit inconvenient to read in certain edge cases

```ts
const userStatus = getEvaluation<Status>({
  case: isUserAuthorised,
  or: () => "Guest",
  and: {
    case: isAdmin,
    and: () => "Admin",
    or: {
      case: isEditor,
      and: () => "Editor",
      or: () => "User",
    },
  },
});
```

The `getEvaluation` method provides a clear scheme of all possible cases, and the returning functions can have side effects, such as acting as a middleware if necessary.

- `getCase`:
  Yet to be written..
