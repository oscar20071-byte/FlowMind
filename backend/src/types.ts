export type FlowNode={id:string;type:string;position?:{x:number;y:number};data:Record<string,unknown>};
export type FlowEdge={id:string;source:string;target:string;label?:string};
export type Workflow={id:string;name:string;nodes:FlowNode[];edges:FlowEdge[];updatedAt:string};
