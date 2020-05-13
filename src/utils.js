import fs from 'fs';
import { exec } from 'child_process';
import chalk from 'chalk';
import glob from 'glob';

export async function getGlobFiles(input) {
    return new Promise((resolve, reject) => {
        try {
            let stat = fs.lstatSync(input);
            if (stat.isFile()) {
                return resolve([input]);
            } else {
                glob(`${input}/**/*.{jpg,jpeg,bmp,png}`, (err, files) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(files);
                });
            }
        } catch (err) {
            return reject(new Error('文件或文件夹不存在!'));
        }
    });
}

export function info(msg) {
    console.log(chalk.blue(msg));
}

export function success(msg) {
    console.log(chalk.green(msg));
}

export function warn(msg) {
    console.log(chalk.white.bgRed(msg));
}

export function promiseExec(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, err => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}
