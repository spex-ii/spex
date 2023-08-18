const Register = require('../classes/Register');

module.exports = function (args) {
    // Check if there are any arguments provided
    if (args.length === 0) {
        console.log('--install flag missing');
    } else {
        // Parse the arguments
        const command = args[0];
        const value = args[1];

        // Perform actions based on the command
        switch (command) {
            case '--install':
                if (value) {
                    const register = new Register()
                    register.installFile(value).updateRegister()
                } else {
                    console.log('Specify an --install argument');
                }
                break;
            default:
                console.log('Unknown command:', command);
                break;
        }
    }
}