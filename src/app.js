import commander from 'commander';
import { getGlobFiles, success, warn, promiseExec, info } from './utils';
import { Pool } from './pool';

const os = require('os').platform();

const app = new commander.Command();

app.version('v1.0.0', '-v, --version', '查看版本号');

app.usage('-i demo.png');

app.option('-i, --input [input]', '设置目标文件或文件夹', './');

app.helpOption('-h, --help', '帮助信息');

app.action(async cmd => {
    let { input } = cmd;
    input = input.replace(/\\/g, '/');
    let pool = new Pool(item => {
        return promiseExec(item.cmd)
            .then(() => success(`✔ ${item.file}`))
            .catch(err => warn(`✘ ${item.file} ${err.message}`));
    }, 4);
    try {
        let files = await getGlobFiles(input);
        if (!files.length) {
            return warn('无文件');
        }
        info('>> 开始处理');
        files.forEach(item => {
            pool.enqueue({
                cmd: `${
                    os === 'win32' ? 'magick mogrify' : 'mogrify'
                } -strip "${item}"`,
                file: item
            });
        });
    } catch (err) {
        warn(`${input} ${err.message}`);
    }
});

app.parse(process.argv);

export default app;
