import { ContextChatEngine, LLM } from "llamaindex"
import { getDataSource } from "./generate"


export const createChatEngine = async (llm: LLM) => {
    const localDataSource = await getDataSource();
    const contextSystemPrompt: ({ context }: { context?: string | undefined; }) => string = ({ context }: { context?: string | undefined }) => {
        return `given the folowing:
        ${context}
        answer in up tp three sentences only.
        In you answer, Use bullets, but instead of '-' symbol for marking a bullet, use ' '.
        Add empty line after every sentence.
                Only answer based on the context provided and the chat history.
        In your responses, put focus on the technical and carear related information`


    }

    if (!localDataSource) {
        throw new Error(
            `StorageContext is empty - call 'npm run generate' to generate the storage first`,
        );
    }

    const retriever = localDataSource.asRetriever()
    retriever.similarityTopK = 3

    const chatEngine = new ContextChatEngine({
        chatModel: llm,
        retriever,
        contextSystemPrompt,
    })

    return chatEngine
}