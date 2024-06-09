'use server'

import {
    ServiceContext,
    serviceContextFromDefaults,
    storageContextFromDefaults,
    VectorStoreIndex,
    SimpleDirectoryReader,
} from "llamaindex";

import { tmpdir } from 'os';
import * as dotenv from "dotenv";

import { CHUNK_OVERLAP, CHUNK_SIZE, STORAGE_CACHE_DIR, DATA_DIR } from "./llm-config";
import path from "path";

// Load environment variables from local .env file
dotenv.config();

async function getDocuments() {
    try {
        return await new SimpleDirectoryReader().loadData({
            directoryPath: path.join(tmpdir(), DATA_DIR)
        });
    } catch (error) {
        console.log('getDocuments error = ', error)
    }
}

export async function generateDatasource() {
    const serviceContext: ServiceContext = serviceContextFromDefaults({
        chunkSize: CHUNK_SIZE,
        chunkOverlap: CHUNK_OVERLAP,
    });
    console.log('1 - ', CHUNK_SIZE, CHUNK_OVERLAP)

    // Split documents, create embeddings and store them in the storage context
    console.log('2 persisdir = ', path.join(tmpdir(), STORAGE_CACHE_DIR))

    const storageContext = await storageContextFromDefaults({
        persistDir: path.join(tmpdir(), STORAGE_CACHE_DIR)
    });
    console.log('3')
    const documents = await getDocuments();
    console.log('4 - number of docs = ', documents?.length)
    if (documents) {
        await VectorStoreIndex.fromDocuments(documents, {
            storageContext,
            serviceContext,
        });
    }
}


export async function getDataSource() {
    const serviceContext: ServiceContext = serviceContextFromDefaults({
        chunkSize: CHUNK_SIZE,
        chunkOverlap: CHUNK_OVERLAP,
    });

    const storageContext = await storageContextFromDefaults({
        persistDir: path.join(tmpdir(), STORAGE_CACHE_DIR)
    });

    return await VectorStoreIndex.init({
        logProgress: true,
        serviceContext,
        storageContext
    })
}

