import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Storage } from '@ionic/storage';
import { Text } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public storage:Storage,public sqlitePorter: SQLitePorter, private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    //ready to databse
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'developers.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.storage.get('database_filled').then(val => {
          if (val) {
            this.databaseReady.next(true);
          } else {
            this.fillDatabase();
          }
        });
      });
  });
  }
  // Fill the data in database
  fillDatabase() {
    this.http.get('assets/dummyDump.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.error(e));
      });
  }
 
  storeDateId(AlbumCategoryData){
    let query = "REPLACE INTO date_current_affirs VALUES (?)";
    for (let delta of AlbumCategoryData) {
      this.database.executeSql(query, [
        delta.cf_date
        
      ]).then((data) => {
       // alert(JSON.stringify(data));
        }, (error) => {
       // alert("ERROR: ");
        });
    }
  }
  storeFullstory(AlbumPicData){
    let query = "REPLACE INTO date_current_affirs_full VALUES (?, ?, ?)";
    for (let delta of AlbumPicData) {
      this.database.executeSql(query, [
        delta.cf_date,
        delta.politics,
        delta.sports,
        delta.technology,
        delta.business
      ]).then((data) => {
      //  alert(JSON.stringify(data));
        }, (error) => {
      //  alert("ERROR: ");
       });
    }
  }
  
  getDateData() {
    return this.database.executeSql("SELECT * FROM date_current_affirs", []).then((data) => {
      let developers = [];
      //alert(data.rows.length);
      if (data.rows.length >= 0) {
        for (var i = 0; i < data.rows.length; i++) {
          developers.push({ cf_date: data.rows.item(i).cf_date});
        }
      }
      return developers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
  getFullStory(id:string){
   // alert(id);
    return this.database.executeSql("SELECT * FROM date_current_affirs_full WHERE cf_date = '"+id+"'", []).then((data) => {
      let developers = [];
    //  alert(data.rows.length);
      if (data.rows.length >= 0) {
        for (var i = 0; i < data.rows.length; i++) {
          developers.push({ cf_date: data.rows.item(i).cf_date, politics: data.rows.item(i).politics, sports: data.rows.item(i).sports, tech: data.rows.item(i).tech,business: data.rows.item(i).business});
        }
      }
      return developers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
 
getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
