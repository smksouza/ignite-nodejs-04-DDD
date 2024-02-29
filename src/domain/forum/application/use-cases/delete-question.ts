import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionsUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionsUseCaseResponse {}

export class DeleteQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}
  async execute({
    authorId,
    questionId,
  }: DeleteQuestionsUseCaseRequest): Promise<DeleteQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findById(questionId)

    if (!questions) {
      throw new Error('Questions not found.')
    }

    if (authorId !== questions.authorId.toString()) {
      throw new Error('Not allowed.')
    }
    await this.questionsRepository.delete(questions)

    return {}
  }
}
