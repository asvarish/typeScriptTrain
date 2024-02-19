import swaggerJsdoc from "swagger-jsdoc";


class Swagger {

    private options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation for my API',
        },
    },
    apis: ["**/*.ts"] // Путь к файлам маршрутов
};

 public specs = swaggerJsdoc(this.options);

}
export default new Swagger().specs