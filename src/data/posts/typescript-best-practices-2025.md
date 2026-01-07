# TypeScript Best Practices for 2025

TypeScript continues to evolve, bringing new features and patterns that help developers write more robust, maintainable code. Let's explore the best practices for 2025.

## Strict Mode is Non-Negotiable

Always enable strict mode in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## Leverage Type Inference

Let TypeScript do the heavy lifting:

```typescript
// Good: Type inference
const users = ['Alice', 'Bob', 'Charlie']

// Unnecessary: Explicit typing
const users: string[] = ['Alice', 'Bob', 'Charlie']
```

## Use Discriminated Unions

Create type-safe state machines:

```typescript
type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: Error }

function handleState(state: LoadingState) {
  switch (state.status) {
    case 'success':
      // TypeScript knows data exists
      return state.data
    case 'error':
      // TypeScript knows error exists
      throw state.error
  }
}
```

## Avoid Type Assertions

Type assertions bypass TypeScript's safety:

```typescript
// Bad
const user = response as User

// Good
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'email' in obj
  )
}

if (isUser(response)) {
  // Type-safe access
  console.log(response.name)
}
```

## Generic Constraints

Write flexible, reusable functions:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'Alice', age: 30 }
const name = getProperty(user, 'name') // Type: string
```

## Template Literal Types

Create powerful string types:

```typescript
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type Endpoint = `/api/${string}`
type Route = `${HTTPMethod} ${Endpoint}`

// Valid
const route: Route = 'GET /api/users'
```

## Utility Types

Leverage built-in utilities:

```typescript
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

// Create a type with all properties optional
type PartialUser = Partial<User>

// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>

// Omit properties
type UserWithoutRole = Omit<User, 'role'>
```

## Const Assertions

Preserve literal types:

```typescript
// Without const assertion
const colors = ['red', 'green', 'blue'] // Type: string[]

// With const assertion
const colors = ['red', 'green', 'blue'] as const // Type: readonly ['red', 'green', 'blue']
```

## Conditional Types

Build complex type logic:

```typescript
type NonNullable<T> = T extends null | undefined ? never : T
type ArrayElement<T> = T extends (infer E)[] ? E : never
```

## Conclusion

These TypeScript best practices will help you write safer, more maintainable code in 2025. Embrace the type system, and let it guide you toward better software design!
