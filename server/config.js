import fs from 'fs'

class Config {
    constructor() {
        this.connectionString = {};
    }

    buildConfig(filePath) {
        try {
            const configFile = fs.readFileSync(filePath, 'utf-8');
            const config = JSON.parse(configFile);

            if (config.DbConnection && config.DbConnection.ConnectionString) {
                const connectionString = config.DbConnection.ConnectionString.split(';');

                connectionString.forEach(element => {
                    const [key, value] = element.split('=');
                    if (key && value) {
                        
                    }
                });
            }
        }
    }
}
