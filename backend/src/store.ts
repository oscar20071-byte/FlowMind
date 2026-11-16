import {mkdir,readFile,writeFile} from "node:fs/promises";import path from "node:path";import type {Workflow} from "./types.js";
const dir=path.resolve("data"),file=path.join(dir,"workflows.json");
async function readAll():Promise<Workflow[]>{try{return JSON.parse(await readFile(file,"utf8")) as Workflow[]}catch{return []}}
export const store={list:readAll,async get(id:string){return(await readAll()).find(x=>x.id===id)??null},async save(flow:Workflow){const all=await readAll(),i=all.findIndex(x=>x.id===flow.id);if(i>=0)all[i]=flow;else all.unshift(flow);await mkdir(dir,{recursive:true});await writeFile(file,JSON.stringify(all,null,2),"utf8");return flow}};
