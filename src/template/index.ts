import * as glob from 'glob'
import * as path from "path";
import { template } from 'lodash'
import * as fs from "fs";

export class TemplateContext {
    private prevuesDir: string;

    constructor(protected rootDir: string, protected outputDir='.prevues') {
        this.prevuesDir = path.resolve(this.rootDir, outputDir)
    }

    async buildTemplates() {
        const files = glob.sync(path.resolve(__dirname, './templates/**/*.template.*'))

        await fs.promises.mkdir(this.prevuesDir, {recursive: true});

        files.map(async file => {
            await this.buildTemplate(file)
            fs.watch(file, () => {
                this.buildTemplate(file)
            })
        })
    }

    async buildTemplate(file: string) {
        const fileRelativePath = path.relative(path.resolve(__dirname, './templates'), file)
        let data = (await fs.promises.readFile(file)).toString();
        data = template(data)({
            scripts: [
                `<script src="/${this.outputDir.replace(/^\/(.+?)\/$/, '$1')}/client.js" type="module"></script>`
            ]
        })
        await fs.promises.writeFile(path.resolve(this.prevuesDir, fileRelativePath.replace('.template', '')), data)
    }
}
