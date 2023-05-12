import mysql from "mysql";
import appConfig from "./AppConfig";

const connection = mysql.createPool({
  host: appConfig.host,
  user: appConfig.username,
  password : appConfig.password,
  database : appConfig.database,
  port:3307
});

function execute(sql: string, values?:any[] ): Promise<any>{
  return new Promise(( resolve, reject ) => {
      connection.query(sql, values, ( err, result ) => {
          if( err ){
              reject(err);
              return;
          }
          resolve(result);
      })
  });
}
  function exceuteWithParameters(sql,parameters): Promise<any>{
      return new Promise((resolve,reject)=>{
          connection.execute(sql,parameters,(err,result)=>{
              if(err) reject(err.message);
              else resolve(result);
          })
      })
  }

let database = {
  execute,
  exceuteWithParameters
}
export default database
