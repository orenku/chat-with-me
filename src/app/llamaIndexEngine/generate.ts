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
    try {
        const serviceContext: ServiceContext = serviceContextFromDefaults({
            chunkSize: CHUNK_SIZE,
            chunkOverlap: CHUNK_OVERLAP,
        });

        // Split documents, create embeddings and store them in the storage context
        const storageContext = await storageContextFromDefaults({
            persistDir: path.join(tmpdir(), STORAGE_CACHE_DIR)
        });
        const documents = await getDocuments();
        if (documents) {
            await VectorStoreIndex.fromDocuments(documents, {
                storageContext,
                serviceContext,
            });
        } else {
            console.log('Error in generateDatasource - no documents!')
        }
    } catch (err) {
        console.log('Error in generating data source: ', err);
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

