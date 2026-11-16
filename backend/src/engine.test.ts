import test from "node:test";
import assert from "node:assert/strict";
import {executeWorkflow} from "./engine.js";
import type {Workflow} from "./types.js";
function flow(nodes:Workflow["nodes"],edges:Workflow["edges"]):Workflow{return{id:"test",name:"test",nodes,edges,updatedAt:new Date(0).toISOString()};}
const node=(id:string,type:string,data:Record<string,unknown>={})=>({id,type,data});
test("executes trigger, stores a value and logs it",()=>{const result=executeWorkflow(flow([node("start","manualTrigger"),node("set","setValue",{key:"state",value:"ready"}),node("log","log",{message:"finished"})],[{id:"1",source:"start",target:"set"},{id:"2",source:"set",target:"log"}]));assert.equal(result.status,"completed");assert.equal(result.context.state,"ready");assert.equal(result.logs.length,3);});
test("condition follows only the matching true branch",()=>{const result=executeWorkflow(flow([node("start","manualTrigger"),node("set","setValue",{key:"role",value:"admin"}),node("check","condition",{key:"role",equals:"admin"}),node("yes","log",{message:"allowed"}),node("no","log",{message:"denied"})],[{id:"1",source:"start",target:"set"},{id:"2",source:"set",target:"check"},{id:"3",source:"check",target:"yes",label:"true"},{id:"4",source:"check",target:"no",label:"false"}]));assert.equal(result.status,"completed");assert.ok(result.logs.some(x=>x.nodeId==="yes"&&x.status==="success"));assert.ok(result.logs.some(x=>x.nodeId==="no"&&x.status==="skipped"));});
test("rejects cycles",()=>{const result=executeWorkflow(flow([node("start","manualTrigger"),node("log","log")],[{id:"1",source:"start",target:"log"},{id:"2",source:"log",target:"start"}]));assert.equal(result.status,"failed");assert.match(result.error??" /",/Cycle detected/);});
test("rejects edges that reference missing nodes",()=>{const result=executeWorkflow(flow([node("start","manualTrigger")],[{id:"1",source:"start",target:"missing"}]));assert.equal(result.status,"failed");assert.match(result.error??"",/missing node/);});
test("requires a manual trigger",()=>{const result=executeWorkflow(flow([node("log","log")],[]));assert.equal(result.status,"failed");assert.match(result.error??"",/Manual Trigger/);});
