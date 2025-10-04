type VPSInfo ={
  id: number
  state:number
  hostName:string
  panelPassword:string
  config:VpsConfig
  feature:VpsFeat
  buyTime:Date
  endTime:Date
}

type VncFeat = {
  enabled: boolean;
  password: string;
  agent: boolean;
};

type NatFeat = {
  enabled: boolean;
  maxNum: number;
};

type FirewallFeat = {
  enabled: boolean;
  maxRuleNum: number;
};


type MetalFeat = {
  enabled: boolean;
};


type DomainFeat = {
  enabled: boolean;
  maxNum: number;
};

type ReinstallFeat = {
  enabled: boolean;
  maxDailyNum: number;
  dailyNum: number;
};
type SnapshotFeat = {
  enabled: boolean;
  maxNum: number;
};

type BackupFeat = {
  enabled: boolean;
  maxNum: number;
};

type VpsFeat = {
  vnc: VncFeat;
  nat: NatFeat;
  firewall: FirewallFeat;
  metal: MetalFeat;
  domain: DomainFeat;
  reinstall: ReinstallFeat;
  snapshot: SnapshotFeat;
  backup: BackupFeat;
};

type VpsSystem = {
  type:number;
  osName:string;
  osPassword:string;
}
type vpsNetwork = {
  vlanId:number[];
  ipv4:string[],
  vpcIpv4:string[],
  bandwidthOut:number,
  bandwidthIn:number,
}
type vpsBootInfo ={
  biosType:number,
  bootFrom:number,
  ImgName:string,
}
const VpsBiosTypeIDE = 1;
const VpsBootFromDisk = 0;
const VpsBootFromISO = 1;
const VpsBootFromNet = 1;

type VpsConfig={
  virtual_type:string
  boot:vpsBootInfo
  network:vpsNetwork
  os:VpsSystem
  cpu:vpsCfgCpu
  memory:vpsCfgMem
  disks:vpsCfgDisk[]
  gpu:vpsCfgGPU
}
type vpsCfgGPU={
  cpuLimit:number,
  hasGpu:boolean
  resolution:number
  gpu_capacity:number
}
type vpsCfgDisk={
  type:number;
  DiskSize:number;
  MaxIops:number;
  rawPath:string;

}
const VpsDiskTypeOS:number=0;
const VpsDiskTypeData:number=1;


type vpsCfgCpu ={
  coreNum:number
  model:string
}

type vpsCfgMem ={
  IsDynamic:boolean,
  minRam:number
  memorySize:number
}

type HostInfo={
  area:vpsArea;
  line:vpsLine;
  node:vpsNode;
  productTemplate:vpsProduct;
}

type vpsProduct ={
  productId:number;
  productName:string;
};

type vpsArea ={
  areaId:number;
  areaName:string;
};

type vpsLine ={
  lineId:number;
  lineName:string;
};

type vpsNode ={
  nodeId:number;
  nodeName:string;
};
