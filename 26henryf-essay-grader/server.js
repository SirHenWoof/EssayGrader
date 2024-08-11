import cookieParser from 'cookie-parser';
var reasons = [];
async function gradeEssay(ess) {
    reasons = [];
    var initialGrade = 100;
    const SEssay = ess.toString();

    //Essay Length Requirment
    if (SEssay.split(" ").length < 495) {
        initialGrade -= 50;
        reasons.push("-50%, too short<br>");
    } else {
        if (SEssay.split(" ").length > 995) {
            initialGrade -= 50;
            reasons.push("-50%, too long<br>");
        } 
    }

    //Essay Spelling: Do Spell Check Later
    

    if (initialGrade < -200) {
        initialGrade = -200;
        reasons.push("Grade curved to -200%, because I felt bad giving you less than that.")
    }

    if (reasons.length == 0) {
        reasons.push("Great Job! No errors with your essay that I am programmed to detect were detected!")
    }

    //Return the Grade
    var finalGrade = initialGrade;


    return finalGrade;
}
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import path from 'node:path';
const { SourceTextModule } = 'node:vm';
const port = process.env.PORT || 2020
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.post("/" ,(req, res) => {
        res.type('.html')
        res.sendFile(path.resolve("Screen.html"))
        res.cookie("Again", "true");
    });
    app.get("/Grade" ,(req, res) => {
        res.redirect("/")
    });
    app.post("/Grade", async function (req, res) {
        if (JSON.stringify(req.cookies) == "{\"Again\":\"true\"}") {
            var name = req.body.Name;
            var FGrade = await gradeEssay(req.body.Essay);
            var grade = FGrade;
            res.cookie("Again", "false");
            res.send("<title>Grade</title><center><h1>Thanks for submitting an essay, " + name + "! Your Grade is " + grade + "%</h1><br><h2>Here are the reasons for your grade:<br>"+ reasons +"</h2></center>");
        } else {
            res.redirect("/")
        }
    });
    app.get("/" ,(req, res) => {
        res.type('.html')
        res.sendFile(path.resolve("Screen.html"))
        res.cookie("Again", "true");
    });
    app.use(express.static("./"));
    app.use(( req, res ) => {
        res.type('text/plain')
        res.status(404)
        res.send('404 Not found')
    })
    app.listen(port ,() => {
        console.log(`Server is on Port ${ port } Ctrl + C to Stop`)
    })