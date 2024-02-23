import { expect, test } from 'vitest'
import { AnserQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repository/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswersRepository =  {
    create: async (answer: Answer) => {
        return
    }
}

test('create a answer', async () => {
    const answerQuestion = new AnserQuestionUseCase(fakeAnswerRepository)

    const answer = await answerQuestion.execute({
        questionId:'1',
        instructorId:'1',
        content: 'nova resposta',
    })

    expect(answer.content).toEqual('nova resposta')
})