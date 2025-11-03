import * as model from '../domain/model.ts'
import { N } from './utils.ts'
class DataManager {
  private SnapshotMgr: SnapshotManager
  private BackupMgr: BackupManager
  constructor(baseUrl:string,id: number, re: RequestInit) {
    this.SnapshotMgr = new SnapshotManager(baseUrl,id, re)
    this.BackupMgr = new BackupManager(baseUrl,id, re)

  }

  public get Snapshot(): SnapshotManager {
    return this.SnapshotMgr
  }
  public get Backup(): BackupManager {
    return this.BackupMgr
  }
}
export default DataManager;

// Snapshot management

class SnapshotManager {
  private Re:RequestInit;
  private Id:number;
  private baseUrl:string;
  constructor(baseUrl:string,id:number,re:RequestInit) {
    this.Re = re
    this.Id = id
    this.baseUrl = baseUrl
  }

  ///backup?hostid=354
  public GetSnapshots() :Promise<model.Snapshots> {
    return fetch(this.baseUrl+`/snapshot?hostid=${this.Id}`,this.Re)
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 0){ return this.toSnapshots(data)}
        throw new Error(data?.msg||'unknown error')
      })
  }
  public CreateSnapshot() :Promise<boolean> {
    return fetch(this.baseUrl+'/create_snapshot_host',this.Re)
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }
  public RestoreSnapshot(id:number) :Promise<boolean> {
    return fetch(this.baseUrl+'/restore_snapshot_host',{...this.Re,body:`${this.Re.body}&id=${id}`})
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }

  public DeleteSnapshot(id:number) :Promise<boolean>  {
    return fetch(this.baseUrl+'/remove_snapshot_host',{...this.Re,body:`${this.Re.body}&id=${id}`})
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })

  }


  toSnapshots(resp: { code: number; data: any[]; msg: string }): model.Snapshots {
    return Array.isArray(resp.data)
      ? resp.data.map(item => ({
        id:    N(item.id),
        name:  String(item.name),
        state: N(item.state),
      }))
      : [];
  }
}
// Backup management

class BackupManager {
  private Re:RequestInit;
  private Id:number;
  private baseUrl:string;
  constructor(baseUrl:string,id:number,re:RequestInit) {
    this.Re = re
    this.Id = id
    this.baseUrl = baseUrl;
  }

  ///backup?hostid=354
  public GetBackups() :Promise<model.Backups> {
    return fetch(this.baseUrl+`/backup?hostid=${this.Id}`,this.Re)
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 0){ return this.toBackups(data)}
        throw new Error(data?.msg||'unknown error')
      })
  }
  public CreateBackup() :Promise<boolean> {
    return fetch(this.baseUrl+'/create_backup_host',this.Re)
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }
  public RestoreSBackup(id:number) :Promise<boolean> {
    return fetch(this.baseUrl+'/restore_backup_host',{...this.Re,body:`${this.Re.body}&id=${id}`})
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })
  }

  public DeleteBackup(id:number) :Promise<boolean>  {
    return fetch(this.baseUrl+'/remove_backup_host',{...this.Re,body:`${this.Re.body}&id=${id}`})
      .then(res => res.json())
      .then(data =>{
        if (data?.code == 1){ return true}
        throw new Error(data?.msg||'unknown error')
      })


  }



  toBackups(resp: { code: number; data: any[]; msg: string }):model.Backups {
    return Array.isArray(resp.data)
      ? resp.data.map(item => ({
        id:    N(item.id),
        name:  String(item.name),
        state: N(item.state),
      }))
      : [];
  }
}


