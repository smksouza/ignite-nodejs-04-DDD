import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    console.log(newQuestion)

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    if (!result.isRight()) {
      throw new Error('Test de buscar pela slug deu errado')
    }
    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.title).toEqual(newQuestion.title)
  })
})
