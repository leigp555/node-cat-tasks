const os = require("os");
const userHomeDir = os.homedir();
const homedir = process.env.HOME || userHomeDir;
const p = require("path");
const dbPath = p.join(homedir, ".todo");
const push = require("./writeFile");
const db = require("./readFile");
const inquirer = require("inquirer");


module.exports.add = async (args) => {
    const list = await db.read(dbPath);
    await push.echo(list, dbPath, args);
    console.log(list);
};

module.exports.clear = async () => {
    const args = [];
    await push.echo([], dbPath, args);
};

module.exports.showAll = async () => {
    const list = await db.read(dbPath);
    //打印之前的任务并返回操作的index
    let index
    await printTasks(list).then((answer) => {
        index = answer
    })
    //询问操作并处理操作
    await askForAction(list, index)
};


//打印之前的任务
const printTasks = (list) => {
    return new Promise((resolve) => {
        inquirer.prompt([
            {
                type: "list",
                name: "index",
                message: "你想要操作哪个任务?",
                choices: [
                    {name: "[_] 新建任务", value: "-2"},
                    ...list.map((item, index) => {
                        return {
                            name: `${item.done ? "[√]" : "[_]"} ${index + 1} - ${
                                item.taskName
                            }`,
                            value: index.toString(),
                        };
                    }),
                    {name: "退出", value: "-1"},
                ],
            },
        ]).then((answer) => {
            resolve(answer.index)
        });
    })
}

//操作分类
const askForAction = (list, index) => {
    if (index >= 0) {
        specialTask(list, index)
    } else if (index === "-2") {
        createNewTask(list)
    }
}

//单个任务操作处理
const specialTask = (list, index) => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "action",
                message: "请选择",
                choices: [
                    {name: "已完成", value: "completed"},
                    {name: "未完成", value: "undone"},
                    {name: "修改", value: "modify"},
                    {name: "删除", value: "remove"},
                    {name: "退出", value: "quit"},
                ],
            },
        ])
        .then((answer2) => {
            if (answer2.action === "completed") {
                list[index].done = true;
                push.echo(list, dbPath).then();
            } else if (answer2.action === "undone") {
                list[index].done = false;
                push.echo(list, dbPath).then();
            } else if (answer2.action === "remove") {
                list.splice(index, 1);
                push.echo(list, dbPath).then();
            } else if (answer2.action === "modify") {
                inquirer
                    .prompt({
                        type: "input",
                        name: "task",
                        message: "输入新的任务名",
                        default: list[index].taskName,
                    })
                    .then((answer3) => {
                        list[index].taskName = answer3.task;
                        push.echo(list, dbPath).then();
                    });
            }
        });
}
//创建新任务
const createNewTask = (list) => {
    inquirer
        .prompt({
            type: "input",
            name: "newTask",
            message: "请输入任务名",
            // default:list[index].taskName
        })
        .then((answer4) => {
            const newTask = {taskName: answer4.newTask, done: false};
            list.push(newTask);
            push.echo(list, dbPath).then();
        });
}



