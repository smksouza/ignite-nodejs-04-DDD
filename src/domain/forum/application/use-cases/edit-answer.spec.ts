import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answers', async () => {
    const newAnswers = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answers-1'),
    )

    await inMemoryAnswersRepository.create(newAnswers)

    await sut.execute({
      answerId: newAnswers.id.toString(),
      authorId: 'author-1',
      content: 'Conteúdo teste',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteúdo teste',
    })
  })

  it('should not be able to edit a answers from anoter user', async () => {
    const newAnswers = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answers-1'),
    )

    console.log(newAnswers)

    await inMemoryAnswersRepository.create(newAnswers)

    const result = await sut.execute({
      answerId: newAnswers.id.toString(),
      authorId: 'author-2',
      content: 'Conteúdo teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
