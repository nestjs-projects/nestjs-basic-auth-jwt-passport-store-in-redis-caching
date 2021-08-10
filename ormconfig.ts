
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

let sqliteConnectionConfig: SqliteConnectionOptions = {
    type: 'sqlite',
    database: 'db',
    entities: ['dist/**/*.entities.js'],
    synchronize: true,
  
  }
  let mysqlConnectionConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nestjs-basic-crud-mysql',
    entities: ['dist/src/**/entities/*.entity{.js,.ts}','dist/src/**/*.entity{.js,.ts}'],
    synchronize: true,
    migrations:['dist/src/db/migrations/*{.js,.ts}'],
    cli: {
      migrationsDir: "src/db/migrations",
      // entitiesDir: "entity",
      // subscribersDir: "subscriber"
  },
  // logging: true,
  //   subscribers: [
  //       "subscriber/*.js"
  //   ],
  //   entitySchemas: [
  //       "schema/*.json"
  //   ],
  }
  export default mysqlConnectionConfig;