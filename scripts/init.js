const fs = require('fs');
const path = require('path');
const readline = require('readline');
const configPath = path.join(__dirname, '..', 'config.json');
const settings = {
    installDir: null,
    other: null,
    different: null
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getValue(value, alt) {
    return value === '' ? alt : value
}

rl.question('Spex install directory: \x1b[90m(root)\x1b[0m ', (a1) => {
    if (a1 === '') {
        settings.installDir = process.cwd();

    } else {
        settings.installDir = a1
    }

    rl.question('Spex other config: \x1b[90m(empty)\x1b[0m ', (a2) => {
        settings.other = a2
        rl.question('Spex other settings: \x1b[90m(empty)\x1b[0m ', (a3) => {
            settings.different = a3
            console.log(`
            \r///////////////////////////////////////////\n
                \rYour configuration: \n
                \ro Install directory: ${getValue(settings.installDir, 'root')}\n
                \ro Other setting: ${getValue(settings.other, 'empty')}\n
                \ro Different setting: ${getValue(settings.different, 'empty')}\n
            \r///////////////////////////////////////////`)
            rl.question('Continue and install with this configuration? (y/n) \x1b[90m(yes)\x1b[0m ', (answer) => {
                if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes' || answer === '') {
                    console.log('Great! Continuing...');

                    // Store install directory in config
                    const installDir = path.join(settings.installDir, '.SPEX');
                    try {
                        const config = {
                            rootDir: installDir
                        };
                        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
                    } catch (error) {
                        console.error('Error saving user root directory:', error);
                    }

                    // Create .SPEX root folder
                    const $root = path.join(settings.installDir, '.SPEX');
                    fs.mkdir($root, { recursive: true }, (err) => {
                        if (err) {
                            console.error('Error creating folder:', err);
                        }
                    });
                } else {
                    console.log('Aborting installation...');
                }
                rl.close();
            });
        });
    });
});