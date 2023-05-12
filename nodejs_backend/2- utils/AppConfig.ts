class AppConfig{
}

class DevelopmentConfig extends AppConfig{
    public host = 'localhost';

    public username = 'myadmin';

    public password = 'my-secret-pw';

    public database = 'supermarkets';

    public port = 3006;

    public siteUrl = 'http://localhost:3006/';

    public nodeUrl = "http://" + this.host + ":" + this.port + "/";

    public isProduction = false;
}

// class ProductionConfig extends AppConfig{
//     public host = process.env.HOST || 'localhost';

//     public username = process.env.MYSQL_USER;

//     public password = process.env.MYSQL_PASSWORD;

//     public database = process.env.MYSQL_DATABASE;

//     public port = process.env.PORT;

//     public siteUrl = process.env.SITE_URL;

//     public nodeUrl = "http://" + this.host + ":" + this.port + "/";

//     public isProduction = true;

// }

const appConfig = new DevelopmentConfig();

export default appConfig;
