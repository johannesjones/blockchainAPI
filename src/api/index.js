import { version } from "../../package.json";
import { Router } from "express";
import facets from "./facets";
const axios = require("axios");

export default ({ config, db }) => {
    let api = Router();

    // mount the facets resource
    api.use("/facets", facets({ config, db }));

    // Fetching data from blockchain.info from the previous day via axios request
    api.get("/", async (req, res) => {
        // let date = new Date();
        const prevDate = new Date().setDate(new Date().getDate() - 1); //date.setDate(date.getDate() - 1);

        try {
            const rows = await axios.get(
                `https://blockchain.info/blocks/${prevDate}?format=json`
            );
            // console.log('Blocklist: ', rows.data);
            res.json(rows.data);
        } catch (error) {
            console.log("Error: ", error);
        }
    });

    // Fetching details for a specific hash defined by params via axios request
    api.get("/details/:hash", async (req, res) => {
        const { hash } = req.params;
        console.log("Params: ", req.params);

        try {
            const rows = await axios.get(
                `https://blockchain.info/rawblock/${hash}`
            );

            // Filtering size, index, previous hash/block and transactions' count from specific block
            const size = rows.data.size;
            const index = rows.data.block_index;
            const prev_hash = rows.data.prev_block;
            const transactions = rows.data.tx.length;
            // console.log('TXcount: ', transactions);

            res.json({ size, index, prev_hash, transactions });
        } catch (error) {
            console.log("Error: ", error);
        }
    });

    return api;
};
