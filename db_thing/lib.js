import fs from "fs/promises"
import { existsSync } from "fs"
import { randomUUID } from "crypto"

// Data directory
const DDIR = "./data"

/**
 * @typedef CollectionItem
 * @property {UUID} id A UUID for the item.
 * @property {*} data Data for the item. Can be anything.
 * @property {Number} ctime The time the item was created. (UNIX epoch)
 * @property {Number} mtime The time the item was modified. (UNIX epoch)
 */

/**
 * Loads a collection. Returns a handler.
 * @param {string} name The name of the collection to handle.
 * @param {Array<CollectionItem>} collectionData The collection data to handle.
 */
class Collection {
    #collectionLocation

    /**
     * @type {Array<CollectionItem>}
     */
    #localCollectionData

    constructor(name, collectionData) {
        this.#collectionLocation =`${DDIR}/${name}.json`
        this.#localCollectionData = collectionData

        this.findOne = this.#localCollectionData.find
        this.findAll = this.#localCollectionData.filter
    }

    /**
     * Writes some data to the collection.
     * @param {*} data The data to be added to the collection.
     * @returns {CollectionItem} The collection item that was created.
     */
    write(data) {
        return new Promise((resolve, reject) => {
            const now = Date.now()
            const item = {
                id: randomUUID(),
                data,
                ctime: now,
                mtime: now,
            }

            this.#localCollectionData.push(item)
            fs.writeFile(this.#collectionLocation, JSON.stringify(this.#localCollectionData))
                .then(() => resolve(item))
                .catch(reject)
        })
    }

    /**
     * Reads a database for the item with the given ID.
     * @param {string} itemID The item ID of the item to find.
     * @returns {CollectionItem} The collection item from the database.
     */
    read(itemID) {
        return this.#localCollectionData.find(item => item.id === itemID)
    }
}

export class Database {
    #loadedCollections

    constructor() {
        this.#loadedCollections = new Map()
    }

    /**
     * Load a collection from file to memory.
     * @param {string} collectionnName Name of collection to load.
     * @returns {Promise<Collection()>}
     */
    collection(collectionnName) {
        return new Promise((resolve, reject) => {
            if (this.#loadedCollections.has(collectionnName))
                return resolve(this.#loadedCollections.get(collectionnName))

            const collectionLocation = `${DDIR}/${collectionnName}.json`

            const loadCollection = collectionData => {
                this.#loadedCollections.set(collectionnName, collectionData)
                resolve(new Collection(collectionnName, collectionData))
            }

            if (!existsSync(collectionLocation))
                return fs.writeFile(collectionLocation, "[]")
                    .then(() => fs.readFile(collectionLocation))
                    .then(data => data.toString())
                    .then(data => JSON.parse(data))
                    .then(loadCollection)
                    .catch(reject)

            fs.readFile(collectionLocation)
                .then(data => data.toString())
                .then(data => JSON.parse(data))
                .then(loadCollection)
                .catch(reject)
        })
    }
    // Get all loaded collections.
    getLoadedCollections = () => this.#loadedCollections.keys()
}

const err = err => console.error(err)

const db = new Database()
const col = await db.collection("lol").catch(err)

const item = await col.write("hej").catch(err)
const foundItem = col.read(item.id)

console.dir({ item, foundItem }, { depth: null })

const items = col.findAll(item => item.data === "hej")
console.dir(items, { depth: null })


console.log(db.getLoadedCollections())