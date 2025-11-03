import * as model from '../domain/model.ts'
import { N } from './utils.ts'

 class NetworkManager {
  private Prm:PortRewardManager;
  private Aclm:ACLManager;
  constructor(baseUrl:string,id:number,re:RequestInit) {
    this.Prm = new PortRewardManager(baseUrl,id,re)
    this.Aclm = new ACLManager(baseUrl,id,re)
  }
  public get PortRewardManager(): PortRewardManager {
    return this.Prm
  }
  public get ACLManager(): ACLManager {
    return this.Aclm
  }
}
export default  NetworkManager;





// PortReward management

class PortRewardManager {
  private Re:RequestInit;
  private Id:number;
  private baseUrl:string;
  constructor(baseUrl:string,id:number,re:RequestInit) {
    this.Re = re
    this.Id = id
    this.baseUrl = baseUrl;
  }
  public DeletePortReward(id:number) :Promise<boolean> {
    return fetch(this.baseUrl+`/remove_port_host`,{...this.Re,body:`${this.Re.body}&id=${id}`})
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 0){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }
  public CreatePortReward(name:string,sport:number,dport:number) :Promise<boolean> {
    return fetch(this.baseUrl+`/add_port_host`,{...this.Re,body:`${this.Re.body}&name=${name}&sport=${sport}&dport=${dport}`})
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 0){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }

  public GetPortRewards() :Promise<model.PortRewards> {
    return fetch(this.baseUrl+`/port_host?hostid=${this.Id}`,this.Re)
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 0){ return this.toPortRewards(data)}
        throw new Error(data?.msg||'unknown error')
      })
  }

  public SearchAvailablePort(keyword:number):Promise<number[]>{
    return fetch(this.baseUrl+`/findport?hostid=${this.Id}&keywords=${keyword}`,this.Re)
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 0){ return data.content }
        throw new Error(data?.msg||'unknown error')
      })
  }
  public GenRandomPort():Promise<number[]>{
    return fetch(this.baseUrl+`/findport?hostid=${this.Id}`,this.Re)
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 0){ return data.content }
        throw new Error(data?.msg||'unknown error')
      })
  }



  toPortRewards(resp: { code: number; data: any[]; msg: string }): model.PortRewards {
    return Array.isArray(resp.data)
      ? resp.data.map(item => ({
        id:   N(item.id),
        name: String(item.name),
        sport:N(item.sport),
        dport:N(item.dport),
        url:  String(item.api_url),
        type: N(item.sys),
        state: String(item.port_type) === "all" ? 1 : 0,
      }))
      : [];
  }


}
// ACL management

class ACLManager {
  private Re:RequestInit;
  private Id:number;
  private baseUrl:string;
  constructor(baseUrl:string, id:number,re:RequestInit) {
    this.Re = re
    this.Id = id
    this.baseUrl = baseUrl
  }

  public DeleteACL(id:number) :Promise<boolean> {
    return fetch(this.baseUrl+`/remove_firewall_host`,{...this.Re,body:`${this.Re.body}&id=${id}`})
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 0){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }
  public AddACL(direction:string,method:string,ip:string,port:number,priority:number) :Promise<boolean> {
    return fetch(this.baseUrl+`/add_firewall_host`,{...this.Re,body:`${this.Re.body}&direction=${direction}&method=${method}&ip=${ip}&port=${port}&priority=${priority}`})
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 0){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }
  public SearchACLs(page:number,limit:number,protocol:string,direction:string,method:string) :Promise<model.ACL> {
    return fetch(this.baseUrl+`/firewall_host?hostid=${this.Id}&page=${page}&limit=${limit}&protocol=${protocol}&direction=${direction}&method=${method}`,this.Re)
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 0){ return this.toACL(data)}
        throw new Error(data?.msg||'unknown error')
      })
  }

  public GetACLs(page:number,limit:number) :Promise<model.ACL> {
    return fetch(this.baseUrl+`/firewall_host?hostid=${this.Id}&page=${page}&limit=${limit}`,this.Re)
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 0){ return this.toACL(data)}
        throw new Error(data?.msg||'unknown error')
      })
  }
  toACL(resp: { code: number; count: number; data: any[] }): model.ACL {
    return Array.isArray(resp.data)
      ? resp.data.map(item => {
        const startIp = String(item.start_ip);
        const endIp = String(item.end_ip);
        const ip = endIp ? `${startIp}-${endIp}` : startIp;
        const sp = String(item.start_port).toUpperCase();
        const port = sp === "ANY" ? 0 : N(item.start_port);

        return {
          id:       N(item.id),
          direction:String(item.direction),
          methpd:   String(item.method),
          ip,
          port,
          priority: N(item.priority),
        };
      })
      : [];
  }
}



