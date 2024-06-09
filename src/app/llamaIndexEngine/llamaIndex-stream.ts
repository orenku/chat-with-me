import {
    JSONValue,
    createCallbacksTransformer,
    createStreamDataTransformer,
    StreamData,
    trimStartOfStreamHelper,
    type AIStreamCallbacksAndOptions,
} from "ai";
import { Response } from "llamaindex";

type ParserOptions = {
    image_url?: string;
};

function createParser(
    res: AsyncIterable<Response>,
    data: StreamData,
    opts?: ParserOptions,
) {
    const it = res[Symbol.asyncIterator]();
    const trimStartOfStream = trimStartOfStreamHelper();
    return new ReadableStream<string>({
        start() {
            data.append({}); // send an empty image response for the user's message
        },
        async pull(controller): Promise<void> {
            const { value, done } = await it.next();
            if (done) {
                controller.close();
                return;
            }

            const text = trimStartOfStream(value.response ?? "");
            if (text) {
                controller.enqueue(text);
            }
        },
    });

}

export function LlamaIndexStream(
    response: AsyncIterable<Response>,
    opts?: {
        callbacks?: AIStreamCallbacksAndOptions;
        parserOptions?: ParserOptions;
    }
): { stream: ReadableStream } {
    const data = new StreamData()
    const res = response;
    return {
        stream: createParser(res, data, opts?.parserOptions)
            .pipeThrough(createCallbacksTransformer(opts?.callbacks))
            .pipeThrough(createStreamDataTransformer())
    };
}
