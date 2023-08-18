const config = require('../config.json')
const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const { copyFileSync, existsSync, mkdirSync } = fs;

class Register {
    constructor() {
        this.id = null
        this.sourceDir = path.join(__dirname, '..', 'src')
        this.targetDir = path.join(config.rootDir, 'src')
    }

    installFile(value) {
        this.id = value
        const file = value + '.js';
        const sourceFilePath = path.join(this.sourceDir, file);
        const targetFilePath = path.join(this.targetDir, file);

        if (!existsSync(this.sourceDir)) {
            console.error('Source directory does not exist. Try to run "spex -- --init".');
        } else {
            if (existsSync(sourceFilePath)) {
                if (!existsSync(this.targetDir)) {
                    mkdirSync(this.targetDir);
                }

                copyFileSync(sourceFilePath, targetFilePath);
                console.log(`"${this.id}" installed to .SPEX directory.`);
            } else {
                console.error(`"${this.id}" is not a recognized installation command.`);
            }
        }
        return this
    }

    async updateRegister() {
        const readFileAsync = promisify(fs.readFile);
        const writeFileAsync = promisify(fs.writeFile);
        const registerPath = path.join(config.rootDir, 'register.json');
        const register = await this.readRegisterFile(registerPath, readFileAsync, writeFileAsync)
        await this.updateRegisterSrc(register, registerPath, this.id, writeFileAsync);
    }

    async readRegisterFile(registerPath, readFileAsync, writeFileAsync) {
        try {
            await fs.promises.access(registerPath);
        } catch {
            await writeFileAsync(registerPath, JSON.stringify({}), 'utf-8');
        }

        const registerContent = await readFileAsync(registerPath, 'utf-8');
        return JSON.parse(registerContent);
    }

    async updateRegisterSrc(register, registerPath, id, writeFileAsync) {
        const hasContent = (register && register.src && register.src.length)

        if (!hasContent) {
            register.src = [{ 'id': id }];
            await writeFileAsync(registerPath, JSON.stringify(register, null, 2), 'utf-8');
            console.log(`"${id}" added to register.json`);
        }
    }
}

module.exports = Register;