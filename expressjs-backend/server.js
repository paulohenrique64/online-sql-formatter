const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.get('/api/format-sql', (req, res) => {
    // const sql = req.body.sql;
    // const dialect = req.body.dialect;

    const test = `
        echo "CREATE TABLE tb_cliente (
            idcliente INT,
            nomecliente VARCHAR,
            cidadecliente VARCHAR,
            estadocliente VARCHAR,
            paiscliente VARCHAR
        );" > ../data/temp.sql && sqlfluff fix ../data/temp.sql --dialect sqlite > ../data/output && cat ../data/temp.sql
    `
    exec(test, (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log(err);
            return;
        }
        // sqlfluff fix --dialect sqlite teste.sql

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);

        return res.json(stdout);
    });

})

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})