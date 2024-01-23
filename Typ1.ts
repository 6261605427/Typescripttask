import * as express from 'express';
import { Request, Response } from 'express';
import * as mysql from 'mysql';// mysql.exampleFunction()
const app = express()
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    port: 3306,
    database: "dell"
})

db.connect((error: string) => {
    if (error) {
        console.log("Error found....")
    } else {
        console.log("Connection SuccessFully..")
    }
})


app.post('/postdata', (req: Request, res: Response) => {

    const data = req.body;
    const sql = 'INSERT INTO EMPLOYEE SET ?'
    db.query(sql, data, (err, result) => {
        if (err) {
            console.log({ err: "Data Not Post..." })
            // res.json(err)
        } else {
            console.log({ result: "Data Post SuccessFullly...." })
        }

    })

})

app.get('/getdata', (req: Request, res: Response) => { 
    const sql = 'SELECT * FROM  employee'
    db.query(sql, (err, result) => {
        if (err) {
            console.log({ err: "data Not Get..." })
            res.json(err)
        } else {
            console.log({ result: "data get SuccessFully..." })
            res.json(result)
        }
    })
})


app.put('/dataupdate/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body
    const sqlQuery = "UPDATE employee SET ? WHERE id =?"

    db.query(sqlQuery, [data,id], (err, result) => {
        if (err) {
            console.log({result:"Data Not Update"})
            res.json(err)
        }
        else {
            console.log({err:"Data Update SuccessFully..."})
            res.status(200).json(result)
        }
    })
})
app.delete('/deletedata/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const sqlQuery = "DELETE FROM employee WHERE id =?"

    db.query(sqlQuery,id,(err, result) => {
        if (err) {
            console.log({err:"Data Not Delete"})
            res.json(err)
        }
        else {
            console.log({result:"Data Delete SuccessFully"})
            res.status(200).json(result)
        }
    })
})





const PORT: Number = 5500

app.listen(PORT, () => {
    console.log(`Server Started On ${PORT}`)
})