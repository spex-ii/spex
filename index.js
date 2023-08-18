// Get the command-line arguments
const args = process.argv.slice(2);

// Check if there are any arguments provided
if (args.length === 0) {
    console.log('Specify command');
} else {
    // Parse the arguments
    const command = args[0];
    const value = args[1];

    // Perform actions based on the command
    switch (command) {
        case '--init':
            require('./scripts/init')
            break;
        case '--install':
            const generate = require('./scripts/generate')
            generate(args)
            break;
        default:
            console.log('Unknown command:', command);
            break;
    }
}