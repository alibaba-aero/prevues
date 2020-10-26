import * as glob from 'glob'
import * as path from "path";
import { template } from 'lodash'
import * as fs from "fs";

export class TemplateContext {
    constructor(protected rootDir: string) {
    }

    async buildTemplates() {
        const files = glob.sync(path.resolve(__dirname, './templates/**/*.template.*'))

        const prevuesDir = path.resolve(this.rootDir, '.prevues')

        await fs.promises.mkdir(prevuesDir, {recursive: true});

        files.map(async file => {
            const fileRelativePath = path.relative(path.resolve(__dirname, './templates'), file)
            let data = (await fs.promises.readFile(file)).toString();
            data = template(data)({})
            await fs.promises.writeFile(path.resolve(prevuesDir, fileRelativePath.replace('.template', '')), data)
        })
    }
}
