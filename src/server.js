const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const team = require('./team.json');
const Solver = require('./Solver.js');

const app = new Koa();
app.use(bodyParser());

app.use(ctx => {
    if (ctx.is('application/json')) {
        if (ctx.method === 'POST') {
            const { puzzles } = ctx.request.body;
            ctx.body = {
                teamName: team.teamName,
                solutions: puzzles.map(puzzle => Solver.solve(puzzle)),
                participants: team.participants
            };
        }
    }
});

app.listen(3000);
