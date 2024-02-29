import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { DeleteQuestionsUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionsUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    })

    expect(inMemoryQuestionRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from anoter user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    console.log(newQuestion)

    await inMemoryQuestionRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        questionId: 'question-1',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
