import { expect, test } from 'vitest'
import { AnserQuestionUseCase } from './answer-question'

test('create a answer', () => {
    const answerQuestion = new AnserQuestionUseCase()

    const answer = answerQuestion.execute({
        questionId:'1',
        instructorId:'1',
        content: 'nova resposta',
    })

    expect(answer.content).toEqual('nova resposta')
})