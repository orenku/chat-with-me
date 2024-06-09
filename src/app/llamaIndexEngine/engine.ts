import { ContextChatEngine, LLM } from "llamaindex"
import { getDataSource } from "./generate"


export const createChatEngine = async (llm: LLM) => {
    const localDataSource = await getDataSource();

    if (!localDataSource) {
        throw new Error(
            `StorageContext is empty - call 'npm run generate' to generate the storage first`,
        );
    }

    const retriever = localDataSource.asRetriever()
    retriever.similarityTopK = 3

    const chatEngine = new ContextChatEngine({
        chatModel: llm,
        retriever
    })

    return chatEngine
}