import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(200)
  } else {
    return left('error')
  }
}

test('success result', () => {
  const result = doSomething(true)

  expect(result.isRight()).toEqual(true)
  expect(result.isLeft()).toEqual(false)
})
test('error result', () => {
  const result = doSomething(false)

  expect(result.isRight()).toEqual(false)
  expect(result.isLeft()).toEqual(true)
})
