import { UniqueEntityID } from "../../core/entities/unique-entity-id"
import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repository/answers-repository"

interface AnserQuestionUseCaseRequest {
    instructorId: string
    questionId: string
    content: string
}

export class AnserQuestionUseCase {
    constructor(
        private answersRepository: AnswersRepository,
    ) {}
   async execute({instructorId, questionId, content}: AnserQuestionUseCaseRequest) {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId)
        })

        await this.answersRepository.create(answer)

        return answer
    }
}