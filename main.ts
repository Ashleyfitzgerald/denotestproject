import { Application } from "https://deno.land/x/abc/mod.ts";
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'
import { Db } from "./mongo.ts";

const database = new Db;
const app = new Application();
const handleBars = new Handlebars();

const prm = database.initialise();
prm.then(buildApp);

function buildApp() {
    app.get("/morebutt", (c) => {
        database.incrementButts();
        return "Butts incremented";
    });

    app.get("showbutt",  async (c) => {
        const butts = await database.getButt();
        return await handleBars.renderView('showbutt', { buttcount: butts });
    });

    app.start({ port: 1993 });
}

console.log("http://localhost:1993/");
