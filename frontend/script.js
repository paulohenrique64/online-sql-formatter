const form = document.querySelector('#sql-formatter-form');
const submitButton = document.querySelector('#submit-button');
const submitButtonLabel = document.querySelector('#submit-button-label');

submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const sql = form.querySelector('#sql-input').value;
    const dialect = form.querySelector('#sql-dialects').value;

    const data = {
        sql,
        dialect
    }

    if (data.sql.length === 0) {
        updateSubmitLabel("SQL length must be higher than 0.");
        return;
    }

    const formattedSql = await getFormattedSql(data);
    updateSqlOutput(formattedSql ? formattedSql : "");
})

async function getFormattedSql(data) {
    const myHeaders = new Headers();
    console.log(JSON.stringify(data));

    myHeaders.append("Content-Type", "application/json");

    fetch("http://localhost:3000/api/format-sql", {
        method: "POST",
        body: JSON.stringify(data),
        headers: myHeaders,
    })
        .then(response => {
            response.json()
                .then(responseJSON => {
                    console.log(responseJSON);
                    
                    updateSubmitLabel(responseJSON.message);
                    updateSqlOutput(responseJSON.sql);
                })
                .catch(error => {
                    console.log(error);
                })
        }).catch(error => {
            console.log(error);
            updateSubmitLabel(error);
        })
}

function updateSubmitLabel(message) {
    submitButtonLabel.innerText = message;
}

function updateSqlOutput(sql) {
    const sqlOutputArea = document.querySelector('#sql-output');
    sqlOutputArea.innerHTML = sql;
}
