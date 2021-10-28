#!/usr/bin/env node
const program = require("commander");
const {add, clear, showAll} = require("./index");
const pkg=require("./package.json")

program
 .version(pkg.version)
program
    .command("add ")
    .description("add a task")
    .action((source, destination) => {
        add(destination.args).then(() =>console.log("成功添加") );
    });
program
    .command(`clear`)
    .description("clear all tasks")
    .action(() => {
        clear().then(() =>console.log("成功清除") )
    });

if(process.argv.length===2){
    showAll().then()
}else{
    program.parse(process.argv);
}





