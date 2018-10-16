const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const Solver = require('./Solver.js');

const app = new Koa();
app.use(bodyParser());

app.use(ctx => {
    if (ctx.is('application/json')) {
        if (ctx.method === 'POST') {
            const { puzzles } = ctx.request.body;
            ctx.body = {
                teamName: '',
                solutions: puzzles.map(puzzle => Solver.solve(puzzle)),
                participants: []
            };
        }
    }
});

app.listen(3000);
