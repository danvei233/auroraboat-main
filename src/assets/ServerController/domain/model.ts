export interface VpsInfo {
  id: number;
  host_name: string;
  buy_time: string; // YYYY-MM-DD
  end_time: string;
  plug_name: string;
  panel_password: string;

  region: {
    area_name: string;
    line_name: string;
    node_name: string;
  };

  conf: {
    cpu: number;
    memory: number;     // GB
    hard_disk: number;  // GB
    bandwidth: number;  // Mbps
  };

  system: {
    bios: string;       // 例如 "IDE"
    os_name: string;
    os_password: string;
    cd_name: string;  // 当前挂载的 ISO 名称
    reinstall_num: number;
    max_reinstall_num: number;
  };

  feat: {
    metal: boolean;
    vnc: boolean;
    open_gpu: boolean;  // GPU
    is_nat: boolean;    // 是否 NAT
    port_num: number;   // NAT 端口数量
    domain_num: number;
    snapshot_num: number;
    backup_num: number;
  };

  IP: IPInfo;
}
export interface IPItem {
  id: number;
  ip: string;
  gateway: string;
  mac: string;
  netmask: string;
  type: string;     // "VPC" | "NAT" | "PUBLIC"
  nickname: string;
}
export type IPInfo = {
  VPC: IPItem | null;
  nat: IPItem | null;
  public: IPItem[];
};
export type RawVpsRecord = Record<string, unknown>;

export interface PortRewardItem{id:number;name:string;sport:number;dport:number;url:string;type:number;state:number;}
export interface ACLItem{id: number;direction: string; methpd:string;ip:string;port:number;priority:number}
export type ACL= ACLItem[];
export type PortRewards= PortRewardItem[];
export interface OSItem{os_id: number;os_name: string;}
export interface OSGroup{ systems : OSItem[]; type : string; icon :string}
export type OSs = OSGroup[];

const BootFromIDE ='IDE'
const BootFromISO = 'ISO'
export interface ISOItem{os_name: string;}
export type ISOs = ISOItem[];
export interface SnapshotItem{id: number;name: string;state:number}
export interface BackupItem{id: number;name: string;state:number}
export type Backups= BackupItem[];
export type Snapshots= SnapshotItem[];
export interface MonitorStatus{
  Cpu:number;
  Memory:number;
  BytesSendPerSec:number;
  BytesReceivedPerSec:number;
}