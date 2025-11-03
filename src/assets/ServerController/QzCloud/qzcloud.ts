import { N,S,B01 } from './utils.ts'
import DataManager from './data.ts'
import NetworkManager from './network.ts'
import SystemManager from './system.ts'
import * as model from '../domain/model.ts'
type EthItem = {
  id?: number; ip?: string; gateway?: string; mac?: string; netmask?: string;
  v_name?: string; nickname?: string; public_ip?: string;
  type?: string;
  [k: string]: unknown;
};
type NicPayload = {
  eth2?: EthItem[];
  eth1?: EthItem[];
  [k: string]: unknown;
};
export function parseIPInfoFromNicPayload(payload: unknown): model.IPInfo {
  const nic = (payload || {}) as NicPayload;
  const eth2 = Array.isArray(nic.eth2) ? nic.eth2 : [];
  const eth1 = Array.isArray(nic.eth1) ? nic.eth1 : [];

  const build = (x: EthItem, type: string): model.IPItem => ({
    id: N(x.id),
    ip: S(x.ip),
    gateway: S(x.gateway),
    mac: S(x.mac),
    netmask: S(x.netmask),
    type,
    nickname: S(x.public_ip ?? x.public_ip),
  });

  const VPC = eth2.length > 0 ? build(eth2[0], "VPC") : null;

  let nat: model.IPItem | null = null;
  const pub:  model.IPItem[] = [];

  for (const it of eth1) {
    const hasNat = S((it as any).public_ip) !== "";
    if (hasNat && !nat) {
      nat = build(it, "NAT");
    } else {
      pub.push(build(it, "PUBLIC"));
    }
  }

  return { VPC, nat, public: pub };
}
export const toVpsInfo = (r:  model.RawVpsRecord, ipPayload?: unknown):  model.VpsInfo => ({
  id: N(r.id),
  host_name: S((r as any).Host_name ?? (r as any)["host_name"]),
  buy_time: S(r.buy_time),
  end_time: S(r.end_time),
  plug_name: S(r.virtual_type),
  panel_password: S(r.panel_password),

  region: {
    area_name: S(r.area_name),
    line_name: S(r.line_name),
    node_name: S(r.node_name),
  },

  conf: {
    cpu: N(r.cpu),
    memory: N(r.memory),
    hard_disk: N((r as any).hard_disks ?? (r as any).hard_disk),
    bandwidth: N(r.bandwidth),
  },

  system: {
    bios: S(r.bios),
    cd_name: S(r.now_iso),
    os_name: S(r.os_name),
    os_password: S(r.os_password),
    reinstall_num: N(r.reinstall_num),
    max_reinstall_num: N(r.max_reinstall_num),
  },

  feat: {
    metal: B01((r as any).metal),
    vnc: B01((r as any).is_vnc) || S((r as any).vnc_password) !== "",
    open_gpu: B01((r as any).open_gpu),

    is_nat: B01((r as any).is_nat),
    port_num: N((r as any).port_num),
    domain_num: N((r as any).domain_num),
    snapshot_num: N((r as any).snapshot_num),
    backup_num: N((r as any).backup_num),
  },

  IP: ipPayload == null
    ? { VPC: null, nat: null, public: [] }
    : parseIPInfoFromNicPayload(ipPayload),
});

class VpsManager{
  static instance: VpsManager;
  private vpsInfo :  model.VpsInfo;
  private Re :RequestInit;
  private  Id :number;
  private DataMgr: DataManager;
  private NetMgr: NetworkManager;
  private SysMgr: SystemManager;
  private baseUrl :string;
  // public static getInstance(): VpsManager {
  //   if (!VpsManager.instance) {
  //     VpsManager.instance = new VpsManager({},{},{},{});
  //   }
  //   return VpsManager.instance;
  // }
  constructor(baseUrl:string,raw: model.RawVpsRecord, OSraw: Record<string, any[]>, CDraw: Record<string, string>,ipPayload?: unknown) {
    this.vpsInfo = toVpsInfo(raw, ipPayload)
    this.Id=this.vpsInfo.id;
    this.baseUrl = baseUrl;
    this.Re =  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `hostid=${this.Id}`,
    }
    this.DataMgr = new DataManager(baseUrl,this.Id,this.Re)
    this.NetMgr = new NetworkManager(baseUrl,this.Id,this.Re)
    this.SysMgr = new SystemManager(baseUrl,this.Id,this.Re, OSraw, CDraw)
  }
public get VpsInfo():  model.VpsInfo {
    return this.vpsInfo
  }
  public get DataManager(): DataManager {
    return this.DataMgr
  }
  public get NetworkManager(): NetworkManager {
    return this.NetMgr
  }
  public get SystemManager(): SystemManager {
    return this.SysMgr
  }
  public changePanelPassword(newPanelPassword: string) :Promise<boolean>  {
    //update_panel_password
    return fetch(this.baseUrl+'/update_panel_password',{...this.Re, body: `${this.Re.body}&password=${newPanelPassword}`})
      .then(r =>r.json() )
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }
  public getSystemUsage() :Promise<model.MonitorStatus>  {
    return fetch(this.baseUrl+`/monitor_host?hostid=${this.Id}`,this.Re)
      .then(r =>r.json() )
      .then(data =>{
        if (data?.code == 1){ return toStats(data)}
        throw new Error(data?.msg||'unknown error')
      })
  }
  public getScreenShot() :Promise<string>  {
    return fetch(this.baseUrl+'/thumbnail_host',this.Re)
      .then(r =>r.json() )
      .then(data =>{
        if (data?.code == 1){ return data.data.pic}
        throw new Error(data?.msg||'unknown error')
      })
  }
}
function toStats(raw:any):model.MonitorStatus{
  return {
    Cpu:N(raw.data.CpuStats),
    Memory:N(raw.data.MemoryStats),
    BytesReceivedPerSec:N(raw.data.NetworkStats.BytesReceivedPerSec),
    BytesSendPerSec:N(raw.data.NetworkStats.BytesSentPerSec),
  }


}