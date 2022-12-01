import * as SQLite from 'expo-sqlite';

function abreConexao(){
    const database = SQLite.openDatabase("db.db2");

    return database;
}


export const db = abreConexao();;