import { init, MongoClient } from './deps.ts';

class Db {
    private buttId: string = 'buttID';
    private initialised: boolean = false;
    private collection: any;
    
    public async initialise() {
        console.log('doing a connect');

        try {
            await init();
            const client = new MongoClient();
            client.connectWithUri('mongodb://root:example@mongo:27017');
            const db = client.database('test');
            this.collection = db.collection("butts");
            this.initialised = true;
        } catch (error) {
            console.error(error)
        }

        console.log('done a connect');
    }

    public async getButt() {

        const result = await this.collection.findOne({ _id: this.buttId });

        return result.buttCount;
    }

    public async incrementButts() {
        if (!this.initialised) {
            await this.initialise()
        }

        console.log('doing a put');

        const buttCount = await this.getButt();

        const { matchedCount, modifiedCount, upsertedId } = await this.collection.updateOne(
            {_id: this.buttId},
            { $set: { buttCount: buttCount + 1 }}
        )
    }
}

export {Db};