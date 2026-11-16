import express from "express";
import cors from "cors";
import {randomUUID} from "node:crypto";
import {z} from "zod";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {store} from "./store.js";
import {executeWorkflow} from "./engine.js";
import type {Workflow} from "./types.js";

const app=express();
const port=Number(process.env.PORT??4000);
const currentDir=path.dirname(fileURLToPath(import.meta.url));
const frontendDist=path.resolve(currentDir,"../../frontend/dist");

app.use(cors({origin:process.env.FRONTEND_ORIGIN||true}));
app.use(express.json({limit:"1mb"}));

const ns=z.object({id:z.string().min(1).max(100),type:z.string().min(1).max(60),position:z.object({x:z.number(),y:z.number()}).optional(),data:z.record(z.unknown()).default({})});
const es=z.object({id:z.string(),source:z.string(),target:z.string(),label:z.string().optional()});
const schema=z.object({name:z.string().min(1).max(120),nodes:z.array(ns).max(100),edges:z.array(es).max(300)});

app.get("/api/health",(_q,s)=>s.json({ok:true,service:"FlowMind API"}));
app.get("/api/workflows",async(_q,s)=>s.json(await store.list()));
app.post("/api/workflows",async(q,s)=>{const p=schema.safeParse(q.body);if(!p.success)return s.status(400).json({error:p.error.flatten()});const f:Workflow={id:randomUUID(),...p.data,updatedAt:new Date().toISOString()};await store.save(f);return s.status(201).json(f)});
app.get("/api/workflows/:id",async(q,s)=>{const f=await store.get(q.params.id);if(!f)return s.status(404).json({error:"Workflow not found"});return s.json(f)});
app.put("/api/workflows/:id",async(q,s)=>{const p=schema.safeParse(q.body);if(!p.success)return s.status(400).json({error:p.error.flatten()});const old=await store.get(q.params.id);if(!old)return s.status(404).json({error:"Workflow not found"});const f:Workflow={id:old.id,...p.data,updatedAt:new Date().toISOString()};await store.save(f);return s.json(f)});
app.post("/api/workflows/:id/execute",async(q,s)=>{const f=await store.get(q.params.id);if(!f)return s.status(404).json({error:"Workflow not found"});return s.json({executionId:randomUUID(),startedAt:new Date().toISOString(),...executeWorkflow(f)})});

app.use(express.static(frontendDist));
app.get("*",(_q,s)=>s.sendFile(path.join(frontendDist,"index.html")));
app.listen(port,"0.0.0.0",()=>console.log("FlowMind web app and API listening on "+port));
