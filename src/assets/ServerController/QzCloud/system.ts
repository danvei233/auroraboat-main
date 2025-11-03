import * as model from '../domain/model.ts'

const OS_TYPE_MAP: Record<string, { type: string; icon: string }> = {
  "1": { type: "windows", icon: "windows" },
  "2": { type: "centos",  icon: "centos"  },
  "3": { type: "ubuntu",  icon: "ubuntu"  },
  "4": { type: "debian",  icon: "debian"  },
};
class SystemManager {
  private Pmr: PowerManager
  private Bmr: BootManager
  private Omr: OSManager
  constructor(baseUrl:string,Id: number,re:RequestInit, OSraw: Record<string, any[]>, CDraw: Record<string, string>) {
    this.Pmr = new PowerManager(baseUrl,Id,re)
    this.Bmr = new BootManager(baseUrl,Id,re, CDraw)
    this.Omr = new OSManager(baseUrl,Id,re, OSraw)
  }
  public get PowerManager(): PowerManager {
    return this.Pmr
  }
  public get BootManager(): BootManager {
    return this.Bmr
  }
  public get OSManager(): OSManager {
    return this.Omr
  }
}
export default SystemManager;

// power control
class PowerManager{
  private Id:number
  private Re:RequestInit
  private baseUrl:string;
  constructor(baseUrl:string,Id:number,Re:RequestInit) {
    this.Id = Id
    this.Re = Re
    this.baseUrl = baseUrl
  }

  public getState():Promise<number> {
    return fetch(this.baseUrl+'/state_host',this.Re).
      then(res => res.json())
      .then(data=>{
        return data?.code== 1?data.data[0]:-1
      })
  }
  public Shutdown(isForced:boolean) :Promise<boolean> {
    return fetch(this.baseUrl+isForced?'/power_host':'/close_host',this.Re)
      .then(r =>r.json() )
      .then(data =>{
       if (data?.code == 1){ return true}
       throw new Error(data?.msg||'unknown error')
      })
  }
  public Reboot() :Promise<boolean> {
   return fetch(this.baseUrl+'/restart_host',this.Re)
      .then(r =>r.json() )
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }
  public BootOn() :Promise<boolean> {
    return fetch(this.baseUrl+'/start_host',this.Re)
      .then(r =>r.json() )
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }
}
// system reinstall

class OSManager{
  private Id:number
  private Re:RequestInit
  private OSs:model.OSs
  private baseUrl:string;
    constructor(baseUrl:string,Id:number,re:RequestInit,OSraw: Record<string, any[]>) {
    this.Id = Id
    this.Re = re
    this.OSs = OSManager.toOSs(OSraw)
      this.baseUrl = baseUrl

  }
  public get OSList():model.OSs {
    return this.OSs
  }
  static toOSs(source: Record<string, any[]>): model.OSs {
    const groups: model.OSs = [];

    for (const key of Object.keys(source)) {
      const meta = OS_TYPE_MAP[key] ?? { type: key, icon: key };
      const list = Array.isArray(source[key]) ? source[key] : [];

      const systems: model.OSItem[] = list.map((x: any) => ({
        os_id: x.id,
        os_name: x.os_name,
      }));

      groups.push({
        type: meta.type,
        icon: meta.icon,
        systems,
      });
    }

    return groups;
  }
  public ReinstallSystem(passwd:string,OSId:number) :Promise<boolean> {
    return fetch(this.baseUrl+'/reinstall_host',{...this.Re, body: `${this.Re.body}&template_id=${OSId}&password=${passwd}`})
      .then(r =>r.json() )
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }





  public ChangeSystemPassword(newSystemPassword: string) :Promise<boolean> {
    return fetch(this.baseUrl+'/updata_systempass_host',{...this.Re, body: `${this.Re.body}&password=${newSystemPassword}`})
      .then(r =>r.json() )
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }

}



// boot setting

class BootManager{
  private Id:number
  private Re:RequestInit
  private CDs:model.ISOs
  private baseUrl:string;
  constructor(baseUrl:string,Id:number,re:RequestInit,CDraw: Record<string, string>) {
    this.Id = Id
    this.Re = re
    this.CDs = BootManager.toISOs(CDraw)
    this.baseUrl = baseUrl
  }
  public get CdList():model.ISOs {
    return this.CDs
  }
  static toISOs(isoMap: Record<string, string>): model.ISOs {
    return Object.keys(isoMap).map((name) => ({
      os_name: name,
    }));
  }
  public ChangeBootType(type:string):Promise<boolean> {
    return fetch(this.baseUrl+'/set_bios',{...this.Re, body: `${this.Re.body}&bios=${type}`})
      .then(r =>r.json() )
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }

  public MountISO(isoName:string):Promise<boolean> {
    return fetch(this.baseUrl+'/mountiso_host',{...this.Re, body: `${this.Re.body}&iso_path=${isoName}`})
      .then(r =>r.json() )
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }
  public UnmountISO():Promise<boolean> {
    return fetch(this.baseUrl+'/unmountiso_host',this.Re)
      .then(r =>r.json() )
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }
}

// const iso = '{"alpine-extended-3.21.2-x86_64.iso":"C:\\\\iso\\\\alpine-extended-3.21.2-x86_64.iso","alpine-virt-3.21.2-x86_64.iso":"C:\\\\iso\\\\alpine-virt-3.21.2-x86_64.iso","archlinux-2025.01.01-x86_64.iso":"C:\\\\iso\\\\archlinux-2025.01.01-x86_64.iso","FreeBSD-14.2-RELEASE-amd64-dvd1.iso":"C:\\\\iso\\\\FreeBSD-14.2-RELEASE-amd64-dvd1.iso","gpuinstaller.iso":"C:\\\\iso\\\\gpuinstaller.iso","netboot.xyz.iso":"C:\\\\iso\\\\netboot.xyz.iso","WePE_64_V2.3.iso":"C:\\\\iso\\\\WePE_64_V2.3.iso"}'
// console.log('iso', toISOs(JSON.parse(iso)))
