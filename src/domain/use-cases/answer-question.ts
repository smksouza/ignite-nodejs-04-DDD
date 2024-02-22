import { Answer } from "../entities/answer"

interface AnserQuestionUseCaseRequest {
    instructorId: string
    questionId: string
    content: string
}

export class AnserQuestionUseCase {
    execute({instructorId, questionId, content}: AnserQuestionUseCaseRequest) {
        const answer = new Answer(content)

        return answer
    }
}